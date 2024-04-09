import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { RiAddCircleFill } from "react-icons/ri";
import { FaMinusCircle } from "react-icons/fa";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";

//adds product to user's cart
//passes product details
const AddProductToCart = ({ id, details, price }) => {
  const [cartProducts, setCartProducts] = useState(1);

  //handles amount of quantity wants, also checks if quanity is less than 2 so it can preven adding 0 quantity
  function handleQuantity(amount) {
    setCartProducts((currentQuantity) => {
      if (currentQuantity < 1) {
        return 1;
      }
      return currentQuantity + amount;
    });
  }

  const addToCart = async () => {
    if (cartProducts > 0) {
      try {
        //gets user cart
        const getUserCart = await fetch(
          "http://localhost:3001/carts/user/cartID",
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        const userCart = await getUserCart.json();
        //defines body
        const body = {
          product_id: details.id,
          quantity: parseInt(cartProducts),
        };
        //adds to user cart
        const addProduct = await fetch(
          `http://localhost:3001/carts/user/${userCart}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        const productAdded = await addProduct.json();
        if (productAdded === "Item had been added to your cart.") {
          toast.success("Product has been added!", {
            position: "top-center",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: "dark",
          });
          ////notifies user that the product is already in cart, prevent duplicates
        } else if (productAdded === "Product is already in your cart.") {
          toast.error("Product is already in cart.", {
            position: "top-center",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: "dark",
          });
        } else {
          toast.error("Failed To Add That Product", {
            position: "top-center",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: "dark",
          });
        }
      } catch (error) {
        toast.error("Cannot add Product right now.", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
  };
  //Quanity section
  return (
    <>
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
              className="bg-dark outline-light text-white ms-auto p-1"
              variant="outline-danger"
              onClick={() => handleQuantity(-1)}
            >
              <FaMinusCircle />
            </Button>
            <span>Quantity: {cartProducts}</span>
            <Button
              className="bg-dark outline-light text-white ms-auto p-1"
              variant="outline-info"
              onClick={() => handleQuantity(+1)}
            >
              <RiAddCircleFill />
            </Button>
            <Button
              variant="outline-success"
              className="bg-dark outline-light text-white ms-auto p-1"
              onClick={addToCart}
            >
              Add
            </Button>
          </Stack>
        </ListGroup.Item>
        <ListGroup.Item>
          {" "}
          <div>
            <span
              style={{
                fontWeight: "bold",
                backgroundColor: "lightgray",
              }}
            >
              Product Total: ${cartProducts * details.price}
            </span>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default AddProductToCart;
