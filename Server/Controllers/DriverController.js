const DriverModel = require("../Models/DriverModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {v4} = require('uuid')

const newdriver = async(req,res) => {
    const {driver_name, driver_email,driver_password,driver_phone, driver_age, government_id, vehicle_number,profile_photo} = req.body;
    try{
        const newdriver = new DriverModel({
            // driver_id : v4(),
            driver_name,
            driver_email,
            driver_password,
            driver_phone,
            driver_age,
            government_id,
            vehicle_number,
            profile_photo
        }
        )
        if(driver_password.length<6 || driver_age < 18 ){
            res.status(400).json({
                status:"failure",
                message:"Password must be higher than 6 characters and age must be higher than 18"
            })
        }
        else{
            await newdriver.save()
            res.status(200).json({
                status:"success",
                message:"Driver created successfully",
                newdriver
            })
        }
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

module.exports = {newdriver,logindriver,getdriverbyid}