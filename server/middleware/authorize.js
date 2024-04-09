const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    //gets token from header
    const jwtToken = req.header("token");
    //console.log(jwtToken);
    //if token doesnt exist return false
    if (jwtToken === null) {
      return res.status(403).json(false);
    }
    //verifies token
    const payload = jwt.verify(jwtToken, process.env.TOKEN_SECRET);
    req.user = payload.user;
    //console.log(payload);
    next();
  } catch (err) {
    return res.status(403).json(false);
  }
};
