const bcrypt = require("bcrypt")
const User = require("../../Models/user")
const Admin = require("../../Models/admin")
const SendResetPass = require("../../mail/sendreset")
// let has = "$2b$10$CPGHFFC4pSB2C6lprtxKhem9Wl0.4nu3ra2s7I55VBcDzwgXv2FfC"
// let otherp = "00000"

 const  Userlogin = (req, res)=>{
    res.render('user/login')
 }
//  post access
 const userGetLogin =  async (req, res)=>{
   try {
      let {email, password} = req.body;
      let user = await User.login(email, password)
      // let pass = await bcrypt.compare(otherp,has)
      // console.log(pass);
      if(user){
         req.session.user = user; // it is here that we create the session for the user
         console.log(req.path);
         req.flash("success","welcome " + user.name())
         res.redirect(req?.session?.intent || '/user/home');
      }else{
         req.flash("danger", "invalid Email or Password")
         res.redirect("back")
      }
   } catch (error) {
      console.log(error)
   }
 } 
//  end post login

 const creatAccountUser = (req, res)=>{
   
    res.render('user/create_account')
 } 
 const newUser = async (req, res)=>{
    try {
        let user = new User(req.body)
        await user.save()
        console.log(user);
        res.redirect("/user")
    } catch (error) {
        console.log(error);
      //   res.render("error")
    }
 }

  const getUserpassword = async(req, res)=>{
   res.render("user/forget-password")
 }
  
 const SendUserresetPassword = async(req, res)=>{
   let user = await User.findEmail(req.body.email)
   try {
   if (user) {
     user.token = Math.random().toString(36).slice(2)
     await user.update()
     SendResetPass(user.email, user.token, user.name())
     req.flash("success","reset mail sent to you email")
     res.redirect("/user")
    
    }
    req.flash("Failed","you have not registered before")
    res.redirect("/user")
  

  } catch (error) {
    console.log(error)

  }
    
    
 }

 //end forget password
 const getUserConfirmPassword = async(req, res)=>{
  let token = req?.params?.token
//  return console.log(token);
   let user = await User.findToken(token)
  res.render("user/confirm-password", {user})

 }
 const updateUserConfirmPassword = async(req, res)=>{
  let user = await User.findToken(req?.params?.token)
  if(user){
    user.password = req.body.password;
    user.token = null   
  await user.update()
    req.flash("sucess", "you have successfully change your password")
    res.redirect("/user")
  }
  else{ 
    req.flash("error", "you have not registered before")
    res.redirect("/user")
  }
 }

 module.exports = {userGetLogin, creatAccountUser, newUser, Userlogin, getUserpassword, SendUserresetPassword, getUserConfirmPassword, updateUserConfirmPassword }