const otpGenerator = require("otp-generator");
const RandomModel = require("../Models/RandomModel");
const UserModel = require("../Models/UserModel");
const ResetModel = require("../Models/ResetPasswordModel");
const usermail = require("../Utils/MailSender");
const mailsender = require("../Utils/driverMail");
const RequestModel = require("../Models/RequestModel");
const DriverRideModel = require("../Models/DriverRideModel");
const DriverModel = require("../Models/DriverModel");

const sendotp = async (req, res) => {
  try {
    const { user_email, user_age, user_gender, user_name, user_password, user_phone } = req.body;
    const user = await UserModel.findOne({ user_email });
    if (user) {
      return res.status(400).json({
        status: "failure",
        message: "User is already registered",
      });
    }

    const newuser = new UserModel({
      user_email,
      user_name,
      user_password,
      user_phone,
      user_age,
      user_gender,
    });

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await RandomModel.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await RandomModel.findOne({ otp });
    }

    const otppayload = { user_email, otp };
    await RandomModel.create(otppayload);

    const emailBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #1a73e8;">Welcome to HopOn!</h2>
        <p>Dear ${user_name},</p>
        <p>To complete your registration, please use the OTP below:</p>
        <p style="font-size: 20px; color: #1a73e8;"><strong>${otp}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>Thank you for choosing HopOn.</p>
        <p style="font-weight: bold;">Best regards,<br>HopOn Team</p>
      </div>
    `;
    await usermail(user_email, "Your OTP Code", emailBody);
    await newuser.save();

    res.status(200).json({
      status: "success",
      message: "OTP sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Unable to send OTP",
      error: err.message,
    });
  }
};

const verifyotp = async (req, res) => {
  const{user_email, otp} = req.body;
  try {
    if (!user_email || !otp) {
      return res.status(400).json({
        status: "failure",
        message: "Please enter the OTP",
      });
    }

    const response = await RandomModel.find()
      .sort({ createdAt: -1 }).limit(1)

    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    const user = await UserModel.findOne({ user_email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await user.save();
    res.status(200).json({
      status: "success",
      message: "OTP verified successfully",
    });
  }
  catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Unable to verify OTP",
      error: err.message,
    });
  }
} 

const driververify = async (req, res) => {
  const { driver_email, driver_age, driver_name, driver_phone, driver_password, driver_governmentid, driver_vehicle } = req.body;
  try {
    if (!driver_email) {
      return res.status(400).json({
        status: "failure",
        message: "Please provide driver email",
      });
    }

    const newdriver = new DriverModel({
      driver_email,
      driver_name,
      driver_phone,
      driver_age,
      driver_password,
      driver_governmentid,
      driver_vehicle,
    })
  
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    
    let result = await RandomModel.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, { upperCaseAlphabets: false });
      result = await RandomModel.findOne({ otp });
    }
    const otppayload = { driver_email, otp };
    
    const otpbody = await RandomModel.create(otppayload);
    const emailBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1a73e8;">Welcome to HopOn!</h2>
          <p>Dear Rider,</p>
      
          <p>We are excited to have you join our community. To complete your registration, please use the OTP below to verify your email address:</p>
      
          <p style="font-size: 20px; color: #1a73e8;"><strong>${otp}</strong></p>
      
          <p>This OTP is valid for the next 10 minutes. Please enter it in the required field to complete your verification process.</p>
      
          <p>If you did not initiate this request, please ignore this email or contact our support team immediately.</p>
      
          <p>Thank you for choosing HopOn. We look forward to providing you with the best ride-sharing experience.</p>
      
          <p style="font-weight: bold;">Best regards,<br>HopOn Team</p>
      
          <hr style="border: none; border-top: 1px solid #ccc;" />
      
          <p style="font-size: 12px; color: #777;">This email was sent to you by HopOn. If you did not sign up for this service, please disregard this email.</p>
        </div>
      `;
    await mailsender(driver_email, "Your OTP Code", emailBody);
    await newdriver.save();
    res.status(200).json({
      status: "success",
      message: "OTP sent successfully",
      // otpbody
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Unable to send OTP",
      error: err.message,
    });
  }
};

const passwordotp = async (req, res) => {
  try {
    const { user_email } = req.body;
    const user = await UserModel.findOne({ user_email });
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await ResetModel.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, { upperCaseAlphabets: false });
      result = await ResetModel.findOne({ otp });
    }
    const otppayload = { user_email, otp };
    const otpbody = await ResetModel.create(otppayload);

    const emailBody = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #d9534f;">Password Reset Request</h2>
    <p>Dear User,</p>

    <p>We received a request to reset the password associated with your HopOn account. Please use the OTP below to proceed with resetting your password:</p>

    <p style="font-size: 20px; color: #d9534f;"><strong>${otp}</strong></p>

    <p>This OTP is valid for the next 10 minutes. Please ensure you enter it in the required field to complete the password reset process.</p>

    <p>If you did not request a password reset, please ignore this email or contact our support team immediately to secure your account.</p>

    <p>Your security is our priority. We recommend updating your password regularly and ensuring it is strong and unique.</p>

    <p style="font-weight: bold;">Best regards,<br>HopOn Team</p>

    <hr style="border: none; border-top: 1px solid #ccc;" />

    <p style="font-size: 12px; color: #777;">This email was sent to you because a password reset request was made for your HopOn account. If you did not initiate this request, please contact our support team.</p>
  </div>
