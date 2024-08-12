const mongoose = require("mongoose");

const UserRideSchema = new mongoose.Schema ({
    user_id : {
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
    passengers : {
        type : Number,
        required : true
    },
})

const UserRideModel = mongoose.model("UserRide",UserRideSchema);
module.exports = UserRideModel;