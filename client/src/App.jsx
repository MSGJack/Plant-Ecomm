import React, { useEffect, useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
//Pages
import About from "./components/AboutPage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ProductCard from "./components/products/productCard";
import Dashboard from "./components/account/Dashboard";
import Products from "./components/products/products";
import Footer from "./components/Footer";
import Cart from "./components/cart/Cart";
import OrderHistory from "./components/order/OrderHistory";
import Orders from "./components/order/Orders";
import UpdateProfile from "./components/account/Update";
import Checkout from "./components/checkout/CheckOut";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import "./App.css";
//style
import { ToastContainer, toast } from "react-toastify";
import "./scss/styles.scss";
import Container from "react-bootstrap/Container";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_KEY);

console.log(import.meta.env.VITE_TEST);
console.log(import.meta.env.VITE_HI);
console.log(import.meta.env.VITE_HEY);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //checks if user is veridied
  async function verifyAuth() {
    try {
      const checkVerify = await fetch("http://localhost:3001/auth/verify", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      const isAuthentic = await checkVerify.json();
      return isAuthentic;
    } catch (err) {
      /*  toast.error("Failed To Authenticate You, try again later", {
        position: "top-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });*/
      console.log(err);
    }
  }

  useEffect(() => {
    //updates  autehenicated when it changes
    verifyAuth().then((authenticated) => setIsAuthenticated(authenticated));
  }, [isAuthenticated]);

  return (
    //routes
    <>
      <Elements stripe={stripePromise}>
        <ToastContainer limit={1} />
        <Dashboard
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
        />
        <Container>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/Success" element={<Success />} />
            <Route path="/Cancel" element={<Cancel />} />
            <Route
              path="/Products"
              element={<Products setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/Products/:id"
              element={
                <ProductCard
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route path="/Orders/:order_id" element={<Orders />} />
            <Route
              path="/Cart"
              element={isAuthenticated ? <Cart /> : <Login />}
            />
            <Route
              path="/Orders"
              element={isAuthenticated ? <Orders /> : <Login />}
            />
            <Route
              path="/viewOrders"
              element={isAuthenticated ? <OrderHistory /> : <Login />}
            />
            <Route
              path="/UpdateProfile"
              element={isAuthenticated ? <UpdateProfile /> : <Login />}
            />
            <Route
              path="/Login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/Register"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Register setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/Checkout"
              element={isAuthenticated ? <Checkout /> : <Login />}
            />
          </Routes>
        </Container>
        <Footer />
      </Elements>
    </>
  );
};

export default App;

