import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//handles authenticated status
const Login = ({ setIsAuthenticated }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { email, password } = input;

  const onInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const tryLogin = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const loginData = await tryLogin.json();
      //notifies user if email or password are incorrect
      if (loginData === "Email or Password is incorrect") {
        toast.error("Email or Password is incorrect", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      } else if (loginData.token) {
        localStorage.setItem("token", loginData.token);
        setIsAuthenticated(true);
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        setIsAuthenticated(false);
        toast.error("Cannot Login right now.", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container style={{ padding: "3rem" }}>
        <Form
          onSubmit={onSubmitForm}
          style={{
            backgroundColor: "darkslateblue",
            padding: "2rem 3rem 7rem 3rem",
            margin: "1rem",
            borderRadius: "2rem",
          }}
        >
          <h2 style={{ color: "white" }}>Login</h2>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label style={{ color: "whitesmoke" }}>
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              htmlFor="email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label style={{ color: "whitesmoke" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              htmlFor="password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

          <p
            className="text-center mt-5 mb-0 reg"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            Need an account?
            <Link to="/register" className="fw-bold text-body">
              <u>Register Here</u>
            </Link>
          </p>
        </Form>
      </Container>
    </>
  );
};

export default Login;
