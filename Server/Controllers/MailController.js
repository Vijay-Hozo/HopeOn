const RequestModel = require("../Models/RequestModel");
const nodemailer = require("nodemailer");
const DriverRideModel = require("../Models/DriverRideModel");

const sendmail = async (req, res) => {
  const { ride_id } = req.body;
  const subject = "Ride Request";

  try {
    const recipient = await RequestModel.findOne({ ride_id })
      .populate({
        path: "user_id",
        select: "user_email user_name", 
      })
      .populate({
        path: "driver_id",
        select: "driver_email driver_name driver_phone driver_age",
      });
      console.log(recipient);
      

    if (!recipient) {
      return res.status(404).json({ message: "Ride request not found." });
    }

    const text = `
    Dear ${recipient.user_id.user_name},

    We are pleased to inform you that your ride request has been accepted! Your driver, ${recipient.driver_id.driver_name}, is looking forward to providing you with a comfortable and safe journey. Below are the details of your upcoming ride:

    Ride Details:
    - Driver's Name: ${recipient.driver_id.driver_name}
    - Driver's Phone: ${recipient.driver_id.driver_phone}
    - Driver's Age: ${recipient.driver_id.driver_age}

    Important Notes:
    1. Please be at the departure location at least 10 minutes before the scheduled time.
    2. Your safety is our priority. Please fasten your seatbelt and follow all safety instructions provided by the driver.
    3. If you need to contact your driver, you can reach them at ${recipient.driver_id.driver_phone}.

    We hope you have a pleasant experience with our service. Thank you for choosing us!

    Best regards,
    HopOn Team
    `;

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "ridehopon@gmail.com",
        pass: "fufe pbyw lxrv owud",
      },
      secure: true,
    });

    const mailData = {
      from: "ridehopon@gmail.com",
      to: recipient.user_id.user_email, 
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

    await DriverRideModel.deleteOne({ ride_id });
    await RequestModel.deleteOne({ ride_id });

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
};

module.exports = { sendmail };
