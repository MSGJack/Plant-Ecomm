import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

//gets products from db
const ListPros = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const productList = await response.json();
      setProducts(productList);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  //loading card
  if (loading) {
    return (
      <>
        <Container>
          <Card style={{ padding: "3rem", heigth: "25rem", margin: ".5rem" }}>
            <Spinner
              animation="border"
              role="status"
              variant="success"
              style={{
                width: "15rem",
                height: "15rem",
                outline: "thick double lightgreen",
                padding: "4rem",
                margin: "0 auto",
              }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <Card.Body
              style={{
                fontSize: "1.6rem",
                fontWeight: "bold",
              }}
            >
              Loading...
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  //maps out prodcuts
  return (
    <>
      <Container
        style={{
          backgroundColor: "lavenderBlush",
          borderRadius: "2rem",
          marginTop: "1rem",
          marginBottom: "1rem",
          boxShadow: "inset springgreen 1rem 1rem 4rem 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            padding: "2.5rem",
          }}
        >
          {products.map((product) => (
            <div key={product.id}>
              <div>
                <div
                  style={{
                    boxShadow: "blueviolet 1.1rem",
                  }}
                >
                  <Card
                    style={{
                      width: "20rem",
                      height: "35rem",
                      outline: "thick double bisque",
                      marginBottom: "10%",
                    }}
                  >
                    <Link to={`/products/${product.id}`}>
                      <Card.Img
                        variant="top"
                        src={product.image_url}
                        alt={product.name}
                        style={{ width: "20rem", height: "15rem" }}
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title style={{ textDecoration: "underline" }}>
                        {product.name}
                      </Card.Title>
                      <Card.Text style={{ fontSize: "1.2rem" }}>
                        {product.description}
                      </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item style={{ fontWeight: "bold" }}>
                        Price:${product.price}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default ListPros;
