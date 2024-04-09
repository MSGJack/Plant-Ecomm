import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProductToCart from "./AddProduct";

//display card for single product
const ProductCard = ({ isAuthenticated, setIsAuthenticated }) => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);

  //gets products information
  async function getProductDetail() {
    try {
      const getProductDetail = await fetch(
        `http://localhost:3001/products/${id}`,
        {
          method: "GET",
        }
      );
      const details = await getProductDetail.json();
      setDetails(details);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProductDetail();
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }
  }, []);
  //product info
  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <Card
            style={{
              width: "25rem",
              outline: "thick double bisque",
              marginBottom: "5%",
              boxShadow: ".1rem -.1rem 1rem 1rem aquamarine",
            }}
          >
            <Card.Img
              variant="top"
              src={details.image_url}
              alt={details.name}
            />
            <Card.Body>
              <Card.Title
                style={{ textDecoration: "underline", fontWeight: "bolder" }}
              >
                {details.name}
              </Card.Title>
              <Card.Text style={{ fontSize: "1.2rem" }}>
                {details.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{ fontWeight: "bold" }}>
                Price:${details.price}
              </ListGroup.Item>
            </ListGroup>
            {isAuthenticated && <AddProductToCart id={id} details={details} />}
          </Card>
        </div>
      </Container>
    </>
  );
};

export default ProductCard;
