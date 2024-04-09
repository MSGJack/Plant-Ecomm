import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IconContext } from "react-icons";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import Card from "react-bootstrap/Card";

const Footer = () => {
  return (
    <>
      <Card
        className="text-center"
        style={{
          listStyle: "none",
          backgroundColor: "crimson",
          color: "antiquewhite",
          fontWeight: "bolder",
          bottom: "0",
          left: "0",
          width: "100%",
        }}
      >
        <Card.Header id="contact">Follow Us</Card.Header>
        <Card.Body
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            backgroundColor: "lightcoral",
          }}
        >
          <li>
            <a
              aria-label="instagram"
              href="https://www.instagram.com/"
              target="_blank"
            >
              <IconContext.Provider
                value={{
                  color: "antiquewhite",
                  backgroundColor: "darkslateblue",
                  size: "2rem",
                  borderRadius: "60%",
                }}
              >
                <FaSquareInstagram />
              </IconContext.Provider>
            </a>
          </li>
          <li>
            <a
              aria-label="twitter"
              href="https://www.twitter.com/"
              target="_blank"
            >
              <IconContext.Provider
                value={{
                  color: "antiquewhite",
                  backgroundColor: "darkslateblue",
                  size: "2rem",
                  borderRadius: "60%",
                }}
              >
                <FaSquareXTwitter />
              </IconContext.Provider>
            </a>
          </li>
          <li>
            <a
              aria-label="facebook"
              href="https://www.facebook.com/"
              target="_blank"
            >
              <IconContext.Provider
                value={{
                  color: "antiquewhite",
                  backgroundColor: "darkslateblue",
                  size: "2rem",
                  borderRadius: "60%",
                }}
              >
                <FaFacebook />
              </IconContext.Provider>
            </a>
          </li>
        </Card.Body>
        <Card.Footer>All Rights Reserved</Card.Footer>
      </Card>
    </>
  );
};

export default Footer;
