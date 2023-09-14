const { body } = require("express-validator")
const checkValidation = require("../middleware/checkValidationError");

const assetValidator = [
    body("name").trim().isAlpha().escape().notEmpty().withMessage("asset name is require"),
    body("seria_number").trim().isAlphanumeric().withMessage("seria number is require"),
    body("company_name").trim().isAlpha().escape().withMessage("company name is require"),
    body("buyers_name").trim().isAlpha().escape().withMessage("buyer's name is require"),
    body("amount").trim().isNumeric().withMessage("amount of the assset required"),
    body("current_amount").trim().isNumeric().withMessage("immediate worth of the asset require"),
    checkValidation
]
module.exports = assetValidator;