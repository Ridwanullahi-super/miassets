const authenticateUser = (req, res, next)=>{
    if(req.session.user){
       return next()
    }else{
        req.session.intent ="/user" + req.path
        req.flash("Info", "login is reqired")
        res.redirect('/')
        // console.log('error');        
        
    }
}
module.exports = authenticateUser;
