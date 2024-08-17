const express = require("express");
const Router = express.Router();
const OTPController = require("../Controllers/OtpController");

Router.post("/sendotp", OTPController.sendotp);

module.exports = Router;