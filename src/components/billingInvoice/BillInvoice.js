
import React from 'react'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactToPrint from 'react-to-print-advanced';
import { Container, Table, Button } from 'react-bootstrap'
import './BillInvoice.css'


function BillInvoice() {
  const componentRef = useRef();
  const billList = useSelector((state) => state.billList)
  const totalCost = useSelector((state) => state.totalCost)
  const userDetail = useSelector((state) => state.userDetail)
  const salesId = useSelector((state) => state.salesId)
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  return (
    <>
      {console.log(userDetail)}
      <div ref={componentRef} className="invoice-container">
        <Container className='invoice-container' >
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 10px' }}>
            <p style={{ fontSize: "11px", margin: '0px', padding: '0px' }}>LIC : ADA/SBIC/PP/85/2019-20</p>
            <p style={{ fontSize: "11px", margin: '0px', padding: '0px' }}>GST : 33BGVBK8634C1Z6</p>
          </div>
          <div className="text-center mt-0" ref={componentRef}>
            <h4 style={{ fontSize: "20px", margin: '0px', padding: '0px' }}><b>K.V.S AGRO SERVICES</b></h4>
            <p style={{ fontSize: "13px", margin: '0px', padding: '0px' }}>4/11 MainRoad , Illupur - Sankaranpandal - 609308</p>
            <p style={{ fontSize: "13px", margin: '0px', padding: '0px' }}>Cell : 9442284315 </p>
          </div>
          <div className="mt-0" style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 20px' }}>
            <p style={{ fontSize: "12px", margin: '0px', padding: '0px' }} className="mt-0">Bill No :<b>{salesId}</b></p>
            <p style={{ fontSize: "12px", margin: '0px', padding: '0px' }} className="mt-0">Date : <b>{date}</b></p>
          </div>
          <div className="mt-0" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <p className="mt-0" style={{ margin: '0px 20px', fontSize: "12px", margin: '0px', padding: '0px' }}>Name : {userDetail.name}</p>
            {/* <p className="mt-0" style={{ marginRight: '10px', fontSize: "15px" }}>Address : {userDetail.address} </p> */}
            <p className="mt-0" style={{ marginRight: '10px', fontSize: "12px", margin: '0px', padding: '0px' }}>Phone : {userDetail.phone}</p>
          </div>

          {
            <Table hover borderless className="invoice" style={{ border: "1px solid black" }} >
              <thead style={{ borderBottom: "1px solid black" }}>
                <tr>
                  <th style={{
                    padding: "0px",
                    margin: "0px",

                  }}>#</th>
                  <th style={{
                    padding: "0px",
                    margin: "0px",
                    textAlign: "center"
                  }}>Name</th>
                  <th style={{
                    padding: "0px",
                    margin: "0px",
                    textAlign: "center"
                  }}>Rate</th>
                  <th style={{
                    padding: "0px",
                    margin: "0px",
                    textAlign: "center"
                  }}>Qty</th>
                  <th style={{
                    padding: "0px",
                    margin: "0px",
                    textAlign: "center"
                  }}>Price</th>
                </tr>
              </thead>
              {billList.length > 0 && billList.map((data, ind) => (
                <tbody key={ind}>
                  <tr>
                    <td style={{
                      padding: "0px",
                      margin: "0px",
                      paddingRight: "5px"
                    }}>{ind + 1}</td>
                    <td style={{
                      padding: "0px",
                      margin: "0px"
                    }}>{data.Name}</td>
                    <td style={{
                      display: "flex",
                      padding: "0px",
                      margin: "auto",
                      textAlign: "right",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>{data.Rate}</td>
                    <td style={{
                      padding: "0px",
                      margin: "auto",
                      textAlign: "center"
                    }}>{data.Quantity}</td>
                    <td style={{
                      display: "flex",
                      padding: "0px",
                      margin: "auto",
                      textAlign: "right",
                      justifyContent: "center",
                      alignItems: "center"

                    }}>{data.Cost}</td>

                  </tr>
                </tbody>
              ))}
              <tbody >
                <tr>
                  <td style={{
                    padding: "0px",
                    margin: "0px"
                  }}></td>
                  <td style={{
                    padding: "0px",
                    margin: "0px"
                  }}></td>
                  <td style={{
                    padding: "0px",
                    margin: "0px"
                  }}></td>
                  <td style={{
                    padding: "0px",
                    margin: "0px",
                    borderTop: "1px solid black"
                  }}><b>Net Total</b></td>
                  <td style={{
                    padding: "0px",
                    margin: "0px",
                    borderTop: "1px solid black"
                  }} ><b>{totalCost}</b></td>
                </tr>
              </tbody>
            </Table>
          }
          <div className="text-center" style={{
            padding: "0px",
            margin: "0px"
          }}>
            <hr style={{
              padding: "0px",
              margin: "0px"
            }} />
            <p style={{
              padding: "5px",
              margin: "0px",
              fontSize: '12px'
            }}>Thank you ! Come back Again</p>
            {/* <p>உழவுக்கு உயிரூட்டு</p> */}
            <hr style={{
              padding: "0px",
              margin: "0px"
            }} />
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