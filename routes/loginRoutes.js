const {Router} = require('express')
const loginValidator = require("../validators/loginValidator")
const { login, getLogin, SendresetPassword, getpassword, getConfirmPassword, updateConfirmPassword } = require('../controller/admin/adminController');
const { Userlogin, userGetLogin, creatAccountUser, newUser, getUserpassword, SendUserresetPassword, getUserConfirmPassword, updateUserConfirmPassword} = require('../controller/user/userController');
const Admin = require('../Models/admin');

const log = Router()

// user login routes 
log.get("/user",Userlogin)
log.post("/user", userGetLogin)

log.get("/", async(req, res)=>{
 res.render("index.ejs")
})
// create account handleler
log.get('/create-account', creatAccountUser)
log.post('/create-account', newUser)
// forget password admin
log.get("/admin/forget-password", getpassword)
log.post("/admin/forget-password", SendresetPassword)
// reset password
log.get("/admin/reset-password/:token",getConfirmPassword)
log.post("/admin/reset-password/:token", updateConfirmPassword)
// forget password user
log.get("/user/forget-password", getUserpassword)
log.post("/user/forget-password", SendUserresetPassword)
// reset password
log.get("/user/reset-password/:token",getUserConfirmPassword)
log.post("/user/reset-password/:token", updateUserConfirmPassword)


// end of user


log.get("/admin",login)
log.post("/admin", getLogin)

module.exports = log;
