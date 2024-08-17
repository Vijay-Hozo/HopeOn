const nodemailer = require("nodemailer");

const mailSender = async (user_email, title, body) => {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ridehopon@gmail.com",
                pass: "fufe pbyw lxrv owud"
            }
        })
        const mailOptions = {
            from: "ridehopon@gmail.com",
            to: user_email,
            subject: title,
            html: body
        }
        await transporter.sendMail(mailOptions)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = mailSender;