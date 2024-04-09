const pool = require("../db/databasejs");
const router = require("express").Router();
const {
  validateGetProducts,
  validatePostProduct,
  validatePutProduct,
  validateDeleteProduct,
} = require("../middleware/validation");

//get all products
router.get("/", async (req, res, next) => {
  try {
    const getProducts = await pool.query("SELECT * FROM products ORDER BY id");
    //res.status(200).json(getProducts.rows);
    return res.status(200).json(getProducts.rows);
  } catch (error) {
    return next(error);
  }
});

//get specific product
router.get("/:id", validateGetProducts, async (req, res, next) => {
  try {
    const { id } = req.params;
    const productItem = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    if (productItem.rows.length === 0) {
      return next(new Error("No such product exist right now."));
    } else {
      res.status(200).json(productItem.rows[0]);
    }
  } catch (error) {
    return next(error);
  }
});

//create new product
router.post("/", validatePostProduct, async (req, res, next) => {
  try {
    const { name, price, description, image_url } = req.body;
    const create = await pool.query(
      "INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4)",
      [name, price, description, image_url]
    );
    res.status(200).json("New product has been created!");
  } catch (error) {
    return next(error);
  }
});

//update product
router.put("/:id", validatePutProduct, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, image_url } = req.body;
    const update = await pool.query(
      "UPDATE products SET name = $1, price = $2, description = $3, image_url = $4 WHERE id = $5 RETURNING *",
      [name, price, description, image_url, id]
    );
    if (update.rows.length === 0) {
      return next(new Error("No product to update."));
    } else {
      res.status(200).json(`Product ${id} has been updated.`);
    }
  } catch (error) {
    return next(error);
  }
});

//delete product
router.delete("/:id", validateDeleteProduct, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletion = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING id",
      [id]
    );
    if (deletion.rows.length === 0) {
      return next(new Error("No product to delete."));
    } else {
      res.status(200).json(`Product ${id} has been deleted.`);
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
