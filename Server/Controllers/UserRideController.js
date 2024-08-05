const UserRideModel = require('../Models/User/UserRideModel')
const UserModel = require('../Models/User/UserModel')
const {v4} = require('uuid')

const userRide = async(req,res) => {
    const user_id = req.user.id;
    const {departure,arrival} = req.body;
    try{
        const user = await UserModel.findById(user_id);
        if(!user){
            return res.status(401).json({
                status:"failure",
                message:"User not found"
            })
        }
        const newride = new UserRideModel({
            ride_id : v4(),
            user_id,
            ride_date:new Date(),
            departure,
            arrival
        })
        await newride.save()
        res.status(200).json({
            status:"success",
            message:"Ride created successfully",
            newride
        })
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"cant create ride",
            error : err.message
        })
    }
}

const getrides = async(req,res)=>{
    const user_id = req.user.id;
    try{
        const user = await UserModel.find({user_id});
        if(!user){
            return res.status(401).json({
                status:"failure",
                message:"User not found"
            })
        }
        const rides = await UserRideModel.find({user_id});
        res.status(200).json({
            status:"success",
            message:"Rides fetched successfully",
            rides
        })
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"cant fetch rides",
            error : err.message
        })
    }
}

const cancelride = async(req,res)=>{
    const user_id = req.user.id;
    const ride_id = req.body.ride_id;
    // console.log(user_id,ride_id);
    
    // const ride_id = req.params.ride_id;
    try{
        const user = await UserRideModel.find({user_id});
        // console.log(user);
        
        if(!user){
            return res.status(401).json({
                status:"failure",
                message:"User not found"
            })
        }
        // const ride = await UserRideModel.findById(ride_id);
        if(user){
            const ride = user.findIndex((r)=>r.ride_id === ride_id)
            if(ride){
                await UserRideModel.deleteOne({ride_id})
                res.status(200).json({
                    status:"success",
                    message:"Ride cancelled successfully"
                }) 
            }
        } 
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"cant cancel ride",
            error : err.message
        })
    }
}

module.exports = {userRide,getrides,cancelride}