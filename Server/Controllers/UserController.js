const UserModel = require("../Models/User/UserModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const newuser = async(req,res) => {
    const {user_name, user_email,user_password,user_phone, user_age, user_gender,profile_photo} = req.body;
    try{
        const newuser = new UserModel({
            user_name,
            user_email,
            user_password,
            user_phone,
            user_age,
            user_gender,
            profile_photo
        }
        )
        if(user_password.length<6 ){
            res.status(400).json({
                status:"failure",
                message:"Password must be higher than 6 characters"
            })
        }
        else{
            await newuser.save()
            res.status(200).json({
                status:"success",
                message:"User created successfully",
                newuser
            })
        }
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"cant create user",
            error : err.message
        })
    }
}

const loginuser = async(req,res)=>{
    const{user_email, user_password} = req.body;
    try{
        const user = await UserModel.findOne({user_email})
        
        if(!user){
            return res.status(401).json({
                status:"failure",
                message:"user not found"
            })
        }
        const isValidPassword = await bcrypt.compare(user_password,user.user_password);
        if(!isValidPassword){
            return res.status(400).json({
                status:"failure",
                message:"Password is invalid"
            })
        }
        const token = jwt.sign({id:user._id},"secret_key",{
            expiresIn : "8h"
        })
        res.status(200).json({
            status:"success",
            message:"user Loggined successfully",
            user,
            token
        })
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"failed to login",
            error:err.message
        })
    }
}

module.exports = {newuser,loginuser}