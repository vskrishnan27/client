import { useEffect, useState } from "react";
import axios from 'axios'
import {Spinner,Table,Button, Container} from 'react-bootstrap'

const Lastsale = () => {

    const [loader, setLoader] = useState(false)
    const [salesList, setSalesList] = useState([])

    useEffect(() => {
        try{
        const callapi = async () => {
            setLoader(true)
            const data = await axios.get('https://myappget.herokuapp.com/lastsale')
            setSalesList(data.data)
            console.log(data.data)
            setLoader(false)
        }
        callapi();
        }catch(err){
            console.log(err)
        }
        
    }, [])


    return (
        <>
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
                <Table  striped border hover style={{border:'1px solid black'}} >  
                <thead>
                  <tr>
                    <th>Bill no</th>
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Time</th>
                   
                  </tr>
                </thead>

                {
                salesList.map((data,ind)=>(
                    <tbody >
                    <tr style={{ backgroundColor:  (data.SalesId%2===0) ? 'pink' : '	#FFFFFF'}}>
                      <td>{data.SalesId}</td>
                      <td>{data.ProductName}</td>
                      <td>{data.ProductPrice}</td>
                      <td>{data.ProductQty}</td>
                      <td>{data.ProductPrice*data.ProductQty}</td>
                      <td>{data.SalesDate.time}</td>
                    </tr>
                  </tbody>
                ))
                }
                </Table>
                </Container>
                </div>

            }
        </>
    )

}

export default Lastsale;