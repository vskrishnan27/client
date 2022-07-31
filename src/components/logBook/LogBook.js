import { Table, Container } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from 'axios'


const LogBook = () => {
    const [logs, setLogs] = useState([])
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');


    useEffect(() => {

        try {
            const apicall = async () => {
                // setloading(true)
                const data = await axios.get(`https://myappget.herokuapp.com/datalog?id=${id}`)
                const arr = data
                console.log(arr)
                setLogs(arr.data.DataLogs)
                // setloading(false)
            }
            apicall();
        } catch (err) {
            // navigate('/Error500')
            console.log(err);
        }
    }, [])
    return (
        <>

            <Container>
                <Table striped border hover style={{ border: '1px solid black' }} className="my-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ref No</th>
                            <th>Remark</th>
                            <th>Quantity</th>
                            <th>Balance Stock</th>
                        </tr>
                    </thead>

                    {logs?.map((data, ind) => (
                        <tbody >
                            <tr style={{ backgroundColor: data.Remarks != "Sales" ? 'green' : '	#FFFFFF' }}>
                                <td>{ind + 1}</td>
                                <td>{data.RefNo}</td>
                                <td>{data.Remarks}</td>
                                <td>{data.Quantity}</td>
                                <td>{data.BalanceStock}</td>
                            </tr>
                        </tbody>

                    ))
                    }
                </Table>
            </Container>
        </>
    )

}

export default LogBook;