const authenticateAdmin = (req, res, next)=>{
    if(req.session.admin){
      return next()
    }else{
        req.session.intent = '/admin/' + req.path
        req.flash('Info',"Login is required to visit this route")
        // req.session.intent = req.url   
        
    }
}
module.exports = authenticateAdmin;
