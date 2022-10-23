import { Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { useState, useRef } from "react";
import { HiDocumentSearch } from "react-icons/hi";
import axios from "axios";
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";
import GstTable from './GstTable.js'
import ReactToPrint from 'react-to-print-advanced';


const GstBill = () => {
    let gstData
    const [billno, setbillno] = useState({
        start: "",
        end: ""
    })
    const [total, setTotal] = useState({
        ProductTotal: 0,
        gst: 0,
        qty: 0
    })
    const [list, setList] = useState([]);
    const [loader, setLoader] = useState(false)
    const gstRef = useRef()


    const findBill = async () => {
        try {
            setLoader(true)
            const data = await axios.get(`https://myappget.herokuapp.com/gstbill/findbydates?start=${billno.start}&end=${billno.end}`)
            setList(data.data)
            // console.log(data.data)
            let productGSTCalculations = {
                ProductTotal: 0,
                qty: 0,
                gst: 0
            }
            data.data.map((items, ind) => {
                items.products.map((info, ind) => {
                    productGSTCalculations = {
                        ProductTotal: Math.ceil(Math.ceil(productGSTCalculations.ProductTotal) + Math.ceil((info.GSTPrice * info.Quantity))),
                        qty: Math.ceil(Math.ceil(productGSTCalculations.qty) + Math.ceil(info.Quantity)),
                        gst: Math.ceil(productGSTCalculations.gst) + Math.ceil(info.Quantity * info.GSTPrice * (info.GSTPercentage / 100)),
                    }
                })
                setTotal({
                    ...productGSTCalculations,

                })
                console.log(total)
            })
            setLoader(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Container cl>
                <div className="check-bill-container">
                    <div className="d-flex justify-content-around">

                        <Form.Control
                            type="date"
                            aria-label="Text input with radio button"
                            placeholder="Start Date(YYYY-MM-DD)"
                            className="check-bill-input-box"
                            style={{ marginRight: "10px" }}
                            value={billno.start}
                            onChange={(e) => {
                                setbillno({
                                    ...billno,
                                    start: e.target.value
                                }
                                );
                            }}
                        />
                        <Form.Control
                            type="date"
                            aria-label="Text input with radio button"
                            placeholder="End Date(YYYY-MM-DD)"
                            className="check-bill-input-box"
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    billno && findBill();
                                }
                            }}
                            value={billno.end}
                            onChange={(e) => {
                                setbillno({
                                    ...billno,
                                    end: e.target.value
                                }
                                );
                            }}
                        />

                    </div>
                    <Button
                        className="check-bill-btn"
                        variant="dark"
                        type="submit"
                        onClick={() => {
                            billno && findBill();
                        }}

                    >
                        <HiDocumentSearch />
                    </Button>
                </div>
                {list.length > 0 && <main>
                    <div ref={gstRef}>
                        <div style={{ margin: "0px 50px" }}>
                            {
                                list.map((data, ind) => (
                                    < GstTable data={data} />
                                ))
                            }
                        </div>
                        <div className="d-flex justify-content-around m-1 align-items-center flex-wrap text-center" >
                            <p className="p-3">Total-CGST : &#8377; <b> {(total.gst / 2).toFixed(2)}</b></p>
                            <p className="p-3">Total-SGST : &#8377; <b>{(total.gst / 2).toFixed(2)}</b></p>
                            <p className="p-3">Total-GST : &#8377; <b>{(total.gst).toFixed(2)}</b></p>
                            <p className="p-3">Grant Total : &#8377; <b>{(parseFloat(total.gst) + parseFloat(total.ProductTotal)).toFixed(2)}</b></p>
                        </div>
                    </div>
                    <ReactToPrint
                        trigger={() => <Button variant="info" >Save Invoice</Button>}
                        content={() => gstRef.current}

                    />
                </main>
                }




                {loader &&
                    <> <FerrisWheelSpinnerOverlay loading size={100} color="#FF7626" /> </>
                }








            </Container>

        </>
    )
}

export default GstBill;