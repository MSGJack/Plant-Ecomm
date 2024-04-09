const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();
//routes
const userRouter = require("./routes/users");
const cartRouter = require("./routes/cart");
const ordersRouter = require("./routes/orders");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const paymentROuter = require("./routes/payment");

/*const options = {
  credentials: true,
  origin: "http://localhost:8080",


  origin: "*", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/payment", paymentROuter);

//app.listen(PORT, () => {
//console.log(`Server is starting on port ${PORT}`);
//});

app.listen(process.env.PORT || 3001, () =>
  console.log(`Server Running on port ${PORT}...`)
);
