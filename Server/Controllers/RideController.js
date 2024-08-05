const RideModel = require("../Models/User/RideModel");
const UserModel = require("../Models/User/UserModel");
const DriverModel = require("../Models/Driver/DriverModel");
const UserRideModel = require("../Models/User/UserRideModel");
// const {v4} = require("uuid")

const { v4: uuidv4 } = require('uuid'); 


const addservice = async (req, res) => {
  const user_id = req.user.id;
  console.log(user_id);
  const { driver_id, fare } = req.body;

  try {
    const userRides = await UserRideModel.find({ user_id });

    if (!userRides || userRides.length === 0) {
      return res.status(404).json({
        status: "failure",
        message: "User rides not found",
      });
    }
    const driver = await DriverModel.findOne(
      { _id: driver_id },
      'driver_name driver_phone driver_age'
    );

    if (!driver) {
      return res.status(404).json({
        status: "failure",
        message: "Driver not found",
      });
    }

    const rideIds = userRides.map(ride => ride.ride_id);
    const rideDetails = await RideModel.find({ ride_id: { $in: rideIds } });

    const newService = new RideModel({
      ride_id: uuidv4(),
      user_id,
      driver_id,
      fare,
      ride_details: { rideDetails, driver }
    });
    await newService.save();
    await UserRideModel.deleteOne({ user_id });
    res.status(200).json({
      status: "success",
      message: "Ride placed successfully",
      newService
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: "Cannot add service",
      error: err.message,
    });
  }
};


const getservice = async (req, res) => {
    const user_id = req.user.id;
  
    try {
      const userRides = await RideModel.find({ user_id });
  
      if (!userRides || userRides.length === 0) {
        return res.status(404).json({
          status: "failure",
          message: "No rides found for the user",
        });
      }
  
      const rideIds = userRides.map(ride => ride.ride_id);
  
      const rideDetails = await RideModel.find({ ride_id: { $in: rideIds } });
  
      if (rideDetails.length > 0) {
        res.status(200).json({
          status: "success",
          message: "Ride details fetched successfully",
          rideDetails
        });
      } else {
        res.status(404).json({
          status: "failure",
          message: "No ride details available",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: "failure",
        message: "Unable to fetch ride details",
        error: err.message,
      });
    }
  };
  

module.exports = {addservice,getservice}