import { Table, Button, Container,Form,Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from '../Loader'
import { Navigate } from "react-router-dom";
const StockUpdate = () => {
  const[refresh,setRefresh] = useState(false)
  const [show, setShow] = useState(false);
  const [modalData,setModalData] = useState({
    id:0,
    stock:0,
  })
    const [loading, setloading] = useState(false)

    const [List, setList] = useState([{
        "_id": "62b01a23628b8808fa2244fa",
        "ProductId": "1",
        "ProductName": "Growth rgulator",
        "ProductActualPrice": 1000,
        "ProductRetailPrice": 8000,
        "ProductStock": 0,
        "__v": 0
    }])

    useEffect(() => {
        try {
            const apicall = async () => {
                setloading(true)
                const data = await axios.get('http://127.0.0.1:5000/list')
                setList(data.data)
                console.log(data.data)
                setloading(false)
            }
            apicall();
        } catch (err) {
            console.log(err);
        }
    }, [refresh])

    const handleClose = () => setShow(false);
    const handleShow = (pid,ind) =>{ 
      setShow(true);
      console.log(List[ind].ProductStock)
      setModalData({
        ...modalData,
          id:pid,
          prevStock:List[ind].ProductStock,
          stock:List[ind].ProductStock
      })
     
    }

    const updatevalinmodal = (val) =>{
      let newval = parseInt(modalData.prevStock)
      console.log(newval)
      newval = newval + parseInt(val)
      console.log(newval)
       setModalData({
         ...modalData,
         stock: newval
       })
    }
    

    const editFromList = () =>{
      try{
        if(!isNaN(modalData.stock)){
        const editItem = async() =>{
          setloading(true)
            await axios.patch('http://localhost:5000/update',{modalData})
            setModalData({
              id:0,
              stock:0
            })
            setloading(false)
            handleClose()
            setRefresh(!refresh)
          }
        editItem()
        }else{
          handleClose()
        }
      }catch(err){
        console.log(err)
        Navigate('/Error500')
      }
    }

    const removeFromList=(ProductName)=>{
        try {
            const removecall = async () => {
                setloading(true)
                await axios.post('http://127.0.0.1:5000/deleteProduct', { ProductName })
                const tempList = List.filter((info)=>(
                    info.ProductName!=ProductName
                ))
                setList(tempList)                
                setloading(false)
            }
            removecall();
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <>
    {!loading && 
    <Container style={{
        height:'100vh',
        display:'flex',
        alignItems:'center'
        }}>
      <Table striped border hover style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            
            <th>Id</th>
            <th>Name</th>
            <th>Actual Price</th>
            <th>Retail Price</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        {List.map((data, ind) => (
          <tbody
            style={{ backgroundColor: ind % 2 === 0 ? "#f8f9fa" : "#DFDFDF" }}
          >
            <tr>
             
              <td>{data.ProductId}</td>
              <td>{data.ProductName}</td>
              <td>{data.ProductActualPrice}</td>
              <td>{data.ProductRetailPrice}</td>
              <td>{data.ProductStock}</td>
              <td>
              <Button variant="primary" onClick={()=>handleShow(data.ProductId,ind)}>Edit</Button>
              </td>
              <td>
                <Button variant="danger" onClick={()=>{removeFromList(data.ProductName)}}>Remove</Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      </Container>

    }
    {loading &&
        <Loader load={loading}></Loader>
    }

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stock Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <h5>Previous Stock : {modalData.prevStock}</h5>
              <Form.Control
                type="number"
                placeholder="Enter Stock to add"
                autoFocus
                
                onChange={(e)=>
                  {if(isNaN(e.target.val)){
                    updatevalinmodal(e.target.value)
                  }}
                }
              />
            </Form.Group>
            <h5>After adding Stock : {modalData.stock}</h5>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>editFromList()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StockUpdate;
