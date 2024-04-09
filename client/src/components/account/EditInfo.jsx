import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import CardFooter from "react-bootstrap/esm/CardFooter";

//pass down information and properties
const DisplayInfo = ({ information }) => {
  const [first_name, setFirst_name] = useState(information.first_name);
  const [last_name, setLast_name] = useState(information.last_name);
  const [email, setEmail] = useState(information.email);
  const [password, setPassword] = useState(information.password);
  const [address, setAddress] = useState(information.address);
  const [city, setCity] = useState(information.city);
  const [state, setState] = useState(information.state);
  const [country, setCountry] = useState(information.country);
  const [zipcode, setZipcode] = useState(information.zipcode);

  //checks if password has at least 1, lowercase and uppercase letter and 1 number
  const checkPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{9,100}$/.test(password);
  };

  //checks if first name, last name, email and password are empty, these are conly checked since they're required
  const checkValidity = (first_name, last_name, email) => {
    return !!first_name && !!last_name && email && checkPassword(password);
  };

  // //checks if previous function returns anything false
  const isValid = checkValidity(first_name, last_name, email);

  const updateInfo = async (e) => {
    e.preventDefault();

    const body = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      address: address,
      city: city,
      state: state,
      country: country,
      zipcode: zipcode,
    };

    //updates user info
    const updateContent = await fetch("http://localhost:3001/users/self", {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const confirmUpdate = await updateContent.json();
    if (confirmUpdate === "User has been updated.") {
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

  return (
    <>
      <Form onSubmit={(e) => updateInfo(e)}>
        <Stack gap={2} className="col-md-11 mx-auto">
          <Card style={{ backgroundColor: "turquoise" }}>
            <Card.Header
              className="text-center mb-3 fw-bold"
              style={{ backgroundColor: "skyblue" }}
            >
              Your Information
            </Card.Header>

            <Form.Group as={Col} className="mb-3" controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                htmlFor="first_name"
                aria-label="Your First Name"
                value={first_name}
                contentEditable="true"
                required
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                htmlFor="last_name"
                aria-label="Your Last Name"
                value={last_name}
                contentEditable="true"
                required
                onChange={(e) => setLast_name(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                htmlFor="email"
                aria-label="Your Email"
                value={email}
                contentEditable="true"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                htmlFor="password"
                aria-label="Your Password"
                value={password}
                contentEditable="true"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="heading" style={{ color: "wheat" }}>
                Must have lowercase and uppercase letters, numbers and be longer
                than 8 characters
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                htmlFor="address"
                aria-label="Your Address"
                value={address}
                contentEditable="true"
                //required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="City">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="City"
                htmlFor="City"
                aria-label="Your City"
                value={city}
                contentEditable="true"
                //required
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                htmlFor="state"
                aria-label="Your State"
                value={state}
                contentEditable="true"
                //required
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                htmlFor="country"
                aria-label="Your Country"
                value={country}
                contentEditable="true"
                //required
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="zipcode">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                pattern="[0-9]"
                name="zipcode"
                htmlFor="zipcode"
                aria-label="Your Zipcode"
                value={zipcode}
                contentEditable="true"
                //required only when preparing order
                onChange={(e) => setZipcode(e.target.value)}
              />
            </Form.Group>
            <CardFooter style={{ backgroundColor: "turquoise" }}>
              <Button
                variant="primary"
                className="col-md-2 mx-auto mb-2"
                onClick={updateInfo}
                disabled={!isValid}
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </Stack>
      </Form>
    </>
  );
};

export default DisplayInfo;
