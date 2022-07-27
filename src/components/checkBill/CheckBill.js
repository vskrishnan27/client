import { Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { useState } from "react";
import { HiDocumentSearch } from "react-icons/hi";
import "./checkbill.css";
import axios from "axios";
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";


const CheckBill = () => {
  const [loader, setload] = useState(false)
  const [billno, setbillno] = useState("");
  const [billDetails, setBillDetails] = useState([]);
  const findBill = () => {
    try {
      const findbillapi = async () => {
        setload(true)
        let details = await axios.get("https://myappget.herokuapp.com/findbill", {
          params: { billno },
        })

        if (details.data.products != null) {
          setBillDetails(details.data.products);
        } else {
          setBillDetails([])
        }
        setload(false)
      }
      findbillapi();

    } catch (error) {
      console.log(error);
    }
  }


  const updateBill = () => {
    console.log(billDetails)
    console.log('bill')
  }


  return (
    <>
      <Container>
        <div className="check-bill-container">
          <Form.Control
            aria-label="Text input with radio button"
            placeholder="Enter bill number"
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
      </Container>

      {loader &&
        <> <FerrisWheelSpinnerOverlay loading size={100} color="#FF7626" /> </>
      }
      {!loader &&
        <div style={{ margin: '15px' }}>
          <Container>
            {billDetails.length > 0 ?
              <>
                <Table striped border hover style={{ border: '1px solid black' }} >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Rate</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>

                  {billDetails.map((data, ind) => (
                    <tbody >
                      <tr style={{ backgroundColor: (ind % 2 === 0) ? 'pink' : '	#FFFFFF' }}>
                        <td>{ind + 1}</td>
                        <td>{data.Name}</td>
                        <td>{data.Rate}</td>
                        <td>{data.Quantity}</td>
                        <td>{data.Cost}</td>
                      </tr>
                    </tbody>

                  ))
                  }


                </Table>

              </>

              :
              <h4 className="no-result-check-bill">No results Found</h4>
            }
          </Container>
        </div>

      }

    </>
  );
};
export default CheckBill;
