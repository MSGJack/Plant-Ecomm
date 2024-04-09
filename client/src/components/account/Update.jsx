import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import DisplayInfo from "./EditInfo";

////handles authenticated status
const UpdateProfile = ({ setIsAuthenticated, isAuthenticated }) => {
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getInfo() {
    setIsLoading(true);
    try {
      const getUserInfo = await fetch("http://localhost:3001/users/self", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const userInfo = await getUserInfo.json();
      setInfo(userInfo);
      setIsLoading(false);
    } catch (error) {
      toast.error("Cannot Get Information Right Now.", {
        position: "top-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    }
  }

  useEffect(() => {
    getInfo();
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }
  }, []);

  if (isLoading) {
    return (
      <>
        <Container>
          <Card style={{ padding: "3rem" }}>
            <Spinner
              animation="border"
              role="status"
              variant="danger"
              style={{
                width: "5rem",
                height: "5rem",
                outline: "thick double hotpink",
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
              Getting Your Information...
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container style={{ padding: "1rem" }}>
        <Card>
          {info.map((information, index) => (
            <DisplayInfo information={information} key={index} />
          ))}
        </Card>
      </Container>
    </>
  );
};

export default UpdateProfile;
