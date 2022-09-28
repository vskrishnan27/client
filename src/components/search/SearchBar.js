import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Button, Modal, Container, Spinner } from "react-bootstrap";
import "./SearchBar.css";
import { ImCool2, ImSearch } from "react-icons/im";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { useNavigate } from "react-router-dom";
import ReactToPrint from 'react-to-print'
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";
import BillInvoice from "../billingInvoice/BillInvoice";
import { useDispatch } from 'react-redux'
import { updateBill, updateTotalCost, updateUserDetail, updateSalesId } from '../redux/Actions.js'


const SearchBar = ({ productList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const Navigate = useNavigate()

  const [loader, setLoader] = useState(false)
  const [bill, setbill] = useState([])
  const [qtydata, setqtydata] = useState(1)
  const [currentItem, Setcurrentitem] = useState({})
  const [boxvalue, setboxvalue] = useState("");
  const [show, setShow] = useState(false)
  const [totalbill, settotalbill] = useState(0)
  const [salesid, setsalesid] = useState(0)
  const [userDetailModal, setUserDetailModal] = useState(true);
  const [userDetail, setUserDetail] = useState({
    "name": "",
    "address": "",
    "phone": 0,
    "borrow": 0
  })
  const [productData, setProductData] = useState([])
  const [amount, setAmount] = useState(0)
  const [borrowButton, setborrowButton] = useState(true)

  useEffect(() => {

    const dataapi = async () => {
      try {
        setLoader(true)
        const info = await axios.get('https://myappget.herokuapp.com/list')
        setProductData(info.data)
        const Id = await axios.get('https://myappget.herokuapp.com/lastsale')
        setsalesid(Id.data[0].salesid + 1)
        setLoader(false)
      } catch (err) {
        console.log(err)
      }
    }
    dataapi()
  }, [])

  const handleUserDetailClose = () => {
    setUserDetailModal(false)
    navigate('/')
  }

  const handleStoreUserDetailModal = async () => {
    setUserDetailModal(false)
    setLoader(true)
    var data = await axios.get(`https://myappget.herokuapp.com/borrow?phone=${userDetail.phone}`)

    console.log(data)
    if (!data.data || data.data.length == 0) {
      setUserDetail(
        {
          ...userDetail,
          borrow: 0
        }
      )
    } else {
      setUserDetail(
        {
          ...userDetail,
          borrow: data.data[0].userDetail.borrow
        }
      )
    }

    dispatch(updateUserDetail(userDetail))

    setLoader(false)
  }

  const handleClose = () => {
    setShow(false);
    setboxvalue("");
    const newitem = {
      Id: currentItem.ProductId,
      Name: currentItem.ProductName,
      Rate: currentItem.ProductRetailPrice,
      Quantity: qtydata,
      Cost: currentItem.ProductRetailPrice * qtydata,
      BalanceStock: qtydata,
      Profit: (currentItem.ProductRetailPrice - currentItem.ProductActualPrice) * qtydata,
      GSTPercentage: currentItem.GSTPercentage,
      GSTPrice: currentItem.GSTPrice

    }
    settotalbill(newitem.Cost + totalbill)
    productData[currentItem.index].ProductStock = newitem.BalanceStock
    setqtydata(1)
    setbill([newitem, ...bill])

  }


  const handlecancel = () => { setShow(false); setboxvalue(""); }

  const dothisclickaction = (name, ind) => {
    setboxvalue(name.ProductName)

    Setcurrentitem({ ...name, index: ind })
    setShow(true)
  }

  const addtosales = async (print) => {
    try {
      setLoader(true)
      const schemaBill = {
        salesid: salesid,
        userDetail: {
          ...userDetail,
          borrow: totalbill + userDetail.borrow - amount
        },
        products: bill
      }

      const newBill = {
        items: [...bill],
        salesid,
        reason: 'Sales'
      }
      console.log(newBill)
      await axios.post('https://myappget.herokuapp.com/updateStocks', { newBill })
      await axios.post('https://myappget.herokuapp.com/sales', { schemaBill })

      setbill([])
      settotalbill(0)
      dispatch(updateSalesId(salesid))
      setsalesid(salesid + 1)
      setLoader(false)
      dispatch(updateBill(bill))
      dispatch(updateTotalCost(totalbill))
      if (print) {
        navigate('/billInvoice')
      }
    } catch (err) {
      Navigate('/Error500')
      console.log(err)
    }
  }

  const deleteProductfromlist = (ind, sqty, sid) => {
    var totalcost = 0;
    var newList = []
    bill.forEach((data, index) => {
      if (index !== ind) {
        newList.push(data)
      } else {
        totalcost = totalcost + (data.Quantity * data.Rate)

      }
    })
    var sList = []
    productData.forEach((data, ind) => {
      sList.push(data)
      if (sid = data.ProductId) {
        sList[ind].ProductStock += parseInt(sqty)
      }
    })
    setProductData(sList)
    setbill(newList)
    settotalbill(totalbill - totalcost)
  }



  return (


    <>




      {!loader &&
        <>
          <Container>
            <div className="d-flex justify-content-center justify-content-between m-2" >
              <p>Name : <b>{userDetail.name}</b></p>
              <p>City :<b>{userDetail.address}</b></p>
              <p>Phone : <b>{userDetail.phone}</b></p>
              <p>Borrow : <mark>{userDetail.borrow}</mark></p>
            </div>
          </Container>


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
                return search && val.startsWith(search);
              }
              ).map((item, ind) => (
                <div className='drop-down-list' onClick={() => {
                  dothisclickaction(item, ind)
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
                  <>

                    <div >
                      <Table hover className="table-container" >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th >Remove</th>
                          </tr>
                        </thead>
                        {bill.map((data, ind) => (
                          <tbody style={{ backgroundColor: (ind % 2 === 0) ? '#f8f9fa' : '#DFDFDF' }} key={ind}>
                            <tr>
                              <td>{ind + 1}</td>
                              <td>{data.Id}</td>
                              <td>{data.Name}</td>
                              <td>{data.Rate}</td>
                              <td>{data.Quantity}</td>
                              <td>{data.Cost}</td>
                              <td >
                                <Button variant="danger" onClick={() => deleteProductfromlist(ind, data.Quantity, data.id)} >Remove</Button>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                        <tbody >

                          <tr className="net-total-red" >
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td >Net Total</td>
                            <td >{totalbill}</td>
                            <td ></td>
                          </tr>
                        </tbody>
                      </Table>

                    </div>
                  </>
                }
                < div >
                </div>
                <div className="d-flex m-2 justify-content-around">
                  <Form>

                    <Form.Control
                      placeholder="Amount Given"
                      onChange={(e) => {
                        if (!isNaN(e.target.value)) {
                          setAmount(e.target.value)
                        }
                      }}
                    />
                  </Form>



                  <p> Balance(with borrow) : {totalbill + userDetail.borrow - amount}</p>



                </div>
                <div >
                  <Button variant="dark" className="sales-btn p-2" onClick={() => addtosales(true)}>Add to sales & Print Bill</Button>
                </div>
              </>

            )
            }

          </Container>
        </>
      }

      {
        loader &&
        <> <FerrisWheelSpinnerOverlay loading size={100} color="#FF7626" /> </>
      }


      <>
        <Modal show={userDetailModal} onHide={handleUserDetailClose}>
          <Modal.Header closeButton>
            <Modal.Title>Buyer Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control type='text'
                  placeholder='Enter Buyer Name'
                  className="mt-3"
                  style={{ boxShadow: '0 5px 5px rgb(0,0,0,0.1)' }}
                  onChange={(e) => setUserDetail(
                    {
                      ...userDetail,
                      name: e.target.value
                    }
                  )}
                />
                <Form.Control
                  type='text'
                  placeholder='Enter Buyer City'
                  className="mt-3"
                  style={{ boxShadow: '0 5px 5px rgb(0,0,0,0.1)' }}
                  onChange={(e) => setUserDetail(
                    {
                      ...userDetail,
                      address: e.target.value
                    }
                  )}
                />
                <Form.Control type='number' placeholder='Enter Buyer Phone Number' className="mt-3"
                  style={{ boxShadow: '0 5px 5px rgb(0,0,0,0.1)' }}
                  onChange={(e) => setUserDetail(
                    {
                      ...userDetail,
                      phone: e.target.value
                    }
                  )}
                />
              </Form.Group>
            </Form>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUserDetailClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleStoreUserDetailModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>



    </>
  )
}

export default SearchBar;
