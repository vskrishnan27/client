

import React from 'react'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactToPrint from 'react-to-print-advanced';
import { Container, Table, Button } from 'react-bootstrap'


function BillInvoice() {
  const componentRef = useRef();
  // const [buyerDetails, setBuyerDetails] = useState({"name":"","city":"","phone":""})
  const billList = useSelector((state) => state.billList)
  const totalCost = useSelector((state) => state.totalCost)
  const userDetail = useSelector((state) => state.userDetail)
  const salesId = useSelector((state) => state.salesId)
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  return (
    <>
      {console.log(userDetail)}
      <div ref={componentRef}>
        <Container  >
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 10px' }}>
            <p style={{ fontSize: "11px" }}>LIC : ADA/SBIC/PP/85/2019-20</p>
            <p style={{ fontSize: "11px" }}>GST : 33BGVBK8634C1Z6</p>
          </div>
          <div className="text-center mt-0" ref={componentRef}>
            <h4 >K.V.S AGRO SERVICES</h4>
            <p style={{ fontSize: "13px" }}>4/11 MainRoad , Illupur - Sankaranpandal - 609308</p>
            <p style={{ fontSize: "13px" }}>Cell : 9442284315 </p>
          </div>
          <div className="mt-0" style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 20px' }}>
            <p style={{ fontSize: "15px" }} className="mt-0">Bill No :<b>{salesId}</b></p>
            <p style={{ fontSize: "15px" }} className="mt-0">Date : <b>{date}</b></p>
          </div>
          <div className="mt-0" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <p className="mt-0" style={{ margin: '0px 20px', fontSize: "15px" }}>Name : {userDetail.name}</p>
            {/* <p className="mt-0" style={{ marginRight: '10px', fontSize: "15px" }}>Address : {userDetail.address} </p> */}
            <p className="mt-0" style={{ marginRight: '10px', fontSize: "15px" }}>Phone : {userDetail.phone}</p>
          </div>

          {
            <Table hover className="table-container" >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Rate</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              {billList.length > 0 && billList.map((data, ind) => (
                <tbody key={ind}>
                  <tr>
                    <td>{ind + 1}</td>
                    <td>{data.Name}</td>
                    <td>{data.Rate}</td>
                    <td>{data.Quantity}</td>
                    <td>{data.Cost}</td>

                  </tr>
                </tbody>
              ))}
              <tbody >
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td >Net Total</td>
                  <td >{totalCost}</td>
                </tr>
              </tbody>
            </Table>
          }
          <div className="text-center">
            <hr />
            <p>Thank you ! Come back Again</p>
            {/* <p>உழவுக்கு உயிரூட்டு</p> */}
            <hr />
          </div>
        </Container>
      </div>
      <ReactToPrint
        trigger={() => <Button>Print this out!</Button>}
        content={() => componentRef.current}
      />
    </>
  )
}

export default BillInvoice;