`;

    await usermail(user_email, "Your OTP Code", emailBody);

    res.status(200).json({
      status: "success",
      message: "OTP sent successfully",
      otpbody,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Unable to send OTP",
      error: err.message,
    });
  }
};

const driverotpverify = async (req, res) => {
  const { driver_email, otp } = req.body;
  try {
    if (!driver_email || !otp) {
      return res.status(400).json({
        status: "failure",
        message: "Please enter the OTP",
      });
    }

    const response = await RandomModel.find()
      .sort({ createdAt: -1 })
      .limit(1);

    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    const driver = await DriverModel.findOne({ driver_email });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }
    await driver.save();
    res.status(200).json({
      status: "success",
      message: "OTP verified successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Unable to verify OTP",
      error: err.message,
    });
  }
}

const driverpasswordotp = async (req, res) => {
  const { driver_email } = req.body;
  try {
    if (!driver_email) {
      return res.status(400).json({
        status: "failure",
        message: "Please provide driver email",
      });
    }
    const driver = await DriverModel.findOne({ driver_email });
    if (!driver) {
      return res.status(404).json({
        status: "failure",
        message: "Driver not found",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await RandomModel.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, { upperCaseAlphabets: false });
      result = await RandomModel.findOne({ otp });
    }
    const otppayload = { driver_email, otp };
    const otpbody = await RandomModel.create(otppayload);

    const emailBody = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #d9534f;">Password Reset Request</h2>
    <p>Dear Rider,</p>

    <p>We received a request to reset the password associated with your HopOn account. Please use the OTP below to proceed with resetting your password:</p>

    <p style="font-size: 20px; color: #d9534f;"><strong>${otp}</strong></p>

    <p>This OTP is valid for the next 10 minutes. Please ensure you enter it in the required field to complete the password reset process.</p>

    <p>If you did not request a password reset, please ignore this email or contact our support team immediately to secure your account.</p>

    <p>Your security is our priority. We recommend updating your password regularly and ensuring it is strong and unique.</p>

    <p style="font-weight: bold;">Best regards,<br>HopOn Team</p>

    <hr style="border: none; border-top: 1px solid #ccc;" />

    <p style="font-size: 12px; color: #777;">This email was sent to you because a password reset request was made for your HopOn account. If you did not initiate this request, please contact our support team.</p>
  </div>
`;
    await mailsender(driver_email, "Your OTP Code", emailBody);
    res.status(200).json({
      status: "success",
      message: "OTP sent successfully",
      // otpbody
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Unable to send OTP",
      error: err.message,
    });
  }
};

const acceptmail = async (req, res) => {
  const { ride_id } = req.body;
  const title = "Ride Request Accepted";

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

    const user_email = recipient.user_id.user_email;
    if (!recipient) {
      return res.status(404).json({ message: "Ride request not found." });
    }

    const text = `
    Dear ${recipient.user_id.user_name},
      <br><br>
    We are thrilled to inform you that your ride request has been accepted! Your journey with HopOn is about to begin, and we're excited to make it a comfortable and safe experience for you. Below are the details of your upcoming ride:
      <br><br>
    <strong>Driver Details:</strong>
    <br>- <strong>Driver's Name:</strong> ${recipient.driver_id.driver_name}
    <br>- <strong>Driver's Phone:</strong> ${recipient.driver_id.driver_phone}
    <br>- <strong>Driver's Age:</strong> ${recipient.driver_id.driver_age}
      <br><br>
    <strong>Important Notes:</strong>
      <br><br>
    1. <strong>Arrival Time:</strong> Please ensure you are at the departure location at least 10 minutes before the scheduled time. Punctuality ensures a smooth start to your journey.
      <br><br>
    2. <strong>Your Safety Matters:</strong> Your safety is our top priority. Please fasten your seatbelt and adhere to all safety instructions provided by your driver.
      <br><br>
    3. <strong>Contacting Your Driver:</strong> Should you need to reach your driver, feel free to contact them directly at ${recipient.driver_id.driver_phone}.
      <br><br>
    We are dedicated to ensuring you have a pleasant and hassle-free experience with us. Thank you for choosing HopOn for your transportation needs. If you have any further questions or need assistance, don't hesitate to reach out.
      <br><br>
    Looking forward to serving you!
      <br><br>
    Best regards,
    <br><strong>HopOn Team</strong>
  `;

    await usermail(user_email, title, text);
    await RequestModel.findOneAndUpdate({ ride_id }, { status: "accept" });
    await DriverRideModel.deleteOne({ ride_id });
    await RequestModel.deleteOne({ride_id});

    res
      .status(200)
      .json({ status: "success", message: "Mail sent successfully" });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Unable to send mail",
      error: err.message,
    });
  }
};

module.exports = { sendotp, passwordotp, acceptmail, driververify, driverpasswordotp,verifyotp, driverotpverify };
