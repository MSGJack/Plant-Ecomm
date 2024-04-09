const router = require("express").Router();
const stripe = require("stripe")(process.env.SECRET_KEY);
const authorize = require("../middleware/authorize");

router.post("/create-checkout-session", authorize, async (req, res, next) => {
  //recieve payload
  const { products } = req.body;

  //maps out each product with name and image
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.image_url],
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));
  if (!lineItems) {
    res.status(500).json("Recieved no items.");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:8080/Success",
    cancel_url: "http://localhost:8080/Cancel",
  });

  res.json({ id: session.id });
});

module.exports = router;
