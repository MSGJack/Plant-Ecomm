import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Cancel = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <>
        <Container style={{ width: "15rem" }}>
          <Card className="text-center">
            <Card.Header>Overview</Card.Header>
            <Card.Body>
              <Card.Title
                style={{
                  fontSize: "2rem",
                  fontWeight: "bolder",
                  fontFamily: "Strait",
                }}
              >
                Purchase has fallen through.
              </Card.Title>
              <Card.Text>
                An error occured while trying to complete your tansaction.
              </Card.Text>
              <Button href="/Cart" variant="primary">
                Try Again
              </Button>
            </Card.Body>
            <Card.Footer href="/" className="text-muted">
              Ask For Support
            </Card.Footer>
          </Card>
        </Container>
      </>
    </>
  );
};

export default Cancel;
