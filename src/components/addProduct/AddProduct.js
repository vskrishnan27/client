import { Container, Form, Button, Col } from "react-bootstrap";
import './AddProduct.css'
import axios from 'axios'
import { useState, useEffect } from "react";
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)

    const [data, setData] = useState({
        ProductId: 0,
        ProductName: '',
        ProductActualPrice: '',
        ProductRetailPrice: '',
        ProductStock: '',
        GSTPrice: '',
        GSTPercentage: ''
    })


    useEffect(() => {
        try {
            setLoader(true)
            const call = async () => {
                const Id = await axios.get('server/list')
                let newid = (Id.data.length > 0 ? Id.data[Id.data.length - 1].ProductId : 0)
                newid++;
                console.log(Id)
                setData({ ...data, ProductId: newid })
                setLoader(false)
            }
            call()
        } catch (err) {
            console.log(err)
        }
    }, [])

    const addDetail = async () => {
        try {
            setLoader(true)
            await axios.post('server/productList',
                {
                    ProductId: data.ProductId,
                    ProductName: data.ProductName,
                    ProductActualPrice: data.ProductActualPrice,
                    ProductRetailPrice: data.ProductRetailPrice,
                    ProductStock: data.ProductStock,
                    GSTPercentage: data.GSTPercentage,
                    GSTPrice: data.GSTPrice
                }
            )
            setLoader(false)
            navigate('/');
        } catch (err) {
            navigate('/Error500');
            console.log(err)
        }
    }

    let isAddProductDataValid = (data.ProductName.length > 3 && data.ProductActualPrice > 0 && data.ProductRetailPrice > 0 && data.ProductStock > 0 && data.GSTPercentage > 0 && data.GSTPrice > 0)
    return (
        <>
            {!loader && <Col md={{ span: 6, offset: 3 }}>
                <Container>
                    <div className="add-product-input-container" >
                        <h1>Add a product</h1>
                        <Form.Control
                            className="input-text-box mt-5"
                            placeholder="Product ID"
                            aria-label="Product ID"
                            aria-describedby="basic-addon1"
                            value={data.ProductId}

                        />
                        <Form.Control
                            className="input-text-box mt-5"
                            placeholder="Product Name"
                            aria-label="Product Name"
                            aria-describedby="basic-addon1"
                            value={data.ProductName}
                            onChange={(e) => {
                                setData({ ...data, ProductName: e.target.value });
                            }}
                            style={{ border: data.ProductName.length > 1 ? "1.5px solid green" : "1.5px solid red" }}
                        />
                        <Form.Control
                            className="input-text-box mt-5"
                            placeholder="Retail Price"
                            aria-label="Retail Price"
                            aria-describedby="basic-addon1"
                            value={data.ProductRetailPrice}
                            onChange={(e) => {
                                setData({ ...data, ProductRetailPrice: e.target.value });
                            }}
                            style={{ border: data.ProductRetailPrice > 0 ? "1.5px solid green" : "1.5px solid red" }}
                        />
                        <Form.Control
                            className="input-text-box mt-5"
                            placeholder="Actual Price"
                            aria-label="Actual Price"
                            aria-describedby="basic-addon1"
                            value={data.ProductActualPrice}
                            onChange={(e) => {
                                setData({ ...data, ProductActualPrice: e.target.value });
                                console.log()
                            }}
                            style={{ border: data.ProductActualPrice > 0 ? "1.5px solid green" : "1.5px solid red" }}

                        />
                        <Form.Control
                            className="input-text-box mt-5"
                            placeholder="Stock"
                            aria-label="Stock"
                            aria-describedby="basic-addon1"
                            value={data.ProductStock}
                            onChange={(e) => {
                                setData({ ...data, ProductStock: e.target.value });
                                console.log()
                            }}
                            style={{ border: data.ProductStock > 0 ? "1.5px solid green" : "1.5px solid red" }}

                        />
                        <Form.Control
                            className="input-text-box mt-5"
                            placeholder="GST Percentage"
                            aria-label="GST Percentage"
                            aria-describedby="basic-addon1"
                            value={data.GSTPercentage}
                            onChange={(e) => {
                                setData({ ...data, GSTPercentage: e.target.value });
                                console.log()
                            }}
                            style={{ border: data.GSTPercentage > 0 ? "1.5px solid green" : "1.5px solid red" }}

                        />
                        <Form.Control
                            className="input-text-box mt-5"
                            placeholder="GST Price"
                            aria-label="GST Price"
                            aria-describedby="basic-addon1"
                            value={data.GSTPrice}
                            onChange={(e) => {
                                setData({ ...data, GSTPrice: e.target.value });
                                console.log()
                            }}
                            style={{ border: data.GSTPrice > 0 ? "1.5px solid green" : "1.5px solid red" }}

                        />
                        <Button variant={isAddProductDataValid ? "success" : "danger"} className='add-product-btn' onClick={() => addDetail()} disabled={!isAddProductDataValid}>Add Product to Market</Button>
                    </div>
                </Container>
            </Col>
            }
            {
                loader &&
                <Loader />
            }
        </>
    )
}

export default AddProduct;