const express = require("express");
const Router = express.Router();
const DriverController = require("../../Controllers/DriverController")

Router.post("/registerdriver",DriverController.newdriver);
Router.post("/logindriver",DriverController.logindriver)

module.exports = Router;