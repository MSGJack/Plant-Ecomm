const { check, validationResult } = require("express-validator");

const validateSignUp = [
  check("first_name")
    .not()
    //.withMessage("First Name cannot be empty.")
    .isEmpty()
    .isLength({ max: 100 }),
  check("last_name")
    .not()
    //.withMessage("Last Name cannot be empty.")
    .isEmpty()
    .isLength({ max: 100 }),
  check("email")
    .not()
    //.withMessage("Email must be a valid email..")
    .isEmpty()
    .isEmail()
    .isLength({ max: 100 }),
  check("password")
    .not()
    //.withMessage(
    //  "Password must contain at least one lower case, one upper case letter and a number."
    //)
    //.isLowercase()
    //.isUppercase()^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,255}$
    //.isNumeric()^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$
    .isEmpty()
    .isLength({ min: 8, max: 100 })
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,100}$/)
    .withMessage(
      "Password must contain at least one lower case, one upper case letter and a number."
    ),
  check("address").isLength({ max: 100 }),
  check("zipcode").isLength({ max: 10 }),
  check("city").isLength({ max: 100 }),
  //check("city").not().isEmpty().isLength({ max: 100 }),
  check("state").isLength({ max: 100 }),
  check("country").isLength({ max: 100 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validateLogin = [
  check("password").not().isEmpty().isLength({ min: 6, max: 100 }),
  check("email").not().isEmpty().isEmail().isLength({ max: 100 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validateGetProducts = [
  check("id").not().isEmpty().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validatePostProduct = [
  check("name").not().isEmpty().isLength({ max: 100 }),
  check("price").not().isEmpty(),
  check("description").not().isEmpty(),
  check("image_url").isLength({ max: 100 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validatePutProduct = [
  check("id").not().isEmpty().isInt(),
  check("quantity").not().isEmpty().isInt(),
  //check("name").not().isEmpty().isLength({ max: 100 }),
  //check("price").not().isEmpty(),
  //check("description").not().isEmpty(),
  //check("image_url").isLength({ max: 100 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validateDeleteProduct = [
  check("id").not().isEmpty().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validatePutUser = [
  check("first_name").not().isEmpty().isLength({ max: 100 }),
  check("last_name").not().isEmpty().isLength({ max: 100 }),
  check("email").not().isEmpty().isEmail().bail().isLength({ max: 100 }),
  check("password").not().isEmpty().isLength({ max: 100 }),
  check("address").not().isEmpty().isLength({ max: 100 }),
  check("zipcode").not().isEmpty().isLength({ max: 10 }),
  check("city").not().isEmpty().isLength({ max: 100 }),
  check("state").not().isEmpty().isLength({ max: 100 }),
  check("country").not().isEmpty().isLength({ max: 100 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validateCart = [
  check("product_id").not().isEmpty().isInt(),
  check("quantity").not().isEmpty().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validateDeleteCartProduct = [
  check("product_id").not().isEmpty().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validateOrder = [
  check("order_id").not().isEmpty().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

module.exports = {
  validateSignUp,
  validateLogin,
  validateGetProducts,
  validatePostProduct,
  validatePutProduct,
  validatePutUser,
  validateDeleteProduct,
  validateCart,
  validateDeleteCartProduct,
  validateOrder,
};
