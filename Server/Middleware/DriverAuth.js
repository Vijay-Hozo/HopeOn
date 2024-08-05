const jwt = require("jsonwebtoken");

const DriverAuth = async(req,res,next)=>{
    const token = req.header("Authorization").split(" ")[1];
    if(!token){
        return res.status(400).json({
            status:"failure",
            message:"Token not found"
        })
    }
    try{
        const decoded = jwt.verify(token,"secretkey");
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"Token is invalid"
        })
    }
}

module.exports = DriverAuth;