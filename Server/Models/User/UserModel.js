const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema(
    {
        user_name : {
            type : String,
            required : true
        },
        user_email : {
            type:String,
            required:true
        },
        user_password:{
            type:String,
            required:true
        },
        user_phone:{
            type:Number,
            required:true
        },
        user_age : {
            type:Number,
            required:true
        },
        user_gender:{
            type:String,
            required : true
        },
        profile_photo : {
            type:String,
            required:true
        }
    }
)

UserSchema.pre('save',async function(next){
    if(!this.isModified("user_password")){
        return next;
    }
    else{
        const salt = await bcrypt.genSalt(10);
        this.user_password = await bcrypt.hash(this.user_password,salt);
        next();
    }
})

const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;