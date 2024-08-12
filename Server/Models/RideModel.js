const mongoose = require("mongoose");
const UserRideModel = require("./UserRideModel");

const RideSchema = new mongoose.Schema(
    {
        user_id:{
            type:String,
            required:true
        },
        ride_details:{
            type:Array,
            ref:"UserRideModel",
            required:true
        }
    }
)

const RideModel = mongoose.model("RideService",RideSchema);
module.exports = RideModel