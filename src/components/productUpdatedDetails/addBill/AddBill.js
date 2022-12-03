
import React, { useState } from 'react'

import { Button, Table } from 'react-bootstrap';
import './addbill.css'
import { Container, Form, Modal } from 'react-bootstrap';
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function AddBill() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  let [formData, setFormData] = useState({
    invoiceNum: "",
    shopName: "",
    shopAddress: "",
    totalCost: 0
  })
  const [dropDownList, setDropDownList] = useState([])

  const [modalData, SetModalData] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Product, SetProduct] = useState([])
  let [temp, setTemp] = useState({
    "name": "",
    "qty": 0,
    "cost": ""
  })

  let currentData = {};

  const dropDownItemClick = (item) => {
    setTemp({
      ...temp,
      "name": item.ProductName
    })
    setShow(true)
    currentData = item
    console.log(temp)
    setDropDownList([])
  }

  const handleModalClick = () => {

    console.log(temp)
    SetProduct([...Product, temp])
    handleClose()

  }


  const removeInvoice = (ind) => {
    let newList = Product.filter((data, index) => {
      return (index != ind)
    })
    SetProduct(newList)
  }

  const createInvoice = async () => {
    setLoading(true)
    try {
      await axios.post('/invoice/createinvoicebill', {
        invoiceNum: formData.invoiceNum,
        shopName: formData.shopName,
        shopAddress: formData.shopAddress,
        product: Product,
        totalCost: formData.totalCost
      })

      const newBill = {
        items: Product,
        salesid: formData.invoiceNum,
        reason: formData.shopName
      }

      await axios.post('/updateStocks', { newBill })



      navigate('/retrivebill')
      setLoading(false)
    } catch (err) {
      console.log(err)
    }


    setLoading(false)
    console.log({
      invoiceNum: formData.invoiceNum,
      shopName: formData.shopName,
      shopAddress: formData.shopAddress,
      product: Product,
      totalCost: formData.totalCost
    })

  }

  return (
    <>
      <Container >
        <div className='invoice-container'>
          <div>
            {!loading &&
              <div className='invoice-text-contianer'>


                <Form.Control
                  className="invoice-input-text-box mt-5"
                  placeholder="Invoice Number"
                  aria-label="Invoice Number"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    formData.invoiceNum = e.target.value
                    console.log(formData.invoiceNum)
                  }}
                />
                <Form.Control
                  className="invoice-input-text-box mt-5"
                  placeholder="Shop Name"
                  aria-label="Shop Name"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    formData.shopName = e.target.value

                  }}
                />
                <Form.Control
                  className="invoice-input-text-box mt-5"
                  placeholder="Shop Address"
                  aria-label="Shop Address"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    formData.shopAddress = e.target.value

                  }}

                />

                <div className="update-product-invoice">
                  <>
                    <Form.Control
                      className="invoice-input-text-box mt-2"
                      placeholder="Search Product"
                      aria-label="Search Product"
                      aria-describedby="basic-addon1"
                      onChange={async (e) => {
                        console.log('hi')
                        const val = await axios.get(`/fetch?val=${e.target.value}`)
                        setDropDownList(val.data)

                      }}
                    />
                    <div className='drop-down-container'>
                      <div className='drop-down-list-invoice'>
                        {
                          dropDownList.map((item, ind) => (<div>
                            <p className="drop-list" key={ind} onClick={() => dropDownItemClick(item)}>{item.ProductName}</p>
                          </div>
                          ))
                        }
                      </div>
                    </div>
                  </>
                </div>

                <Table striped border hover style={{ border: "1px solid black" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Cost</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  {Product.map((data, ind) => (
                    <tbody
                      style={{ backgroundColor: ind % 2 === 0 ? "#f8f9fa" : "#DFDFDF" }}
                    >
                      <tr>
                        <td>{ind + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.qty}</td>
                        <td>{data.cost}</td>
                        <td>
                          <Button variant="danger" onClick={() => removeInvoice(ind)}>Remove</Button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>

                <Form.Control
                  className="invoice-input-text-box mt-5"
                  placeholder="Total Cost"
                  aria-label="Total Cost"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    formData.totalCost = e.target.value
                  }}
                />

              </div>


            }
            {loading && <> <FerrisWheelSpinnerOverlay loading size={100} color="#FF7626" /> </>}
          </div>
        </div>
        <Button variant="dark" className="m-4" onClick={createInvoice}>Create Invoice</Button>
      </Container>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Stocks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 update-product-modal" controlId="exampleForm.ControlInput1">

              <Form.Control
                type="number"
                className="Product-update-txtbox m-5"
                placeholder="Enter Stock to add"
                autoFocus
                val={temp.qty}
                onChange={(e) => {
                  if (isNaN(e.target.val)) {

                    setTemp({
                      ...temp,
                      qty: e.target.value
                    })
                  }
                }
                }
              />
              <Form.Control
                type="number"
                className="Product-update-txtbox m-5"
                placeholder="Enter Price"
                autoFocus
                val={temp.cost}
                onChange={(e) => {
                  if (isNaN(e.target.val)) {
                    setTemp({
                      ...temp,
                      cost: e.target.value
                    })
                  }
                }
                }
              />

              <hr></hr>
            </Form.Group>
          </Form>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default AddBill