import { Button, Container, Form,Spinner,Table } from "react-bootstrap";
import { useState } from "react";
import { HiDocumentSearch } from "react-icons/hi";
import "./checkbill.css";
import axios from "axios";
import Loader from '../Loader'


const CheckBill = () => {
    const [loader,setload]=useState(false)
  const [billno, setbillno] = useState("");
  const [billDetails, setBillDetails] = useState([]);
  const findBill = () => {
    try {
      const findbillapi = async () => {
        let details = await axios.get("https://myappget.herokuapp.com/findbill", {
          params: { billno },
        });
        setBillDetails(details.data);
      };
      findbillapi();
    } catch (error) {
      console.log(error);
    }
  };

  const updateBill = () =>{
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
                <div className="loader">
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </div>

            }
            {!loader &&
                    <div style={{margin:'15px'}}>
                        <Container>
                        {billDetails.length!=0 ?
                        <>
                <Table  striped border hover style={{border:'1px solid black'}} >  
                <thead>
                    <tr>
                      <th>Bill no</th>
                      <th>Name</th>
                      <th>Rate</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Time</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                    
                { billDetails.map((data,ind)=>(
                    <tbody >
                    <tr style={{ backgroundColor:  (ind%2===0) ? 'pink' : '	#FFFFFF'}}>
                      <td>{data.SalesId}</td>
                      <td>{data.ProductName}</td>
                      <td>{data.ProductPrice}</td>
                      <td>{data.ProductQty}</td>
                      <td>{data.ProductPrice*data.ProductQty}</td>
                      <td>{data.SalesDate.time}</td>
                      <td>
                        <Button variant="primary"  >Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                )) 
                }

                    
                </Table>
                <Button onClick={updateBill} >Update Bill</Button>
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
