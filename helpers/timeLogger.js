const time = (req, res, next)=>{
    console.log(Date());
    next();
}
const pathLoger = ((req, res, next)=>{
    console.log(req.url);
    next()
})
module.exports = {time, pathLoger}