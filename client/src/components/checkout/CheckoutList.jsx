import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const CheckoutList = ({ setIsAuthenticated, total }) => {
  const [products, setProducts] = useState([]);

  async function prepareCart() {
    try {
      const userCart = await fetch("http://localhost:3001/carts/user/cart", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const response = await userCart.json();
      setProducts(response);
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

  useEffect(() => {
    prepareCart();
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Card>
        <Card.Header
          style={{
            backgroundColor: "lightblue",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Your Cart Items
        </Card.Header>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            padding: "2.5rem",
            backgroundColor: "aliceblue",
          }}
        >
          {products.map((product, index) => (
            <div key={index}>
              <Card style={{ width: "20rem" }}>
                <Card.Img
                  variant="top"
                  alt={product.name}
                  style={{ width: "20rem", height: "15rem" }}
                  src={product.image_url}
                />
                <Card.Header>{product.name}</Card.Header>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <span
                        style={{
                          fontWeight: "bolder",
                        }}
                      >
                        Price:
                      </span>
                      ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span
                        style={{
                          fontWeight: "bolder",
                        }}
                      >
                        Quantity:
                      </span>
                      {product.quantity}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span
                        style={{
                          fontWeight: "bolder",
                        }}
                      >
                        Product Total:
                      </span>
                      ${product.price * product.quantity}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <Card.Footer
          style={{
            backgroundColor: "lightblue",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Total Cost: ${total}
        </Card.Footer>
      </Card>
    </>
  );
};

export default CheckoutList;
