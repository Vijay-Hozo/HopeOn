const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const mailSender = require("../Utils/MailSender");

const ResetSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true,
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
          
      "Hello from HopOn! Here's your OTP for Password Reset",
      `<p>We received a request to reset your password for your account. If you made this request, you can reset your password by entering the OTP below:</p>
      <h1>Your OTP for Password Reset is ${otp}</h1>
      <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
      <p>This OTP will expire in 8 hours for security reasons. If you need further assistance, please contact our support team.</p>
      <p>Best regards,<br>HopOn Team<br>Thank you for choosing us</p>
      <p><em>Please do not reply to this email. This inbox is not monitored.</em></p>
    `
        )
    }
    catch(err){
        console.log(err)
    }
}

ResetSchema.pre("save", async function(next) {
    if(this.isNew){
        await sendVerificationEmail(this.user_email,this.otp)
    }
    next();
})

const ResetModel = mongoose.model("Password",ResetSchema);

module.exports = ResetModel;
