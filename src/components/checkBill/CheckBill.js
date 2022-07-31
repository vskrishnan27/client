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
  const [radio, setRadio] = useState("billno")
  const findBill = () => {
    try {
      const findbillapi = async () => {
        setload(true)
        let details;

        if (radio == "billno") {
          details = await axios.get("https://myappget.herokuapp.com/findbill", {
            params: { billno },
          })

        } else {
          details = await axios.get("https://myappget.herokuapp.com/findbillbyname", {
            params: { billno },
          })
        }

        if (details.data != null) {
          setBillDetails(details.data);
        } else {
          setBillDetails([])
        }
        setload(false)
        console.log(billDetails)
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
        <div style={{ marginTop: "10px" }}>
          <input type="radio" name="gender" value="billno" style={{ marginRight: "10px" }}
            onChange={(e) => setRadio(e.target.value)}

          />
          Search by Bill Number
          <input type="radio" name="gender" value="name" style={{ margin: "0px 10px" }}
            onChange={(e) => setRadio(e.target.value)}
          />
          Search By Name
        </div>
        <div className="check-bill-container">
          <Form.Control
            aria-label="Text input with radio button"
            placeholder="Enter bill number"
            className="check-bill-input-box"

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
            {billDetails ?
              <>
                {billDetails.map((info, ind) => (
                  <>
                    <div className="d-flex justify-content-between"  >
                      <div style={{ textAlign: "left" }}>
                        <p>Name : <b>{info.userDetail.name}</b></p>
                        <p>Bill No : <b>{info.salesid}</b></p>
                        <p>Created : <b>{info.createdAt}</b></p>
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <p>Address : <b>{info.userDetail.address}</b></p>
                        <p> Phone : <b>{info.salesid}</b></p>
                        <p>Borrow : <b>{info.userDetail.borrow}</b></p>
                      </div>
                    </div>

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

                      {info.products.map((data, ind) => (
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
                    <br />
                    <hr />
                  </>
                ))}
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
