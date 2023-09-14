const Fixed_assets = require("../../Models/fixedAssets")
const Renters = require("../../Models/renters")
const autoReminder = require("../../mail/autoReminder")
// const replyEmail = require("../mail/replyMessageEmail")
const schedule = require("node-schedule")
const notifyEmail = require("../../mail/notifyMessageToRenter")
const Admin = require("../../Models/admin")
Fixed_assets


const getRemind = (async(req, res)=>{
    let id = req?.session?.admin?.id
    let  renters= await Renters.adminID(id)
    // let  Assets= await Fixed_assets.assetId(id)
    let name = await Admin.getName(id)
    let admin = await Admin.findId(id)
    res.render("admin/reminders",{renters,name,admin})
})
const sendEmail = (req, res)=>{
    let {fullname, email, title, message} = req.body;
    notifyEmail(email,title,fullname,message)
    req.flash("success", "Message sent successfully")
    res.redirect("back")
}

// const automaticReminder = async (req, res)=>{
//     let id = req?.session?.admin?.id
//     var renter= await Renters.adminID(id)
//     let dueTime = new Date(renter.due_time).getTime()-(1000*60*60)
//     //  let rentDay = new Date(renter.rent_time)
//     console.log(renter);
//     let date = (new Date(Number(new Date(renter.due_time)))).getTime()
//     let newDate = date-86400000
//     let dayOFweek = new Date(newDate).getDay()
//     let month = new Date(newDate).getMonth() + 1;
//     let dayOfMonth = new Date(newDate).getDate()
//     let hour = new Date(newDate).getHours()
//     let minute = new Date(newDate).getMinutes()
//     let seconds = new Date(newDate).getSeconds()
//     let year = new Date(newDate).getFullYear()
//     //  let ExpectedDay = (rentDay.getTime()-dueTime.getTime())

//     const sendDate = new Date(year, month, dayOfMonth, 12, 0, 0);
//     console.log(sendDate);
//     for(let renter of  renter){
//         renter.asset = await Fixed_assets.findId(renter.fixed_asset_id) 
// }
//     const job = schedule.scheduleJob(sendDate, autoReminder(renter.email, renter.fullname, renter.asset, renter.due_time))   
 
// }


module.exports = {getRemind, sendEmail}