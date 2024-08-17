const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const RandomModel = require("../Models/RandomModel");

const newuser = async (req, res) => {
  const {
    user_name,
    user_email,
    user_password,
    user_phone,
    user_age,
    user_gender,
    profile,
    otp
  } = req.body;

  try {
    if (user_password.length < 6) {
      return res.status(400).json({
        status: "failure",
        message: "Password must be longer than 6 characters",
      });
    }

    const exsitingUser = await UserModel.find({user_email})
    if(exsitingUser){
      return res.status(400).json({
        status: "failure",
        message: "User already exists",
      })
    }

    console.log("Looking for OTP for email:", user_email);
    
    const response = await RandomModel.find()

    if(!otp){
      return res.status(400).json({
        success: false,
        message: "Please enter the OTP",
      });
    }

    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      console.log("Database OTP:", response[0].otp);
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const newuser = await UserModel.create({
      user_name,
      user_email,
      user_password,
      user_phone,
      user_age,
      user_gender,
      profile,
    });

    res.status(200).json({
      status: "success",
      message: "User created successfully",
      newuser,
    });

  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: "Unable to create user",
      error: err.message,
    });
  }
};



const loginuser = async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    const user = await UserModel.findOne({ user_email });

    if (!user) {
      return res.status(401).json({
        status: "failure",
        message: "user not found",
      });
    }
    const isValidPassword = await bcrypt.compare(
      user_password,
      user.user_password
    );
    if (!isValidPassword) {
      return res.status(400).json({
        status: "failure",
        message: "Password is invalid",
      });
    }
    const token = jwt.sign({ id: user._id }, "secret_key", {
      expiresIn: "8h",
    });
    res.status(200).json({
      status: "success",
      message: "user Loggined successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: "failed to login",
      error: err.message,
    });
  }
};

const getuserbyid = async (req, res) => {
  const user_id = req.user.id;
  try {
    const user = await UserModel.findById(user_id);
    if (!user) {
      return res.status(401).json({
        status: "failure",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: "cant fetch user",
      error: err.message,
    });
  }
};

module.exports = { newuser, loginuser, getuserbyid };
