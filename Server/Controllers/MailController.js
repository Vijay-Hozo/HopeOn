const RequestModel = require("../Models/RequestModel");
const nodemailer = require("nodemailer");


const sendmail = async (req, res) => {
  const { ride_id } = req.body;
  const subject = "Ride Request";
  const text = "Your request was accepted for a ride";
  const recipient = await RequestModel.findOne({ ride_id }).populate({
    path: "user_id",
    select: "user_email", // Assuming the email field is called 'email' in User model
  });
  console.log(recipient);
  
  console.log(recipient.user_id.user_email);
  

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "ridehopon@gmail.com",
      pass: "fufe pbyw lxrv owud",
    },
    secure: true,
  });

  try {
    const mailData = {
      from: "ridehopon@gmail.com",
      to: recipient,
      subject,
      text,
    };
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
};

module.exports = { sendmail };
