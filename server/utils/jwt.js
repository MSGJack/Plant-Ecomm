const jwt = require("jsonwebtoken");
require("dotenv").config();

//pass in users id
function jwtGenerator(id) {
  //payload will hold the users id, stored in user property
  const payload = {
    user: id,
  };
  //sends back payload with jwtsecret
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
}

module.exports = jwtGenerator;
