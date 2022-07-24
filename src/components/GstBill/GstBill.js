import { Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { useState, useRef } from "react";
import { HiDocumentSearch } from "react-icons/hi";
import axios from "axios";
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";
import GstTable from './GstTable.js'
import ReactToPrint from 'react-to-print-advanced';


const GstBill = () => {
    let gstData
    const [billno, setbillno] = useState('')
    const [list, setList] = useState([]);
    const [loader, setLoader] = useState(false)
    const gstRef = useRef()

    const findBill = async () => {
        try {
            setLoader(true)
            const data = await axios.get(`http://localhost:5000/gstbill/findGstBill?num=${billno}`)
            setList(data.data)
            console.log(data)
            setLoader(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Container>
                <div className="check-bill-container">
                    <Form.Control
                        aria-label="Text input with radio button"
                        placeholder="Enter invoice bill number"
                        className="check-bill-input-box"
                        type="number"
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                billno && findBill();
                            }
                        }}
                        value={billno}
                        onChange={(e) => {
                            setbillno(e.target.value);
                        }}
                    />
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


                <div ref={gstRef} style={{ margin: "0px 50px" }}>
                    {
                        list.map((data, ind) => (
                            <GstTable data={data} gstData={gstData} />
                        ))

                    }

                </div>
                <ReactToPrint
                    trigger={() => <Button variant="info">Save Invoice</Button>}
                    content={() => gstRef.current}
                />


                {loader &&
                    <> <FerrisWheelSpinnerOverlay loading size={100} color="#FF7626" /> </>
                }








            </Container>

        </>
    )
}

export default GstBill;