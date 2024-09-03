const express = require("express");
const Router = express.Router();
const OTPController = require("../Controllers/OtpController");

Router.post("/sendotp", OTPController.sendotp);
Router.post("/passwordotp", OTPController.passwordotp);
Router.post("/acceptmail", OTPController.acceptmail);
Router.post("/driverotp", OTPController.driververify);
Router.post("/driverpassword", OTPController.driverpasswordotp);


module.exports = Router;