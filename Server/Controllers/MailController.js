const RequestModel = require("../Models/RequestModel");
const nodemailer = require("nodemailer");
const DriverRideModel = require("../Models/DriverRideModel");

const sendmail = async (req, res) => {
  const { ride_id } = req.body;
  const subject = "Ride Request Accepted - Prepare for Your Journey!";
  
  try {
    const recipient = await RequestModel.find({ ride_id })
      .populate({
        path: "user_id",
        select: "user_email", 
      })
      .populate({
        path: "driver_id",
        select: "driver_email driver_name driver_phone driver_age", // Assuming these fields exist in Driver model
      });

    if (!recipient) {
      return res.status(404).json({ message: "Ride request not found." });
    }

    const user_email = recipient.user_id.user_email;
    console.log(recipient);
    
    console.log(user_email);
    
    const driver_email = recipient.driver_id.driver_email;
    const driver_name = recipient.driver_id.driver_name;
    const driver_phone = recipient.driver_id.driver_phone;
    const driver_age = recipient.driver_id.driver_age;

    // Construct the email body text
    const text = `
    Dear ${recipient.user_id.name},

    We are pleased to inform you that your ride request has been accepted! Your driver, ${driver_name}, is looking forward to providing you with a comfortable and safe journey. Below are the details of your upcoming ride:

    Ride Details:
   
    - Driver's Name: ${driver_name}
    - Driver's Phone: ${driver_phone}
    - Driver's Age: ${driver_age}

    Important Notes:
    1. Please be at the departure location at least 10 minutes before the scheduled time.
    2. Your safety is our priority. Please fasten your seatbelt and follow all safety instructions provided by the driver.
    3. If you need to contact your driver, you can reach them at ${driver_phone}.

    We hope you have a pleasant experience with our service. Thank you for choosing us!

    Best regards,
    RideHopOn Team
    `;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "ridehopon@gmail.com",
        pass: "fufe pbyw lxrv owud",
      },
      secure: true,
    });

    // Email data
    const mailData = {
      from: "ridehopon@gmail.com",
      to: user_email,
      subject,
      text,
    };

    // Send the email
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

    // Clean up by deleting the request and driver ride records
    // await DriverRideModel.deleteOne({ ride_id });
    // await RequestModel.deleteOne({ ride_id });

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
};

module.exports = { sendmail };
