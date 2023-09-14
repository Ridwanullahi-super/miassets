const Fixed_assets = require("../../Models/fixedAssets")
const Renters = require("../../Models/renters")
const autoReminder = require("../../mail/autoReminder")
// const replyEmail = require("../mail/replyMessageEmail")
const schedule = require("node-schedule")
const notifyEmail = require("../../mail/notifyMessageToRenter")
const User = require("../../Models/user")
const notifyEmailToAdmin = require("../../mail/notifyMessageToAdmin")



const getRemind = (async(req, res)=>{
    let id = req?.session?.user?.id
    let  renters= await Renters.adminID(id)
    // let  Assets= await Fixed_assets.assetId(id)
    let user_id =req?.session?.user?.id
    let user = await User.findId(user_id)

    let RentOutstanding = await Renters.findOutRenter(user_id)
  let name = await User.getName(user_id)
    res.render("user/reminders",{renters,RentOutstanding,user})
})
const sendEmail = (req, res)=>{
    let {fullname, email, title, message} = req.body;
    notifyEmail(email,title,fullname,message)
    // console.log(fullname, email, title, message);
    res.redirect("back")    
}

const automaticReminder = async (req, res)=>{
    console.log(renters);
    let renters= await Renters.fetchTime()
    // let id = req?.session?.user?.id

    // for(let renter of  renters){
    //     renter.asset = await Fixed_assets.findId(renter.fixed_asset_id) 
    // }
    // let dueTime = new Date(renter.due_time).getTime()-(1000*60*60)
    // //  let rentDay = new Date(renter.rent_time)
    // console.log(renter);
    // let date = (new Date(Number(new Date(renter.due_time)))).getTime()
    // let newDate = date-86400000
    // let dayOFweek = new Date(newDate).getDay()
    // let month = new Date(newDate).getMonth() + 1;
    // let dayOfMonth = new Date(newDate).getDate()
    // let hour = new Date(newDate).getHours()
    // let minute = new Date(newDate).getMinutes()
    // let seconds = new Date(newDate).getSeconds()
    // let year = new Date(newDate).getFullYear()
    // //  let ExpectedDay = (rentDay.getTime()-dueTime.getTime())

    // const sendDate = new Date(year, month, dayOfMonth, 12, 0, 0);
    // console.log(sendDate);
    // const job = schedule.scheduleJob(sendDate, autoReminder(renter.email, renter.fullname, renter.asset, renter.due_time))   
 
}
const getComplaint = async(req, res)=>{
    let id = req?.session?.user?.id
    let  landlords= await User.userID(id)
    // let  Assets= await Fixed_assets.assetId(id)
    let name = await User.getName(id)
    let user_id =req?.session?.user?.id
    let RentOutstanding = await Renters.findOutRenter(user_id)
    let user = await User.findId(id)
    res.render("user/complaint",{landlords, name,RentOutstanding,user})
}

const sendComplaint = (req, res)=>{
    let {fullname, email, title, message} = req.body;
    notifyEmailToAdmin(email,title,fullname,message)
    req.flash("success", `Message sent successfully to ${fullname}`)
    res.redirect("back")
}


module.exports = {getRemind, sendEmail,automaticReminder,getComplaint,sendComplaint}