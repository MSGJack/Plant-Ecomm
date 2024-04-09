const router = require("express").Router();
const pool = require("../db/databasejs");
const bcrypt = require("bcrypt");
//generate json web token
const jwtGenerator = require("../utils/jwt");
const { validateSignUp, validateLogin } = require("../middleware/validation");
//checks json web token to verify user
const authorize = require("../middleware/authorize");

router.post("/register", validateSignUp, async (req, res) => {
  // destructure  body
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      address,
      city,
      state,
      country,
      zipcode,
    } = req.body;
    //checks if email is already being used
    const checkEmail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (checkEmail.rows.length !== 0) {
      res.status(404).json("That email is already being used.");
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //create user into db
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, address, city, state, country, zipcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        first_name,
        last_name,
        email,
        bcryptPassword,
        address,
        city,
        state,
        country,
        zipcode,
      ]
    );
    const getId = newUser.rows[0].id;
    //creates users cart
    const makeCart = await pool.query(
      "INSERT INTO carts (user_id) VALUES ($1)",
      [getId]
    );
    const token = jwtGenerator(newUser.rows[0].id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json("An error occured while registrating you.");
  }
});

router.post("/login", validateLogin, async (req, res) => {
  //
  try {
    const { email, password } = req.body;
    const loginUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!loginUser.rows.length) {
      return res.status(401).json("Email or Password is incorrect");
    }
    //checks if password matches with password saved in db
    const checkPassword = await bcrypt.compare(
      password,
      loginUser.rows[0].password
    );
    if (!checkPassword) {
      return res.status(401).json("Email or Password is incorrect");
    }
    //passes in users id to generate a json web token that expires in 24 hours
    const token = jwtGenerator(loginUser.rows[0].id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json("There was an error while logging you in.");
  }
});

//checks if user is verified
router.get("/verify", authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(false);
  }
});

module.exports = router;
