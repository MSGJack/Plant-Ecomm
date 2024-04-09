import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GiShoppingCart } from "react-icons/gi";
import { GiFlowerPot } from "react-icons/gi";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";

const Dashboard = ({ setIsAuthenticated, isAuthenticated }) => {
  const [items, setItems] = useState([]);

  //gets the quanity in cart and displays it
  async function getCartQty() {
    try {
      const userCart = await fetch("http://localhost:3001/carts/user/cart", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const response = await userCart.json();
      if (!response) {
        return 0;
      } else {
        let cartItems = 0;
        for (let product in response) {
          cartItems += response[product].quantity;
        }
        setItems(cartItems);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("You've logged out successfully!", {
      position: "top-center",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: "dark",
    });
  };

  useEffect(() => {
    getCartQty();
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }
  }, [setItems]);

  //Checks if user is authenticated, displays dashboard if user is verified
  return (
    <>
      {isAuthenticated ? (
        <Nav
          justify
          variant="tabs"
          style={{
            border: "0rem",
            outline: "solid",
            outlineColor: "black",
            backgroundColor: "crimson",
            fontSize: "1.1rem",
          }}
          defaultActiveKey="/"
          href="/"
        >
          <IconContext.Provider
            value={{
              color: "lightpink",
              size: "2.8rem",
              borderRadius: "60%",
              margin: "auto",
            }}
          >
            <GiFlowerPot />
          </IconContext.Provider>
          <h1
            style={{
              lineHeight: "3rem",
              borderRadius: ".5rem",
              margin: "auto",
              color: "bisque",
            }}
          >
            Blumas
          </h1>
          <Nav.Item>
            <Nav.Link
              href="/Products"
              style={{ color: "antiquewhite" }}
              eventKey="link-1"
            >
              Products
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/Cart"
              style={{ color: "antiquewhite" }}
              eventKey="link-2"
            >
              {" "}
              Cart
              <IconContext.Provider
                value={{
                  color: "white",
                  size: "2rem",
                }}
              >
                <GiShoppingCart />
                <span
                  style={{
                    backgroundColor: "black",
                    border: ".1rem solid aquamarine",
                    borderRadius: ".5rem",
                    position: "relative",
                    fontSize: "large",
                    padding: ".3rem",
                    color: "lightyellow",
                  }}
                >
                  {items}
                </span>
              </IconContext.Provider>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              style={{ color: "antiquewhite" }}
              eventKey="link-3"
              href="\"
            >
              Contact
            </Nav.Link>
          </Nav.Item>
          <NavDropdown
            style={{ color: "antiquewhite" }}
            title="Profile"
            id="nav-dropdown"
          >
            <NavDropdown.Item eventKey="4.1" href="/UpdateProfile">
              Update Info
            </NavDropdown.Item>
            <NavDropdown.Item href="/viewOrders" eventKey="4.2">
              View History
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Reviews</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.4" onClick={(e) => logout(e)}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      ) : (
        <Nav
          justify
          style={{
            border: "0rem",
            outline: "solid",
            outlineColor: "black",
            backgroundColor: "crimson",
            fontSize: "1.1rem",
            gap: ".5rem",
          }}
          className="NavPublic"
          variant="tabs"
        >
          <IconContext.Provider
            value={{
              color: "lightpink",
              size: "2.5rem",
              margin: "auto",
            }}
          >
            <GiFlowerPot />
          </IconContext.Provider>
          <h1
            style={{
              lineHeight: "3rem",
              borderRadius: ".5rem",
              margin: "auto",
              color: "bisque",
            }}
          >
            Blumas
          </h1>

          <Nav.Item>
            <Nav.Link style={{ color: "antiquewhite" }} href="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              style={{ color: "antiquewhite" }}
              href="/Register"
              eventKey="link-1"
            >
              Register
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              style={{ color: "antiquewhite" }}
              href="/Login"
              eventKey="link-2"
            >
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              style={{ color: "antiquewhite" }}
              href="/Products"
              eventKey="link-3"
            >
              Products
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
    </>
  );
};

export default Dashboard;
