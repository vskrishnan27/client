import { Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { useState } from "react";
import { HiDocumentSearch } from "react-icons/hi";
import "../../checkBill/checkbill.css";
import axios from "axios";
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";

const RetriveBill = () => {
  const [billno, setbillno] = useState('')
  const [list, setList] = useState({});

  const findBill = async () => {
    try {
      const data = await axios.get(`http://localhost:5000/invoice/viewInvoice?invoiceNum=${billno}`)
      console.log(data.data)
      setList(data.data)
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
        {list.length > 0 ? <>
        </>
          :
          <>
            <h4><b>No Results Found</b></h4>
          </>
        }
      </div>
    </Container>
  )
}

export default RetriveBill