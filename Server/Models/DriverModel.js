const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const DriverSchema = new mongoose.Schema(
    {
        driver_name : {
            type : String,
            required : true
        },
        driver_email : {
            type:String,
            required:true
        },
        driver_password:{
            type:String,
            required:true
        },
        driver_phone:{
            type:Number,
            required:true
        },
        driver_age : {
            type:Number,
            required:true
        },
        government_id:{
            type:String,
        },
        vehicle_number:{
            type:String,
            required:true
        },
        profile_photo : {
            type:String,
            required:true
        },
        otp : {
            type:String,
            required:true 
        }
    }
)

DriverSchema.pre('save',async function(next){
    if(!this.isModified("driver_password")){
        return next;
    }
    else{
        const salt = await bcrypt.genSalt(10);
        this.driver_password = await bcrypt.hash(this.driver_password,salt);
        next();
    }
})

const DriverModel = mongoose.model("Driver",DriverSchema);
module.exports = DriverModel;