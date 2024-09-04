const nodemailer = require("nodemailer");
require("dotenv").config();

const mailsender = async (driver_email, title, text) => {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: driver_email,
            subject: title,
            html: text
        }
        await transporter.sendMail(mailOptions)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = mailsender;