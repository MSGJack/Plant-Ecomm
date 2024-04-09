const pool = require("../db/databasejs");
const router = require("express").Router();
const { validatePutUser } = require("../middleware/validation");
const authorize = require("../middleware/authorize");

//get users
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users ORDER BY id");
    return res.status(200).json(allUsers.rows);
  } catch (error) {
    return next(error);
  }
});

//get user info
router.get("/self", authorize, async (req, res, next) => {
  try {
    const getUser = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.user,
    ]);
    //if (getUser.rows.length === 0) {
    // return next(new Error("User does not exist in the database."));
    //}
    return res.status(200).json(getUser.rows);
  } catch (error) {
    return next(error);
  }
});

//only get a user address
router.get("/userAddress", authorize, async (req, res, next) => {
  try {
    const getAddress = await pool.query(
      `SELECT address, city, state, country, zipcode FROM users WHERE id = $1`,
      [req.user]
    );
    return res.status(200).json(getAddress.rows);
  } catch (error) {
    return next(error);
  }
});

//update address
router.put("/updateAddress", authorize, async (req, res, next) => {
  try {
    const { address, city, zipcode, state, country } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET address = $1, city = $2, zipcode = $3, state = $4, country = $5 WHERE id = $6 RETURNING *",
      [address, city, zipcode, state, country, req.user]
    );
    //if (updateUser.rows.length === 0) {
    //return next(new Error("No user to update."));
    //}
    return res.status(200).json("Address has been updated.");
  } catch (error) {
    return next(error);
  }
});

// get user by email
//not used
router.get("/getEmail", authorize, async (req, res, next) => {
  try {
    const getUserEmail = await pool.query(
      "SELECT email FROM users WHERE id = $1",
      [req.user]
    );
    return res.status(200).json(getUserEmail.rows);
  } catch (error) {
    return next(error);
  }
});

//update user  validatePutUser
router.put("/self", authorize, async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      address,
      city,
      zipcode,
      state,
      country,
    } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, address = $5, city = $6, zipcode = $7, state = $8, country = $9 WHERE id = $10 RETURNING *",
      [
        first_name,
        last_name,
        email,
        password,
        address,
        city,
        zipcode,
        state,
        country,
        req.user,
      ]
    );
    //if (updateUser.rows.length === 0) {
    //return next(new Error("No user to update."));
    //}
    return res.status(200).json("User has been updated.");
  } catch (error) {
    return next(error);
  }
});

//delete user
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    if (deleteUser.rows.length === 0) {
      return next(new Error("No user to delete"));
    } else {
      return res.status(200).json(`User${id} has been deleted.`);
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
