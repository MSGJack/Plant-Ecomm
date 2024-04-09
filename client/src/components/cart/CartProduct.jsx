import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiAddCircleFill } from "react-icons/ri";
import { FaMinusCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import CardFooter from "react-bootstrap/esm/CardFooter";

//passed down relevant properties
const CartProducts = ({
  id,
  name,
  price,
  quantity,
  image_url,
  description,
  removeProduct,
  getCartTotal,
}) => {
  const [productQuantity, setProductQuantity] = useState(quantity);
  //works for both incrementing and decrementing, making currentQuality return 1 when its less than 2 ensures that it will never be 0 or a negative number
  function handleQuantity(amount) {
    setProductQuantity((currentQuantity) => {
      if (currentQuantity < 2) {
        return 1;
      }
      return currentQuantity + amount;
    });
  }
  //updates a product
  const updateCart = async () => {
    try {
      //gets users cart
      const getUserCart = await fetch(
        "http://localhost:3001/carts/user/cartID",
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      //processes the response
      const userCart = await getUserCart.json();
      //create body for put request
      const body = {
        product_id: id,
        quantity: parseInt(productQuantity),
      };
      const updateCart = await fetch(
        `http://localhost:3001/carts/user/${userCart}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const completeUpdate = await updateCart.json();
      //notifies user when cart product hasa been updated then updates cart total
      if (completeUpdate === "Update has been completed.") {
        setProductQuantity(productQuantity);
        getCartTotal();
        toast.success("Cart has been updated!", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        toast.error("Failed To Update That Product", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Failed to update Product.", {
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
      <Card
        style={{
          width: "20rem",
          height: "41rem",
          outline: "thick double bisque",
          margin: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <Link to={`/products/${id}`}>
            <Card.Img
              variant="top"
              src={image_url}
              alt={name}
              style={{ width: "20rem", height: "15rem" }}
            />
          </Link>
          <Card.Body>
            <Card.Title style={{ textDecoration: "underline" }}>
              {name}
            </Card.Title>
            <Card.Text style={{ fontSize: "1.2rem" }}>{description}</Card.Text>
          </Card.Body>
          <ListGroup
            className="list-group-flush"
            style={{ fontWeight: "bold" }}
          >
            <ListGroup.Item>Price:${price}</ListGroup.Item>
            <ListGroup.Item
              style={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Stack direction="horizontal" gap={3}>
                <Button
                  className="bg-dark outline-light text-white ms-auto p-1"
                  variant="outline-dark"
                  onClick={() => handleQuantity(-1)}
                >
                  <FaMinusCircle />
                </Button>
                Quantity: {productQuantity}
                <Button
                  className="bg-dark outline-light text-white ms-auto p-1"
                  variant="outline-info"
                  onClick={() =>
                    setProductQuantity((prevProduct) => prevProduct + 1)
                  }
                >
                  <RiAddCircleFill />
                </Button>
              </Stack>
            </ListGroup.Item>
            <ListGroup className="list-group-flush">
              <ListGroup.Item
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Stack direction="horizontal" gap={3}>
                  <Button
                    variant="outline-danger"
                    className="bg-dark outline-light text-white ms-auto p-1"
                    onClick={() => removeProduct(id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="outline-success"
                    className="bg-dark outline-light text-white ms-auto p-1"
                    onClick={() => updateCart(id)}
                  >
                    Update
                  </Button>
                </Stack>
              </ListGroup.Item>
            </ListGroup>
          </ListGroup>
          <CardFooter
            style={{
              fontWeight: "bold",
              lineHeight: "1rem",
              backgroundColor: "aliceblue",
            }}
          >
            Product Total: ${price * productQuantity}
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default CartProducts;
