const pool = require("../db/databasejs");
const router = require("express").Router();
const {
  validateCart,
  validateDeleteCartProduct,
  validatePutProduct,
} = require("../middleware/validation");
const authorize = require("../middleware/authorize");

//get all cart;
router.get("/", async (req, res, next) => {
  try {
    //order by cart id if products exist in cart
    const getAllCarts = await pool.query(
      "SELECT * FROM carts INNER JOIN cart_products ON carts.id = cart_products.cart_id INNER JOIN products ON cart_products.product_id = products.id ORDER BY carts.id"
    );
    return res.status(200).json(getAllCarts.rows);
  } catch (error) {
    return next(error);
  }
});

//get cart total           validateCart
router.get("/cartTotal", authorize, async (req, res, next) => {
  try {
    const getCartFromDB = await pool.query(
      `SELECT products.id, name, price, description, image_url, quantity FROM carts
    INNER JOIN cart_products ON carts.id = cart_products.cart_id
    INNER JOIN products ON cart_products.product_id = products.id
    WHERE user_id = $1`,
      [req.user]
    );
    //if (getCartFromDB.rows.length === 0) {
    //return res.status(500).send("Your cart is currently empty.");
    //} else {
    const totalPrice = await getCartFromDB.rows
      .reduce((acc, item) => {
        return acc + parseFloat(item.price) * item.quantity;
      }, 0)
      .toFixed(2);
    return res.status(200).json(totalPrice);
    //}
  } catch (error) {
    return next(error);
  }
});

//get user cart by user id         validateCart
router.get("/user/cart", authorize, async (req, res, next) => {
  try {
    const getUserCart = await pool.query(
      `SELECT products.id, name, price, description, image_url, quantity FROM carts
      INNER JOIN cart_products ON carts.id = cart_products.cart_id
      INNER JOIN products ON cart_products.product_id = products.id
      WHERE user_id = $1`,
      [req.user]
    );

    console.log(getUserCart);
    return res.status(200).json(getUserCart.rows);
  } catch (error) {
    return next(error);
  }
});

//get user id
router.get("/user/userId", authorize, async (req, res, next) => {
  try {
    const getUserCart = await pool.query(
      `SELECT * FROM carts
      WHERE user_id = $1`,
      [req.user]
    );
    return res.status(200).json(getUserCart.rows[0].user_id);
  } catch (error) {
    return next(error);
  }
});

//get user's cart id    validateCart
router.get("/user/cartID", authorize, async (req, res, next) => {
  try {
    const getUserCart = await pool.query(
      `SELECT id FROM carts
      WHERE user_id = $1`,
      [req.user]
    );
    return res.status(200).json(getUserCart.rows[0].id);
  } catch (error) {
    return next(error);
  }
});

//add product to cart     validateCart
router.post("/user/:cart_id", validateCart, async (req, res, next) => {
  try {
    const { cart_id } = req.params;
    const { product_id, quantity } = req.body;
    const checkCart = await pool.query(
      "SELECT * FROM cart_products WHERE product_id = $1 AND cart_id = $2",
      [product_id, cart_id]
    );
    if (checkCart.rows.length !== 0) {
      return res.status(404).json("Product is already in your cart.");
    }
    const addToCart = await pool.query(
      "INSERT INTO cart_products (product_id, quantity, cart_id) VALUES ($1, $2, $3) RETURNING *",
      [product_id, quantity, cart_id]
    );
    if (!addToCart.rows.length) {
      next(new Error("Cart or item does not exist."));
    } else {
      return res.status(200).json("Item had been added to your cart.");
    }
  } catch (error) {
    return next(error);
  }
});

//update an item in cart
router.put("/user/:cart_id", validateCart, async (req, res, next) => {
  try {
    const { cart_id } = req.params;
    const { product_id, quantity } = req.body;
    const modifyCart = await pool.query(
      "UPDATE cart_products SET quantity = $3 WHERE cart_id = $1 AND product_id = $2 RETURNING *",
      [cart_id, product_id, quantity]
    );
    if (!modifyCart.rows.length) {
      return next(new Error("No cart to update"));
    } else {
      return res.status(200).json("Update has been completed.");
    }
  } catch (error) {
    return next(error);
  }
});

//delete item from cart  validateDeleteCartProduct
router.delete(
  "/user/:cart_id/:product_id",
  validateDeleteCartProduct,
  async (req, res, next) => {
    try {
      const { product_id, cart_id } = req.params;
      const checkCart = await pool.query(
        "SELECT * FROM cart_products WHERE product_id = $1 AND cart_id = $2",
        [product_id, cart_id]
      );
      if (checkCart.rows.length === 0) {
        return res.status(404).json("No Product to delete.");
      }
      const deleteProduct = await pool.query(
        "DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2 RETURNING *",
        [cart_id, product_id]
      );
      if (deleteProduct.rows.length === 0) {
        return next(new Error("No item to delete"));
      } else {
        return res.status(200).json("Product has been removed.");
      }
    } catch (error) {
      return next(error);
    }
  }
);

//delete cart, must be empty
router.delete("/:user_id/cart", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const findCart = await pool.query(
      "SELECT * FROM carts WHERE user_id = $1",
      [user_id]
    );
    if (findCart.rows.length === 0) {
      return next(new Error("User does not have an active cart."));
    } else {
      const deleteCart = await pool.query(
        "DELETE FROM carts WHERE user_id = $1",
        [user_id]
      );
      return res.status(200).json("Cart has been deleted");
    }
  } catch (error) {
    return next(error);
  }
});

//moves cart items into order   authorize
router.get("/checkoutCart", authorize, async (req, res, next) => {
  try {
    const cart = await pool.query(
      `SELECT products.id, name, price, description, image_url, quantity FROM carts
    INNER JOIN cart_products ON carts.id = cart_products.cart_id
    INNER JOIN products ON cart_products.product_id = products.id
    WHERE user_id = $1`,
      [req.user]
    );
    //gets total amount for cart
    const getPrice = cart.rows
      .reduce((acc, item) => {
        return acc + parseFloat(item.price) * item.quantity;
      }, 0)
      .toFixed(2);
    //creates order id
    const createOrderId = await pool.query(
      "INSERT INTO orders (user_id, order_price, date_created) VALUES($1, $2, now ()) RETURNING *",
      [req.user, getPrice]
    );
    const orderID = createOrderId.rows[0].id;
    const getUserCart = await pool.query(
      `SELECT * FROM carts
      WHERE user_id = $1`,
      [req.user]
    );
    const cartID = getUserCart.rows[0].id;
    //inserts cart items into order_products
    await Promise.all(
      cart.rows.map(async (product) => {
        await pool.query(
          "INSERT INTO order_products (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
          [orderID, product.id, product.quantity, product.price]
        );
        //deletes products from cart_products which leaves cart empty
        await pool.query("DELETE FROM cart_products WHERE cart_id = $1", [
          cartID,
        ]);
      })
    );
    res.status(201).json({
      message: "Your order has been successfully been placed..",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
