const express = require("express")
const ejs = require('ejs');
const server = express()
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const flash = require('simple-flash');
const { time, pathLoger } = require("./helpers/timeLogger");
const path = require('path');
const loginRoutes = require("./routes/loginRoutes")
const fileUpload = require("express-fileupload")
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/usersRoutes");
const Renters = require("./Models/renters");
const Fixed_assets = require("./Models/fixedAssets");
const autoReminder = require("./mail/autoReminder");
const authenticateUser = require("./middleware/authenticate");
const authenticateAdmin = require("./middleware/authenticateAdmin");
// const schedule = require("node-schedule");
const notifyEmail = require("./mail/notifyMessageToRenter");
const cron = require("node-cron");
const bodyParser = require('body-parser');
// const obj = require("../specs/server.specs.js")

const port = process.env.PORT || 4200 ;
// look up folders and path
server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname,'uploads')));
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.urlencoded({extended: true }));
// server.use(express.json()) //commented!

//extended javascript link
server.set("view engine", "ejs");
server.set("views", "pages");


// session handler here is the session
server.use(session({
  cookie: { maxAge: 604800000 },
  store: new MemoryStore({
    checkPeriod: 604800000 // prune expired entries every 7days
  }),
  resave: false,
  secret: 'keyboard cat'
}))
// flash engine
server.use(flash({ locals: "flash" }));
// validator engine
server.use(function (req, res, next) {
  res.locals.formBody = req.session.formBody;
  res.locals.formErrors = req.session.formErrors;
  delete req.session.formBody;
  delete req.session.formErrors;
  next();
});

// file-upload
server.use(fileUpload())

// routes
server.use(loginRoutes)
server.use("/user", authenticateUser, userRoutes)
server.use ("/admin", authenticateAdmin, adminRoutes)

// automatic mail send




// helpers
// let logger = [time, pathLoger]

// server.use(logger)
// middleware handle

// running handle
server.listen(port, (err)=>{
  try {
  console.log(`server is running on port http://localhost:${port}`);
    
  } catch (err) {
    console.log(err.message)
  }
});
(async()=>{
  var renters= await Renters.fetchRenterAssetID()
  const due_dates= renters.map(q=>q.due_time)
    const first_names= renters.map(q=>q.first_name)  
    const surnames= renters.map(q=>q.surname)  
    const emails= renters.map(q=>q.email)  
    const asset_names= renters.map(q=>q.fs_name)  
    
    for (let i = 0; i < due_dates.length; i++) {
      const due_date = due_dates[i];
      const fullname = surnames[i] + " " + first_names[i];
      const email = emails[i];
      const asset_name = asset_names[i];
      // console.log(due_date,fullname,email, asset_name);
      
    var scheduleDate = new Date(due_date)
      scheduleDate.setDate(scheduleDate.getDate()-1)
      // console.log(due_date, scheduleDate.getMinutes());

      cron.schedule(`${scheduleDate.getMinutes()} ${scheduleDate.getHours()} ${scheduleDate.getDate()} ${scheduleDate.getMonth()+1} ${scheduleDate.getDay()}`,()=>{m 
       autoReminder(email, fullname, asset_name,due_date)
      })
    }
    
})()
