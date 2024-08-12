const DriverRideModel = require( "../Models/DriverRideModel");
const UserModel = require( "../Models/UserModel");
const {v4} = require('uuid')

const driverride = async(req,res)=>{
    try{
    const {departure,via,arrival,date,time,fare} = req.body;
    const user_id = req.user.id;
    const newride = await new DriverRideModel({
        ride_id : v4(),
        user_id,
        departure,
        via,
        arrival,
        date,
        time,
        fare
    })
    await newride.save();
    res.status(200).json(
        {
            status:"success",
            message:"Ride created successfully",
            newride
        }
    )}
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
    console.log(user_id);
    
    try{
        const user = await UserModel.find({user_id});
        if(!user){
            return res.status(401).json({
                status:"failure",
                message:"User not found"
            })
        }
        const rides = await DriverRideModel.find({user_id});
        console.log(rides);
        
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

const deleteride = async (req, res) => {
    const user_id = req.user.id;
    const ride_id = req.params.id;
    console.log(user_id,ride_id);
    
  
    try {
      const user = await UserModel.findOne({ _id: user_id });
      
      if (!user) {
        return res.status(404).json({
          status: "failure",
          message: "User not found"
        });
      }
  
      const ride = await DriverRideModel.findOneAndDelete({ ride_id, user_id });
  
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
  

module.exports = {driverride,getrides,deleteride}