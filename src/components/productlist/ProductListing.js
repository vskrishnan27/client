import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { Card, ListGroup, Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import axios from "axios";
import './ProductList.css'
import Loader from '../Loader'
import { FerrisWheelSpinnerOverlay } from 'react-spinner-overlay'
import { useDownloadExcel } from 'react-export-table-to-excel';
import { MdOutlineEdit } from 'react-icons/md'
import { TbBooks } from 'react-icons/tb'




const ProductListing = () => {
    const tableRef = useRef(null);
    const [loading, setloading] = useState(false)

    const [List, setList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {

        try {
            const apicall = async () => {
                setloading(true)
                const data = await axios.get('https://myappget.herokuapp.com/list')
                const arr = data.data
                setList(arr)
                setloading(false)
            }
            apicall();

        } catch (err) {
            navigate('/Error500')
            console.log(err);
        }
    }, [])

    const handleLogBook = (data) => {
        // const nav = useNavigate
        console.log(data)
        navigate({
            pathname: "/logbook",
            search: `?id=${data.ProductId}`

        })
    }

    const sort = async (type) => {
        setloading(true)

        let temp = List
        switch (type) {
            case "stockZtoA":
                await temp.sort((a, b) => b.ProductStock - a.ProductStock)
                break;
            case "stockAtoZ":
                await temp.sort((a, b) => a.ProductStock - b.ProductStock)
                break;
            case "nameAtoZ":
                await temp.sort((a, b) => a.ProductName.localeCompare(b.ProductName))
                break;
            case "nameZtoA":
                await temp.sort((a, b) => b.ProductName.localeCompare(a.ProductName))
                break;

            default:
                break;
        }
        setList(temp)
        setloading(false)
    }

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })

    return (
        <>
            {!loading &&
                <div id="tableFixHead">
                    <Container style={{ marginTop: "3rem" }}>
                        <div >

                            <Dropdown style={{ float: "left", marginBottom: "1rem" }}>
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Sort By
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => sort("stockAtoZ")}>Stock 0-9</Dropdown.Item>
                                    <Dropdown.Item onClick={() => sort("stockZtoA")}>Stock 9-0</Dropdown.Item>
                                    <Dropdown.Item onClick={() => sort("nameAtoZ")}>Name A-Z</Dropdown.Item>
                                    <Dropdown.Item onClick={() => sort("nameZtoA")}>Name Z-A</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button onClick={onDownload} variant="dark" className="mx-2" style={{ float: "left" }}> Download as excel </Button>



                        </div>
                        <Table striped bordered hover id="table-mine" ref={tableRef}>
                            <thead style={{ cursor: "pointer" }}>
                                <tr>
                                    <th>S.NO</th>
                                    <th onClick={() => sort("nameAtoZ")}>Name</th>
                                    <th onClick={() => sort("stockAtoZ")}>Stock</th>
                                    <th>Retail &#8377;</th>
                                    <th>Actual &#8377;</th>
                                    <th>GST &#8377;</th>
                                    <th>GST %</th>
                                    <th>Log Book</th>
                                    <th>Edit</th>


                                </tr>
                            </thead>


                            <tbody>
                                {
                                    List.map((data, ind) => (

                                        <tr>
                                            <td>{ind + 1}</td>
                                            <td>{data.ProductName}</td>
                                            <td>{data.ProductStock}</td>
                                            <td>{data.ProductRetailPrice}</td>
                                            <td>{data.ProductActualPrice}</td>
                                            <td>{data.GSTPrice}</td>
                                            <td>{data.GSTPercentage}</td>
                                            <td><Button variant="dark" onClick={() => handleLogBook(data)}><TbBooks /></Button></td>
                                            <td><Button variant="dark"><MdOutlineEdit /></Button></td>
                                        </tr>



                                    ))

                                }
                            </tbody>
                        </Table>
                    </Container>
                </div >
            }


            {
                loading &&
                <> <FerrisWheelSpinnerOverlay loading size={100} color="#FF7626" /> </>
            }

        </>
    )
}

export default ProductListing;