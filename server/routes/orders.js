const pool = require("../db/databasejs");
const authorize = require("../middleware/authorize");
const router = require("express").Router();
const { validateOrder } = require("../middleware/validation");

//get orders
router.get("/", async (req, res, next) => {
  try {
    //brings back orders by most recent orders and nulls are at bottom
    const getOrders = await pool.query(
      "SELECT * FROM orders ORDER BY date_created DESC NULLS LAST"
    );
    return res.status(200).json(getOrders.rows);
  } catch (error) {
    return next(error);
  }
});

//get users order history
router.get("/user/orders", authorize, async (req, res, next) => {
  try {
    const userOrderHistory = await pool.query(
      `SELECT orders.id AS order_id, products.id AS product_id, products.name, products.price, quantity, orders.date_created, order_price FROM orders 
    INNER JOIN order_products ON orders.id = order_products.order_id
    INNER JOIN products ON order_products.product_id = products.id 
    WHERE user_id = $1
    ORDER By orders.id DESC`,
      [req.user]
    );
    console.log(userOrderHistory);
    return res.status(200).json(userOrderHistory.rows);
  } catch (error) {
    return next(error);
  }
});

// get a users order by order id
router.get(
  "/details/:order_id",
  validateOrder,
  authorize,
  async (req, res, next) => {
    try {
      const { order_id } = req.params;
      console.log(order_id);
      const userOrder = await pool.query(
        `SELECT * FROM orders
      INNER JOIN order_products ON orders.id = order_products.order_id
      INNER JOIN products ON order_products.product_id = products.id
      WHERE orders.id = $1 AND user_id = $2`,
        [order_id, req.user]
      );
      console.log(userOrder);
      if (userOrder.rows.length === 0) {
        return next(new Error("No such order exist."));
      } else {
        return res.status(200).json(userOrder.rows);
      }
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
