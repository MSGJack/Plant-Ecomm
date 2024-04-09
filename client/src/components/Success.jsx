import React, { useEffect, Link } from "react";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Success = ({ setIsAuthenticated, isAuthenticated }) => {
  async function makeChange() {
    //moves products from cart to order and emptys cart
    try {
      const userCart = await fetch("http://localhost:3001/carts/checkoutCart", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const response = await userCart.json();
      console.log(response);
    } catch (error) {
      console.error("Failed to get info", error);
    }
  }

  useEffect(() => {
    makeChange();
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Container style={{ padding: "1rem" }}>
        <Card
          style={{
            height: "45rem",
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
            margin: "auto",
          }}
          className="text-center"
        >
          <Card.Header>Overview</Card.Header>
          <Card.Body>
            <Card.Title
              style={{
                fontSize: "2rem",
                fontWeight: "bolder",
                fontFamily: "Strait",
              }}
            >
              Thank You for your purchase!
            </Card.Title>
            <Card.Text>
              Your order will be prepare in the upcoming days. An email will
              notify you once it has shipped!
            </Card.Text>
            <Card.Text>
              Let us know how your products are. Provide any suggestions and
              we'll get back to you as soon as possible. Don't forget to tell
              your friends about us!
            </Card.Text>
            <Card.Text>We look forward to seeing you back.</Card.Text>
            <Button href="/viewOrders" variant="primary">
              Review Your Orders Here...
            </Button>
          </Card.Body>
          <Card.Footer to="/" className="text-muted">
            Contine To Home
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default Success;
