const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const mailSender = require("../Utils/MailSender");
const mailsender = require("../Utils/driverMail");

const otpSchema = new mongoose.Schema({
    user_email: {
        type: String,
    },
    driver_email:{
        type: String,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60*5,
    },
})

async function sendVerificationEmail(user_email,otp) {
    try{
        const mailResponse = await mailSender(
            user_email,
            "OTP for verification",
            `<p>Welcome to HopOn! We're excited to have you join our community of travelers and drivers, all dedicated to making your journey smooth and enjoyable.</p>,
            <h1>Please Confirm Your OTP </h1>
            <h1>Your OTP for verification is ${otp}</h1>
            <p>Thank you for choosing HopOn! We're looking forward to being a part of your journey.Best regards,
            The HopOn Team</p>`
        )
    }
    catch(err){
        console.log(err)
    }
}

async function sendVerification(driver_email,otp) {
    try{
        const mailResponse = await mailsender(
            driver_email,
            "OTP for verification",
            `<p>Welcome to HopOn! We're excited to have you join our community of travelers and drivers, all dedicated to making your journey smooth and enjoyable.</p>,
            <h1>Please Confirm Your OTP </h1>
            <h1>Your OTP for verification is ${otp}</h1>
            <p>Thank you for choosing HopOn! We're looking forward to being a part of your journey.Best regards,
            The HopOn Team</p>`
        )
    }
    catch(err){
        console.log(err)
    }
}

otpSchema.pre("save", async function(next) {
    if(this.isNew){
        await sendVerificationEmail(this.user_email,this.otp)
    }
    next();
})

otpSchema.pre("save", async function(next) {
    if(this.isNew){
        await sendVerification(this.driver_email,this.otp)
    }
    next();
})

const RandomModel = mongoose.model("Random",otpSchema);

module.exports = RandomModel;
