import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { Card, ListGroup, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import './ProductList.css'
import Loader from '../Loader'
import { FerrisWheelSpinnerOverlay } from 'react-spinner-overlay'



const ProductListing = () => {

    const [loading, setloading] = useState(false)

    const [List, setList] = useState([])

    useEffect(() => {
        const navigate = useNavigate
        try {
            const apicall = async () => {
                setloading(true)
                const data = await axios.get('https://myappget.herokuapp.com/list')
                const arr = data.data
                arr.sort((a, b) => a.ProductStock - b.ProductStock)
                setList(arr)
                setloading(false)
            }
            apicall();
        } catch (err) {
            navigate('/Error500')
            console.log(err);
        }
    }, [])

    return (
        <>
            {!loading &&
                <Container>
                    <Row>
                        {
                            List.map((data, ind) => (
                                <Col md={{ span: 4 }} sm={6} key={ind}>
                                    <Card style={{ margin: '13px' }} className='product-list-card-style '  >
                                        {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                                        <Card.Body className="card-title-product-listing" >
                                            <Card.Title className='product-list-card-title'>{data.ProductName}</Card.Title>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>Stock : {data.ProductStock}</ListGroup.Item>
                                            <ListGroup.Item>Retail Price : {data.ProductRetailPrice}</ListGroup.Item>
                                            <ListGroup.Item>Actual Price : {data.ProductActualPrice}</ListGroup.Item>
                                        </ListGroup>

                                    </Card>
                                </Col>))
                        }
                    </Row>
                </Container>
            }


            {loading &&
                <> <FerrisWheelSpinnerOverlay loading size={100} color="#FF7626" /> </>
            }

        </>
    )
}

export default ProductListing;