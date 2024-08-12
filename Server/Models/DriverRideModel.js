const mongoose = require("mongoose");
const DriverRideSchema = new mongoose.Schema (
    {
        user_id :{
            type : mongoose.Schema.Types.ObjectId,
            required : true
        },
        ride_id : {
            type : String,
            required : true
        },
        departure : {
            type : String,
            required : true
        },
        arrival : {
            type : String,
            required : true
        },
        date : {
            type : Date,
            default : Date.now
        },
        time:{
            type : String,
            required : true
        },
        status:{
            type : String,
            default : "open"
        },
        fare:{
            type : Number,
            required : true
        }
    }
)

const DriverRideModel = mongoose.model("DriverRide",DriverRideSchema);
module.exports = DriverRideModel;