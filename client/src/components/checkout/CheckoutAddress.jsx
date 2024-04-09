import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Payment from "./Payment";

const CheckoutAddress = ({ info }) => {
  const [address, setAddress] = useState(info.address);
  const [city, setCity] = useState(info.city);
  const [state, setState] = useState(info.state);
  const [country, setCountry] = useState(info.country);
  const [zipcode, setZipcode] = useState(info.zipcode);
  const [products, setProducts] = useState([]);

  async function prepareCart() {
    //setLoading(true);
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
      //setLoading(false);
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

  const checkValidity = (address, city, state, country, zipcode) => {
    return !!address && !!city && !!state && !!country && !!zipcode;
  };

  const isValid = checkValidity(address, city, state, country, zipcode);

  const updateInfo = async (e) => {
    e.preventDefault();

    const body = {
      address: address,
      city: city,
      state: state,
      country: country,
      zipcode: zipcode,
    };

    const updateContent = await fetch(
      "http://localhost:3001/users/updateAddress",
      {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const confirmUpdate = await updateContent.json();
    if (confirmUpdate === "Address has been updated.") {
      toast.success("Info has been updated!", {
        position: "top-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.error("Failed update info", {
        position: "top-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    prepareCart();
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Card style={{ backgroundColor: "blanchedalmond" }}>
        <Card.Header style={{ background: "thistle" }}>
          Your Address
        </Card.Header>
        <InputGroup className="mb-3">
          <InputGroup.Text id="address">Address</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Address"
            aria-label="address"
            aria-describedby="address"
            contentEditable="true"
            value={address}
            minLength="1"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="city">City</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="City"
            aria-label="City"
            aria-describedby="City"
            contentEditable="true"
            value={city}
            minLength="1"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="address">State</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="State"
            aria-label="State"
            aria-describedby="State"
            contentEditable="true"
            value={state}
            minLength="1"
            onChange={(e) => setState(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="Country">Country</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Country"
            aria-label="Country"
            aria-describedby="Country"
            contentEditable="true"
            value={country}
            minLength="1"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="Zipcode">Zipcode</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Zipcode"
            aria-label="Zipcode"
            pattern="[0-9]"
            aria-describedby="Zipcode"
            contentEditable="true"
            value={zipcode}
            minLength="1"
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </InputGroup>
        <Button
          variant="primary"
          className="col-md-2 mx-auto mb-2"
          onClick={updateInfo}
          disabled={!isValid}
        >
          Update Address
        </Button>
        {!isValid ? (
          <p>Provide your adddress to continue.</p>
        ) : (
          <Payment items={products} />
        )}
      </Card>
    </>
  );
};

export default CheckoutAddress;
