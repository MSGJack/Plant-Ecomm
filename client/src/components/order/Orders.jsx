import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { GiToaster } from "react-icons/gi";

//get certain order
const Orders = () => {
  const [order, setOrder] = useState([]);
  const { order_id } = useParams();

  async function getOrderDetail() {
    try {
      const orderByID = await fetch(
        `http://localhost:3001/orders/details/${order_id}`,
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const orderDetails = await orderByID.json();
      console.log(orderDetails);
      setOrder(orderDetails);
      if (orderDetails === "No such order exist.") {
        toast.error("No such order exist.", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrderDetail();
  }, []);
  return (
    <>
      <Card style={{ padding: "2rem", margin: "1rem" }}>
        <Card.Header as="h1">Your Order:</Card.Header>
        <Card.Title>Order Number:{order_id}</Card.Title>
        {order.length ? (
          order.map((item) => (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                margin: ".5rem",
                outline: ".3rem solid ",
                padding: "1rem",
                justifyContent: "center",
                background: "aquamarine",
              }}
              key={item.id}
            >
              <Card.Img
                style={{ width: "18.5rem" }}
                src={item.image_url}
                alt={item.name}
              />
              <ListGroup
                className="list-group-flush"
                style={{ fontWeight: "bold" }}
              >
                <ListGroup.Item>
                  Data Ordered: {item.date_created}
                </ListGroup.Item>
                <ListGroup.Item>
                  Order Price: ${item.order_price}
                </ListGroup.Item>
                <ListGroup.Item>Product Price: ${item.price}</ListGroup.Item>
                <ListGroup.Item>Product Name: {item.name}</ListGroup.Item>
                <ListGroup.Item>Quantity: {item.quantity}</ListGroup.Item>
              </ListGroup>
            </div>
          ))
        ) : (
          <Card.Body>
            That order doesn't exists for you. If you believe there's an error,
            please contact us as soon as possible.
          </Card.Body>
        )}
        <Card.Body>
          <Link to="/viewOrders">View Orders</Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default Orders;
/*

 || "No orders have been placed"

const [order, setOrder] = useState([]);
  const { id } = useParams();

  async function getOrderDetail() {
    try {
      const getOrder = await fetch(`http://localhost:3001/orders/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const orderDetails = await getOrder.json();
      console.log(orderDetails);
      setOrder(orderDetails);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrderDetail();
  }, []);
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Header as="h1">Your Order:</Card.Header>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
          <Card.Title>Your Current Order:</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Data Ordered: {order.date_created}</ListGroup.Item>
          <ListGroup.Item>Order Price: {order.order_price}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">View</Card.Link>
        </Card.Body>
      </Card>



  
 <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />

*/
