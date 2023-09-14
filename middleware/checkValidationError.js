const { validationResult } = require("express-validator");
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.formBody = req.body;
    req.session.formErrors = errors.mapped();
    req.flash("danger", " There are error in your form");
    console.log(req.session.formErrors);
    console.log(req.session.formBody);
    res.redirect("back");
  } else {
    next();
  }
};
module.exports = checkValidation;
