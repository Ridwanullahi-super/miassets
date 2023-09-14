const { body } = require("express-validator")
const checkValidation = require("../middleware/checkValidationError")

const renterValidator = [   
    body('surname').trim().isAlpha().notEmpty().escape().withMessage("surname must be here"),
    body('first_name').trim().isAlpha().notEmpty().escape().withMessage("first name is required"),
    body('other_name').trim().isAlpha().isEmpty().escape().withMessage("your name should be in alphabetes"),
    body("phone_number").trim().isMobilePhone(['en-NG']).notEmpty().withMessage("mobile phone number is required"),
    body("email").trim().isEmail().normalizeEmail().escape().withMessage("Email is required.. example@e.com"),
    body("address").trim().isAlphanumeric().isEmpty().escape().withMessage("renter address is expected"),
    body("rent_time").isBefore().isDate().withMessage("date must be before"),
    body("due_time").isAfter().isDate().withMessage("date must be after"),
    checkValidation
]; 

module.exports = renterValidator;