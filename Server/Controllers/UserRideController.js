const UserRideModel = require('../Models/UserRideModel')
const UserModel = require('../Models/UserModel')
const {v4} = require('uuid')

const userRide = async(req,res) => {
    const user_id = req.user.id;
    const {departure,arrival,date,passengers} = req.body;
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
            departure,
            arrival,
            date,
            passengers
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

const cancelride = async (req, res) => {
    const user_id = req.user.id;
    const ride_id = req.params.id;
    
  
    try {
      const user = await UserModel.findOne({ _id: user_id });
      
      if (!user) {
        return res.status(404).json({
          status: "failure",
          message: "User not found"
        });
      }
  
      const ride = await UserRideModel.findOneAndDelete({ ride_id, user_id });
  
      if (!ride) {
        return res.status(404).json({
          status: "failure",
          message: "Ride not found or does not belong to the user"
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "Ride deleted successfully",
        ride
      });
    } catch (err) {
      res.status(400).json({
        status: "failure",
        message: "Cannot delete ride",
        error: err.message
      });
    }
  };

module.exports = {userRide,getrides,cancelride}