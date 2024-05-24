const jwt = require("jsonwebtoken")
module.exports =  function(req,res,next){
    try{
    let token= req.header('x-token')
    if(!token){
        return res.status(401).send("Please Login")
    }
    let decoded=jwt.verify(token, process.env.JWT_SECRET)
    req.user=decoded.user
    next()
    }
    catch(err){
        console.log(err);
        return res.status(401).send('Authentication Error');
    }
}