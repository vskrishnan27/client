import { Table, Button, Container, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";
import { Navigate } from "react-router-dom";
import "./update.css";
const StockUpdate = () => {
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({
    id: 0,
    stock: 0,
    retail: 0,
    actual: 0,
    gst: 0,
  });
  const [loading, setloading] = useState(false);

  const [List, setList] = useState([]);

  useEffect(() => {
    try {
      const apicall = async () => {
        setloading(true);
        const data = await axios.get("https://myappget.herokuapp.com/list");
        setList(data.data);
        console.log(data.data);
        setloading(false);
      };
      apicall();
    } catch (err) {
      console.log(err);
    }
  }, [refresh]);

  const handleClose = () => setShow(false);
  const handleShow = (pid, ind) => {
    setShow(true);
    console.log(List[ind].ProductStock);
    setModalData({
      ...modalData,
      id: pid,
      prevStock: List[ind].ProductStock,
      stock: List[ind].ProductStock,
      prevActual: List[ind].ProductActualPrice,
      actual: List[ind].ProductActualPrice,
      retail: List[ind].ProductRetailPrice,
      prevRetail: List[ind].ProductRetailPrice,
      gst: List[ind].GSTPrice,
      prevgst: List[ind].GSTPrice,
    });
  };

  const updatevalinstockmodal = (val) => {
    let newval = parseInt(modalData.prevStock);
    console.log(newval);
    newval = newval + parseInt(val);
    console.log(newval);
    setModalData({
      ...modalData,
      stock: newval,
    });
  };

  const updatevalinretailmodal = (val) => {
    let newval = parseInt(modalData.prevRetail);
    console.log(newval);
    newval = newval + parseInt(val);
    console.log(newval);
    setModalData({
      ...modalData,
      retail: newval,
    });
  };
  const updatevalinactualmodal = (val) => {
    let newval = parseInt(modalData.prevActual);
    console.log(newval);
    newval = newval + parseInt(val);
    console.log(newval);
    setModalData({
      ...modalData,
      actual: newval,
    });
  };

  const updatevalingstmodal = (val) => {
    let newval = parseInt(modalData.prevgst);
    console.log(newval);
    newval = newval + parseInt(val);
    console.log(newval);
    setModalData({
      ...modalData,
      gst: newval,
    });
  };

  const editFromList = () => {
    try {
      if (!isNaN(modalData.stock)) {
        const editItem = async () => {
          setloading(true);
          handleClose();
          await axios.patch("https://myappget.herokuapp.com/update", {
            modalData,
          });
          setModalData({
            id: 0,
            stock: 0,
            retail: 0,
            actual: 0,
            gst: 0,
          });
          setloading(false);

          setRefresh(!refresh);
        };
        editItem();
      } else {
        handleClose();
      }
    } catch (err) {
      console.log(err);
      Navigate("/Error500");
    }
  };

  const removeFromList = (ProductName) => {
    if (
      window.confirm(
        `Do you want to remove the ${ProductName} product from the market?`
      )
    ) {
      try {
        const removecall = async () => {
          setloading(true);
          await axios.post("https://myappget.herokuapp.com/deleteProduct", {
            ProductName,
          });
          const tempList = List.filter(
            (info) => info.ProductName != ProductName
          );
          setList(tempList);
          setloading(false);
        };
        removecall();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {!loading && (
        <Container
          style={{
            marginTop: "5%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Table striped border hover style={{ border: "1px solid black" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Name</th>
                <th>Actual Price</th>
                <th>Retail Price</th>
                <th>GST Price</th>
                <th>GST % </th>
                <th>Stock</th>

                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            {List.map((data, ind) => (
              <tbody
                style={{
                  backgroundColor: ind % 2 === 0 ? "#f8f9fa" : "#DFDFDF",
                }}
              >
                <tr>
                  <td>{ind + 1}</td>
                  <td>{data.ProductId}</td>
                  <td>{data.ProductName}</td>
                  <td>{data.ProductActualPrice}</td>
                  <td>{data.ProductRetailPrice}</td>
                  <td>{data.GSTPrice}</td>
                  <td>{data.GSTPercentage}</td>
                  <td>{data.ProductStock}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleShow(data.ProductId, ind)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        removeFromList(data.ProductName);
                      }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Container>
      )}
      {loading && (
        <>
          {" "}
          <FerrisWheelSpinnerOverlay loading size={100} color="#FF7626" />{" "}
        </>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stock Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3 update-product-modal"
              controlId="exampleForm.ControlInput1"
            >
              <h5 style={{ margin: "10px" }}>
                Previous Stock : {modalData.prevStock}
              </h5>
              <Form.Control
                type="number"
                className="Product-update-txtbox"
                placeholder="Enter Stock to add"
                autoFocus
                onChange={(e) => {
                  if (isNaN(e.target.val)) {
                    updatevalinstockmodal(e.target.value);
                  }
                }}
              />
              <h5 style={{ margin: "10px", color: "green" }}>
                After adding Stock : {modalData.stock}
              </h5>
              <hr></hr>
              {/* =========== */}
              <h5 style={{ margin: "10px" }}>
                Previous Actual Price : {modalData.prevActual}
              </h5>
              <Form.Control
                type="number"
                className="Product-update-txtbox"
                placeholder="Enter Actual Price to add"
                autoFocus
                onChange={(e) => {
                  if (isNaN(e.target.val)) {
                    updatevalinactualmodal(e.target.value);
                  }
                }}
              />
              <h5 style={{ margin: "10px", color: "green" }}>
                After Actual Price : {modalData.actual}
              </h5>
              <hr></hr>
              <h5 style={{ margin: "10px" }}>
                Previous Retail Price : {modalData.prevRetail}
              </h5>
              <Form.Control
                type="number"
                className="Product-update-txtbox"
                placeholder="Enter Retail price to add"
                autoFocus
                onChange={(e) => {
                  if (isNaN(e.target.val)) {
                    updatevalinretailmodal(e.target.value);
                  }
                }}
              />
              <h5 style={{ margin: "10px", color: "green" }}>
                After Retail Price : {modalData.retail}
              </h5>
              <hr></hr>
              <h5 style={{ margin: "10px" }}>
                Previous GST Price : {modalData.prevgst}
              </h5>
              <Form.Control
                type="number"
                className="Product-update-txtbox"
                placeholder="Enter GST price"
                autoFocus
                onChange={(e) => {
                  if (isNaN(e.target.val)) {
                    updatevalingstmodal(e.target.value);
                  }
                }}
              />
              <h5 style={{ margin: "10px", color: "green" }}>
                After GST Price : {modalData.gst}
              </h5>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editFromList()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StockUpdate;
