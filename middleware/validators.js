const { body } = require("express-validator")

exports.signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
]

exports.loginValidator = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
]

exports.updateProfileValidator = [
  body("email").optional().isEmail().withMessage("Please provide a valid email"),
  body("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
]

