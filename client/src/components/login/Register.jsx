import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { registerSchema } from "../../config/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ setIsAuthenticated }) => {
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  const {
    first_name,
    last_name,
    email,
    password,
    password_confirm,
    address,
    city,
    state,
    country,
    zipcode,
  } = input;

  //checks if password has at least 1, lowercase and uppercase letter and 1 number
  const checkPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{9,100}$/.test(password);
  };

  //checks if first name, last name, email and password are not empty
  const checkValidity = (first_name, last_name, email) => {
    return !!first_name && !!last_name && email && checkPassword(password);
  };

  //checks if previous function returns anything false
  const isValid = checkValidity(first_name, last_name, email);

  const onInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      //tells user if passwords and confirm password are not matching
      if (password !== password_confirm) {
        toast.error("Passwords are not matching!", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
        return;
      }

      const body = {
        first_name,
        last_name,
        email,
        password,
        address,
        city,
        state,
        country,
        zipcode,
      };

      const checkForm = await registerSchema.validate(body);

      const registerUser = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const registration = await registerUser.json();
      //alerts the user if their email is already in use
      if (registration === "That email is already being used.") {
        toast.error("That email is in use, please use another.", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      } else if (registration.token) {
        localStorage.setItem("token", registration.token);
        setIsAuthenticated(true);
        toast.success("Registration Successful!", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        setIsAuthenticated(false);
        toast.error("Failed To Register You", {
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
  };

  return (
    <>
      <Container>
        <ToastContainer />
        <Form
          onSubmit={onSubmitForm}
          style={{
            backgroundColor: "peachpuff",
            outline: ".5rem inset lightyellow",
            padding: "2rem 2rem 7rem 2rem",
            margin: "1rem",
          }}
        >
          <h2>Registration</h2>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="First Name"
                htmlFor="first_name"
                aria-label="First Name"
                value={first_name}
                required
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="last_name"
                htmlFor="lastname"
                aria-label="last name"
                value={last_name}
                required
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                htmlFor="email"
                aria-label="email"
                name="email"
                value={email}
                required
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                htmlFor="password"
                aria-label="password"
                name="password"
                value={password}
                required
                onChange={(e) => onInputChange(e)}
              />
              <Form.Text className="heading">
                Must have lowercase and uppercase letters, numbers and be longer
                than 8 characters
              </Form.Text>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="password_confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confrim Password"
                htmlFor="password_confrim"
                aria-label="Confrim Password"
                name="password_confirm"
                value={password_confirm}
                required
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="Address"
                htmlFor="address"
                aria-label="address"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder="City..."
                htmlFor="city"
                aria-label="city"
                name="city"
                value={city}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                placeholder="Country..."
                htmlFor="country"
                aria-label="country"
                name="country"
                value={country}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="State">
              <Form.Label>State</Form.Label>
              <Form.Control
                placeholder="State..."
                htmlFor="state"
                aria-label="state"
                name="state"
                value={state}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="zipcode">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                placeholder="Zipcode..."
                htmlFor="zipcode"
                aria-label="zipcode"
                name="zipcode"
                value={zipcode}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" disabled={!isValid}>
            Submit
          </Button>

          <p
            className="text-center mt-5 mb-0 reg"
            style={{ color: "black", fontWeight: "bolder" }}
          >
            Have an account?
            <Link to="/Login" className="fw-bold text-body">
              <u>Login Here</u>
            </Link>
          </p>
        </Form>
      </Container>
    </>
  );
};

export default Register;
