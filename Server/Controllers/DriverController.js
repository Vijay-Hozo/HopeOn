const DriverModel = require("../Models/DriverModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const RandomModel = require("../Models/RandomModel");

const newdriver = async(req,res) => {
    const {driver_name, driver_email,driver_password,driver_phone, driver_age, government_id, vehicle_number,otp} = req.body;
    try{
        
        const response = await RandomModel.find().sort({createdAt:-1}).limit(1);
        if(!otp){
            return res.status(400).json({
                status:"failure",
                message:"Please enter the OTP"
            })
        }

        if(response.length === 0){
            return res.status(400).json({
                status:"failure",
                message:"The OTP is not valid"
            })
        }
        else if(otp !== response[0].otp){
            return res.status(400).json({
                status:"failure",
                message:"The OTP is not valid"
            })
        }
        if(driver_password.length<6 || driver_age < 18 ){
            res.status(400).json({
                status:"failure",
                message:"Password must be higher than 6 characters and age must be higher than 18"
            })
        }
       const newdriver = await DriverModel.create({
              driver_name,
              driver_email,
              driver_password,
              driver_phone,
              driver_age,
              government_id,
              vehicle_number,
            //   profile_photo,
              otp
       })
         res.status(200).json({
              status:"success",
              message:"Driver created successfully",
              newdriver
         })
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"cant create driver",
            error : err.message
        })
    }
}

const logindriver = async(req,res)=>{
    const{driver_email, driver_password} = req.body;
    try{
        const driver = await DriverModel.findOne({driver_email})
        
        if(!driver){
            return res.status(401).json({
                status:"failure",
                message:"driver not found"
            })
        }
        const isValidPassword = await bcrypt.compare(driver_password,driver.driver_password);
        if(!isValidPassword){
            return res.status(400).json({
                status:"failure",
                message:"Password is invalid"
            })
        }
        const drivertoken = jwt.sign({id:driver._id},"secretkey",{
            expiresIn:"8h"
        })
        res.status(200).json({
            status:"success",
            message:"Driver logged in successfully",
            driver,
            drivertoken
        })
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"cant login driver",
            error : err.message
        })
    }
}

const getdriverbyid = async(req,res)=>{
    const driver_id = req.user.id;
    try{
        const user = await DriverModel.findById(driver_id)
        if(!user){
            return res.status(401).json({
                status:"failure",
                message:"User not found"
            })
        }
        res.status(200).json({
            status:"success",
            message:"User fetched successfully",
            user
        })
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"cant fetch user",
            error:err.message
        })
    }
}

const changeDriverPassword = async(req,res)=>{
    const {driver_email,otp,driver_password} = req.body;
    try{
        const driver = await DriverModel.findOne({driver_email})
        if(!driver){
            return res.status(401).json({
                status:"failure",
                message:"Driver not found"
            })
        }
        const response = await RandomModel.find().sort({createdAt:-1}).limit(1);
        if(!otp){
            return res.status(400).json({
                status:"failure",
                message:"Please enter the OTP"
            })
        }
        if(response.length === 0){
            return res.status(400).json({
                status:"failure",
                message:"The OTP is not valid"
            })
        }
        else if(otp !== response[0].otp){
            return res.status(400).json({
                status:"failure",
                message:"The OTP is not valid"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(driver_password,salt);
        await DriverModel.findOneAndUpdate({driver_email},{driver_password:hashedPassword})
        await RandomModel.deleteMany({driver_email})
        res.status(200).json({
            status:"success",
            message:"Password changed successfully"
        })
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"cant change password",
            error:err.message
        })
    }
}

module.exports = {newdriver,logindriver,getdriverbyid,changeDriverPassword}