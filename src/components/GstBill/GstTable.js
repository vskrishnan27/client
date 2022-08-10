
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import axios from 'axios'

const GstTable = ({ data }) => {
    return (
        <>
            {console.log(data)}
            <div className='d-flex justify-content-between' style={{ fontSize: "15px" }}>
                <p>Date : <b>{data.createdAt}</b></p>
                <p>Name : <b>{data.userDetail.name}</b></p>
                <p>Address : <b>{data.userDetail.address}</b></p>
                <p>Bill No : <b>{data.salesid}</b></p>
            </div>

            <Table borderless style={{ border: "1px solid black", fontSize: "15px" }}>
                <thead style={{ borderBottom: "1px solid black", textAlign: "center" }}>
                    <th style={{ borderRight: "1px solid black" }}>#</th>
                    <th style={{ borderRight: "1px solid black" }}>Name</th>
                    <th style={{ borderRight: "1px solid black" }}>Qty</th>
                    <th style={{ borderRight: "1px solid black" }}>Rate</th>
                    <th style={{ borderRight: "1px solid black" }}>Price</th>
                    <th style={{ borderRight: "1px solid black" }}>SGST %</th>
                    <th style={{ borderRight: "1px solid black" }}>SGST</th>
                    <th style={{ borderRight: "1px solid black" }}>CGST %</th>
                    <th style={{ borderRight: "1px solid black" }}>CGST</th>
                    <th style={{ borderRight: "1px solid black" }}>G.Total</th>
                </thead>
                < tbody  >
                    {data.products.map((item, ind) => (

                        <tr key={ind}>
                            <td style={{ borderRight: "1px solid black" }}>{ind + 1}</td>
                            <td style={{ borderRight: "1px solid black" }}>{item.Name}</td>
                            <td style={{ borderRight: "1px solid black" }}>{item.Quantity}</td>
                            <td style={{ borderRight: "1px solid black" }} >{Math.ceil(item.GSTPrice / item.Quantity)}</td>
                            <td style={{ borderRight: "1px solid black" }} >{item.GSTPrice}</td>
                            <td style={{ borderRight: "1px solid black" }} >{item.GSTPercentage / 2}</td>
                            <td style={{ borderRight: "1px solid black" }} >{Math.ceil(((item.GSTPercentage / 2) / 100) * item.GSTPrice)}</td>
                            <td style={{ borderRight: "1px solid black" }} >{item.GSTPercentage / 2}</td>
                            <td style={{ borderRight: "1px solid black" }} >{Math.ceil(((item.GSTPercentage / 2) / 100) * item.GSTPrice)}</td>
                            <td style={{ borderRight: "1px solid black" }} >{item.GSTPrice}</td>
                        </tr>
                    ))}
                </tbody>



            </Table>
            <div>
                <Table style={{ fontSize: "15px" }}>
                    <tbody>
                        <td className="pt-2" style={{ border: "1px solid black" }}>Farmer Signature(For Agriculture use)</td>
                        <td className="pt-2" style={{ border: "1px solid black" }}>Retailer Signature</td>
                    </tbody>
                </Table>
            </div>
            <hr />
        </>
    )
}

export default GstTable;