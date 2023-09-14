const bcrypt = require("bcrypt")
const Admin = require("../../Models/admin")
const SendResetPassword = require("../../mail/resetLink")
let has = "$2b$10$CPGHFFC4pSB2C6lprtxKhem9Wl0.4nu3ra2s7I55VBcDzwgXv2FfC"
let otherp = "00000"
let salt = 10

 const  login = (req, res)=>{
    res.render('admin/login')
 }
//  post access
 const getLogin =  async (req, res)=>{
   try {
      let {email, password} = req.body;
      let admin = await Admin.login(email, password)
      let pass = await bcrypt.compare(otherp,has)
      console.log(pass);
      if(admin){
         req.session.admin = admin;
         // console.log(req.path, req.url);
         req.flash("success","welcome " + admin.name())
         res.redirect(req?.session?.intent || '/admin/home');
      }else{
         req.flash("danger", "invalid Email or Password")
         res.redirect("back")
      }
   } catch (error) {
      console.log(error)
   }
 } 
//  end post login

 const creatAccount = async(req, res)=>{
   let id = req?.session?.admin?.id;
    let name = await Admin.getName(id)
    let admin = await Admin.findId(id)
    res.render('admin/create_account',{name,admin})
 } 
 const newadmin = async (req, res)=>{
    try {
        let admin = new Admin(req.body)
        await admin.save()
      //   console.log(admin);
      req.flash("success","you have sucessfully add one Admin")
        res.redirect("back")
      //   notifyAdmin(a)
    } catch (error) {
        console.log(error.status);
        req.flash("error","unable to add Admin")
        res.ridirect("back")
    }
 }
 // get forget password
 const getpassword = async(req, res)=>{
   res.render("admin/forget-password")
 }
  
 const SendresetPassword = async(req, res)=>{
   let admin = await Admin.findEmail(req.body.email)
   try {
   if (admin) {
     admin.token = Math.random().toString(36).slice(2)
     await admin.update()
     SendResetPassword(admin.email, admin.token, admin.name())
     req.flash("success","reset mail sent to your email")
     res.redirect("/admin")
    
    }
    req.flash("Failed","you have not registered before")
    res.redirect("/admin")
  

  } catch (error) {
    console.log(error)

  }
    
    
 }

 //end forget password
 const getConfirmPassword = async(req, res)=>{
  let token = req?.params?.token
//  return console.log(token);
   let admin = await Admin.findToken(token)
  res.render("admin/confirm-password", {admin})

 }
 const updateConfirmPassword = async(req, res)=>{
  let admin = await Admin.findToken(req?.params?.token)
  if(admin){
    admin.password = req.body.password;
    admin.token = null   
  await admin.update()
    req.flash("sucess", "you have successfully change your password")
    res.redirect("/admin")
  }
  else{ 
    req.flash("error", "you have not registered before")
    res.redirect("/admin")
  }
 }
 module.exports = {login, creatAccount, newadmin, getLogin,getpassword, SendresetPassword,getConfirmPassword,updateConfirmPassword }