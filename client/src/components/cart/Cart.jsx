import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import CartProducts from "./CartProduct";
import Button from "react-bootstrap/Button";

const Cart = ({ setIsAuthenticated, isAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState([]);

  //gets user cart
  async function getCart() {
    setIsLoading(true);
    try {
      const userCart = await fetch("http://localhost:3001/carts/user/cart", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const response = await userCart.json();
      setProducts(response);
      //console.log(products);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  ("");
  //gets total for user's cart
  async function getCartTotal() {
    try {
      const cartTotal = await fetch("http://localhost:3001/carts/cartTotal", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const amount = await cartTotal.json();
      setTotal(amount);
    } catch (error) {
      console.error("Failed to get total.", error);
    }
  }
  ("");
  //deletes a product from cart
  const removeProduct = async (id) => {
    try {
      const getUserCart = await fetch(
        "http://localhost:3001/carts/user/cartID",
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const cartId = await getUserCart.json();
      const deleteProduct = await fetch(
        `http://localhost:3001/carts/user/${cartId}/${id}`,
        {
          method: "DELETE",
        }
      );
      const deletedProduct = await deleteProduct.json();
      if (deletedProduct === "Product has been removed.") {
        setProducts(products.filter((product) => product.id !== id));
        getCartTotal();
        toast.success("Product has been removed!", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        toast.error("Failed To Delete That Product", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Cannot Delete Product Right Now", {
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
    getCart();
    getCartTotal();
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }
  }, []);

  if (isLoading) {
    return (
      <>
        <Container>
          <Card
            style={{
              padding: "3rem",
              margin: ".5rem",
              height: "26rem",
              backgroundColor: "black",
            }}
          >
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
              Getting Your Cart...
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <>
        <Card
          border="info"
          style={{ margin: "1rem", backgroundcolor: "aliceblue" }}
        >
          <Card.Header
            style={{ backgroundcolor: "thistle", fontWeight: "bold" }}
          >
            Your Cart:
          </Card.Header>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {products.map((product, index) => (
              <CartProducts
                key={index}
                id={product.id}
                name={product.name}
                image_url={product.image_url}
                price={product.price}
                description={product.description}
                quantity={product.quantity}
                removeProduct={removeProduct}
                getCartTotal={getCartTotal}
              />
            ))}
          </div>
          <Card.Footer style={{ fontWeight: "bold" }}>
            Total Price:$ {total}
          </Card.Footer>
          {products.length ? (
            <Button
              className="bg-dark outline-light text-white ms-auto p-2"
              variant="outline-info"
              style={{ margin: "0 auto" }}
            >
              <a href="/Checkout" style={{ color: "whitesmoke" }}>
                Proceed To Checkout{" "}
              </a>
            </Button>
          ) : (
            <p>Cart is empty, add some products to contine.</p>
          )}
        </Card>
      </>
    </>
  );
};

export default Cart;
