import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Button, Modal, Container,Spinner } from "react-bootstrap";
import "./SearchBar.css";
import { ImSearch } from "react-icons/im";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { useNavigate } from "react-router-dom";

const SearchBar = ({ productList }) => {
  const Navigate = useNavigate()
  
  const [loader, setLoader] = useState(false)
  const [bill, setbill] = useState([])
  const [qtydata, setqtydata] = useState(1)
  const [currentItem, Setcurrentitem] = useState({})
  const [boxvalue, setboxvalue] = useState("");
  const [show, setShow] = useState(false)
  const [totalbill, settotalbill] = useState(0)
  const [salesid, setsalesid] = useState(0)

  const [productData, setProductData] = useState([{
    "_id": "62b01a23628b8808fa2244faaazsdfsd",
    "ProductId": "9999999",
    "ProductName": "dont click",
    "ProductActualPrice": 0,
    "ProductRetailPrice": 0,
    "ProductStock": 0,
    "__v": 0
  }])

  useEffect(() => {
    const dataapi = async () => {
      try {
        setLoader(true)
        const info = await axios.get('https://myappget.herokuapp.com/list')
        setProductData(info.data)

        const Id = await axios.get('https://myappget.herokuapp.com/lastsale')
        setsalesid(Id.data[0].SalesId + 1)
        setLoader(false)
      } catch (err) {
        console.log(err)
      }
    }
    dataapi()
  }, [])



  const handleClose = () => {
    setShow(false);
    setboxvalue("");
    const newitem = {
      SalesId: salesid,
      Id: currentItem.ProductId,
      Name: currentItem.ProductName,
      Rate: currentItem.ProductRetailPrice,
      Quantity: qtydata,
      Cost: currentItem.ProductRetailPrice * qtydata,
      BalanceStock: currentItem.ProductStock - qtydata,
      Profit:(currentItem.ProductRetailPrice-currentItem.ProductActualPrice)*qtydata
    }
    settotalbill(newitem.Cost + totalbill)
    setqtydata(1)
    setbill([newitem, ...bill])
    console.log(bill)
  }


  const handlecancel = () => { setShow(false); setboxvalue(""); }

  const dothisclickaction = (name) => {
    setboxvalue(name.ProductName)
    console.log(boxvalue, name);
    Setcurrentitem(name)
    setShow(true)
  }

  const addtosales = async () => {
    try{
    console.log(bill)
    setLoader(true)
    await axios.post('https://myappget.herokuapp.com/updateStocks', { bill })
    await axios.post('https://myappget.herokuapp.com/sales', { bill })
    setbill([])
    settotalbill(0)
    setsalesid(salesid + 1)
    setLoader(false)
    }catch(err){
      Navigate('/Error500')
      console.log(err)
    }
  }

  const deleteProductfromlist = (ind) => {
    var totalcost = 0;
    var newList = []
    bill.forEach((data, index) => {
      if (index !== ind) {
        newList.push(data)
      } else {
        totalcost = totalcost + (data.Quantity * data.Rate)
        console.log(data)
      }
    })
    setbill(newList)
    settotalbill(totalbill - totalcost)
  }



  return (


    <>
    {!loader &&
    <>
      

      <div className="search-box">
        <InputGroup className="search-box-input-1">
          <Form.Control
            className="search-box-input-2"
            placeholder="Search Product"
            aria-label="Search Product"
            aria-describedby="basic-addon1"
            value={boxvalue}
            onChange={(e) => {
              setboxvalue(e.target.value);
              console.log()
            }}
          />
          <Button
            className="search-input-btn"
          >
            <ImSearch />
          </Button>

        </InputGroup>
      </div>
      <div className="drop-down-container" style={{
        display: 'flex',
        margin: 'auto'

      }}>
        {<div className="drop-down">
          {productData.filter((item) => {
            const val = item.ProductName.toLowerCase();
            const search = boxvalue.toLowerCase();
            return search && val.startsWith(search) 
          }
          ).map((item, ind) => (
            <div className='drop-down-list' onClick={() => {
              dothisclickaction(item)
            }} key={ind}>
              <p>{item.ProductName}</p>
            </div>
          )).slice(0, 10)
          }
        </div>}
      </div>

      <Modal show={show} onHide={handlecancel}>
        <Modal.Header closeButton>
          <Modal.Title>{boxvalue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{`In-Stock :${currentItem.ProductStock} `}</h5>
          <h5>{`Price :${currentItem.ProductRetailPrice} `}</h5>
          <Form.Control className="mt-3"
            placeholder="Enter Quantity"
            aria-label="Enter Quantity"
            aria-describedby="basic-addon1"
            value={qtydata}
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setqtydata(e.target.value)
              }
            }
            }
          />
          <h5 className="mt-3">Total-Cost : {(currentItem.ProductRetailPrice * qtydata)}</h5>
          <h5 className="mt-3" style={{ color: (currentItem.ProductStock - qtydata) >= 0 ? "black" : "red" }}>Balance Stock : {(currentItem.ProductStock - qtydata)}</h5>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handlecancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose} disabled={(currentItem.ProductStock - qtydata) >= 0 && (currentItem.ProductStock !== (currentItem.ProductStock - qtydata)) ? false : true}>
            Add to bill
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="table-main-container">
        {bill.length > 0 && (
          <>
            {
              <Table striped hover  className="table-container">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                {bill.map((data, ind) => (
                  <tbody style={{backgroundColor:(ind%2===0)?'#f8f9fa' : '#DFDFDF'}}>
                    <tr>
                      <td>{ind + 1}</td>
                      <td>{data.Id}</td>
                      <td>{data.Name}</td>
                      <td>{data.Rate}</td>
                      <td>{data.Quantity}</td>
                      <td>{data.Cost}</td>
                      <td>
                        <Button variant="danger" onClick={() => deleteProductfromlist(ind)} >Remove</Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
                <tbody >
                  <tr style={{backgroundColor:'#C70039'}} >
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{color:'white'}}>Net Total</td>
                    <td style={{color:'white'}}>{totalbill}</td>
                    <td></td>
                  </tr>
                </tbody>

              </Table>
            }
            < div >
            </div>
            <div>
              <Button variant="dark" className="sales-btn">Add to sales & print bill</Button>
              <Button variant="dark" className="sales-btn" onClick={() => addtosales()}>Add to sales</Button>
            </div>
          </>

        )
        }
      </Container>
      </>
      }

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

    </>
      
  )
}

export default SearchBar;









