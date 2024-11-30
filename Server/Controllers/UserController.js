const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RandomModel = require("../Models/RandomModel");
const ResetModel = require("../Models/ResetPasswordModel");

const newuser = async (req, res) => {
  const {
    user_name,
    user_email,
    user_password,
    user_phone,
    user_age,
    user_gender,
    profile,
  } = req.body;

  try {
    if (user_password.length < 6) {
      return res.status(400).json({
        status: "failure",
        message: "Password must be longer than 6 characters",
      });
    }


    const response = await RandomModel.find()
      .sort({ createdAt: -1 }).limit(1)

    if (!otp) {
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

//LOGIN
const loginuser = async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    const user = await UserModel.findOne({ user_email });

    if (!user) {
      return res.status(401).json({
        status: "failure",
        message: "User not found",
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
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: "Failed to login",
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

const changePassword = async (req, res) => {
  const { user_email, otp, user_password } = req.body;

  try {
    const user = await UserModel.findOne({ user_email });
    if (!user) {
      return res.status(400).json({
        status: "failure",
        message: "User not found",
      });
    }

    const response = await ResetModel.findOne({user_email})
      .sort({ createdAt: -1 })
      .limit(1);
      // console.log(response);

    if (response.length === 0) {
      return res.status(400).json({
        status: "failure",
        message: "OTP not found",
      });
    }

    if (otp !== response.otp) {
      return res.status(400).json({
        status: "failure",
        message: "OTP is invalid",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);
    // console.log(hashedPassword);
    

    await UserModel.findOneAndUpdate({user_email},{user_password:hashedPassword});
    // await user.save();

    await ResetModel.deleteMany({ otp });
    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });

  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({
      status: "failure",
      message: "Unable to change password",
      error: err.message,
    });
  }
};



module.exports = { newuser, loginuser, getuserbyid,changePassword };
