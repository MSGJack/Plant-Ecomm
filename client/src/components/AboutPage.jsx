import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "react-toastify/dist/ReactToastify.css";

const About = () => {
  return (
    <>
      <Container style={{ padding: "1rem" }}>
        <Card
          className="text-center"
          style={{ marginTop: "1rem", padding: "1rem" }}
        >
          <h2>Our Mission</h2>
          <Card.Body>
            <Card.Title>Us</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              dignissimos libero accusantium, sint dolorum porro hic quasi
              officia cupiditate odio debitis vero, fugiat consectetur veniam
              quas itaque voluptatibus explicabo nobis. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Et commodi odit accusantium
              eos velit perspiciatis non architecto ab facere, molestiae
              nesciunt officiis ex aut laborum tempore eligendi voluptas neque
              repellat?
            </Card.Text>
          </Card.Body>
          <Card.Title>Locations</Card.Title>
          <Card.Body>
            Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Nobis vero, fugit doloribus, repellendus praesentium iusto mollitia
            excepturi tempora a porro deleniti in quod exercitationem error
            necessitatibus. Maiores veritatis corporis in.
          </Card.Body>
          <Card.Title>Special Requets</Card.Title>
          <Card.Body>
            Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Nobis vero, fugit doloribus, repellendus praesentium iusto mollitia
            excepturi tempora a porro deleniti in quod exercitationem error
            necessitatibus. Maiores veritatis corporis in.
          </Card.Body>
          <Card.Title>Qustions</Card.Title>
          <Card.Body>
            Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Nobis vero, fugit doloribus, repellendus praesentium iusto mollitia
            excepturi tempora a porro deleniti in quod exercitationem error
            necessitatibus. Maiores veritatis corporis in. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Necessitatibus qui deleniti quasi
            quo. Laboriosam asperiores odit veniam sapiente voluptatibus
            quisquam eaque neque, facere consequatur voluptate magni vel dolorem
            quae assumenda.
          </Card.Body>
          <Card.Title>Future Products</Card.Title>
          <Card.Body>
            Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Nobis vero, fugit doloribus, repellendus praesentium iusto mollitia
            excepturi tempora a porro deleniti in quod exercitationem error
            necessitatibus. Maiores veritatis corporis in.
          </Card.Body>
          <Card.Footer className="text-muted">
            More Locations Coming Soon!
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default About;
