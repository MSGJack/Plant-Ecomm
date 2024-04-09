import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import CardBody from "react-bootstrap/esm/CardBody";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Link, Outlet } from "react-router-dom";

//get all orders for a user
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const { id } = useParams();

  async function getOrderHistory() {
    setIsLoading(true);
    try {
      const getPastOrders = await fetch(
        "http://localhost:3001/orders/user/orders",
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const userOrderHistory = await getPastOrders.json();
      // if (userOrderHistory === 0) {
      //  return <h3>You haven't made any orders.</h3>;
      //}
      console.log(userOrderHistory);
      setOrders(userOrderHistory);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrderHistory();
  }, []);

  if (isLoading) {
    return (
      <>
        <Container>
          <Card style={{ padding: "3rem", backgroundColor: "skyblue" }}>
            <Spinner
              animation="grow"
              role="status"
              variant="primary"
              style={{
                width: "5rem",
                height: "5rem",
                outline: "thick double pink",
                padding: "4rem",
                margin: "0 auto",
              }}
            >
              <span className="visually-hidden">Getting your orders...</span>
            </Spinner>
            <Card.Body
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Getting Your Orders...
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container style={{ padding: "1rem" }}>
        <Card>
          <Card.Header as="h1">Your Order History:</Card.Header>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              padding: "2.5rem",
              flexDirection: "column",
            }}
          >
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={index}>
                  <Card.Body
                    style={{
                      backgroundColor: "lightcyan",
                      outline: ".2rem black solid",
                      margin: "1rem",
                    }}
                  >
                    <Link to={`/orders/${order.order_id}`}>
                      <Card.Header
                        style={{
                          textDecoration: "underline",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          backgroundColor: "skyblue",
                        }}
                      >
                        Order Number: {order.order_id}
                      </Card.Header>
                    </Link>
                    <ListGroup.Item action variant="primary">
                      Product Name: {order.name}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="primary">
                      Product Price: ${order.price}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="primary">
                      Product Quanity: {order.quantity}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="primary">
                      Product Total: ${order.price * order.quantity}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="primary">
                      Order Created At: {order.date_created}
                    </ListGroup.Item>
                    <Card.Footer
                      style={{
                        backgroundColor: "skyblue",
                        textDecoration: "underline",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      Order Total: ${order.order_price}
                    </Card.Footer>
                  </Card.Body>
                </div>
              ))
            ) : (
              <Card.Body>No orders exists for you.</Card.Body>
            )}
          </div>
        </Card>
      </Container>
    </>
  );
};

export default OrderHistory;
