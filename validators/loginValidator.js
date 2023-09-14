const { body } = require("express-validator")
const checkValidation = require("../middleware/checkValidationError")

const loginValidator =[
    body("email").notEmpty().isEmail().withMessage("please enter your Email Address"),
    body("password").notEmpty().withMessage("password is require!"),
    checkValidation
];
  

module.exports = loginValidator;