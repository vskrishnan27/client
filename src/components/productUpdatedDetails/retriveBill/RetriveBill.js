import { Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { useState } from "react";
import { HiDocumentSearch } from "react-icons/hi";
import "../../checkBill/checkbill.css";
import axios from "axios";
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";

const RetriveBill = () => {
  const [billno, setbillno] = useState('')
  const [list, setList] = useState();
  const [Err, setErr] = useState();

  const findBill = async () => {
    try {
      const data = await axios.get(`server/invoice/viewInvoice?invoiceNum=${billno}`)
      console.log(data.data[0])
      setList(data.data[0])
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteBill = async () => {
    try {
      let v = await axios.delete(`server/invoice/deleteInvoice?invoiceNum=${billno}`)

      setErr(v)
      setList(null)

    } catch (err) {
      console.log(err)
    }
  }



  return (
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
      <div>
        {list ? <>

          <div className="d-flex justify-content-between">
            <div style={{ textAlign: "left" }}>
              <p>Created At : {list.createdAt}</p>
              <p>Invoice Num : {list.invoiceNum}</p>
            </div>
            <div style={{ textAlign: "left" }}>
              <p>Shop Name : {list.shopName}</p>
              <p>Shop Address : {list.shopAddress}</p>
            </div>
          </div>
          <div>
            {
              <Table style={{ border: "1px solid grey" }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody >
                  {list.product?.map((data, ind) => (
                    <tr>
                      <td>{ind + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.qty}</td>
                      <td>{data.cost}</td>
                      <td>{data.qty * data.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            }
            <p>Total cost : <b>{list.totalCost}</b></p>
            <Button variant="danger" onClick={handleDeleteBill}>Delete Bill</Button>
          </div>


        </>
          :
          <>
            {Err ? <h4>{Err}</h4> : <h4>No Results Found</h4>}
          </>
        }
      </div>
    </Container >
  )
}

export default RetriveBill