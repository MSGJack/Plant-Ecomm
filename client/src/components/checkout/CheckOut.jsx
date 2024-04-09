import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CheckoutAddress from "./CheckoutAddress";
import Payment from "./Payment";
import CheckoutList from "./CheckoutList";

const Checkout = ({ setIsAuthenticated, isAuthenticated }) => {
  //Stripe payment state
  const [userInfo, setUserInfo] = useState([]);
  const [total, setTotal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function prepareCart() {
    setLoading(true);
    try {
      const userCart = await fetch("http://localhost:3001/carts/user/cart", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const response = await userCart.json();
      console.log(response);
      setProducts(response);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to get your cart.", {
        position: "top-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    }
  }
  ("");

  async function getUserAddress() {
    setIsLoading(true);
    try {
      const getAddress = await fetch(
        "http://localhost:3001/users/userAddress",
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const addressInfo = await getAddress.json();
      console.log(addressInfo);
      setUserInfo(addressInfo);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to get your address.", {
        position: "top-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    }
  }

  async function getCartTotal() {
    //setIsLoading(true);
    try {
      const cartTotal = await fetch("http://localhost:3001/carts/cartTotal", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const amount = await cartTotal.json();
      console.log(amount);
      setTotal(amount);
      //setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  ("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getUserAddress();
    getCartTotal();
    prepareCart();
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }
  }, []);

  if (isLoading) {
    return (
      <>
        <Container>
          <Card style={{ padding: "3rem", margin: "1rem", height: "33rem" }}>
            <Spinner
              animation="border"
              role="status"
              variant="info"
              style={{
                width: "5rem",
                height: "5rem",
                outline: "thick double cyan",
                padding: "4rem",
                margin: "0 auto",
              }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <Card.Body
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Getting Your Info...
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container style={{ margin: ".8rem" }}>
        <CheckoutList total={total} />
        <Card style={{ marginTop: "1rem" }}>
          <Card>
            {userInfo.map((info, index) => (
              <CheckoutAddress
                key={index}
                info={info}
                address={info.address}
                city={info.city}
                state={info.state}
                country={info.country}
                zipcode={info.zipcode}
              />
            ))}
          </Card>
        </Card>
      </Container>
    </>
  );
};

export default Checkout;
