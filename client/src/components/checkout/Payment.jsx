import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Payment = ({ items }) => {
  const stripe = useStripe();

  const handleCheckout = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_KEY);

    const body = {
      products: items,
    };
    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    };
    const response = await fetch(
      "http://localhost:3001/payment/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    console.log(session);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
      toast.error("Cart cannot be empty.", {
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
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleCheckout}>
        <div>
          <button
            onClick={handleCheckout}
            className="btn btn-success"
            type="button"
          >
            Checkout
          </button>
        </div>
      </form>
    </>
  );
};

export default Payment;
