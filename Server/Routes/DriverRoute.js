const express = require("express");
const Router = express.Router();
const DriverController = require("../Controllers/DriverController")
const DriverAuth = require("../Middleware/DriverAuth")

Router.post("/registerdriver",DriverController.newdriver);
Router.post("/logindriver",DriverController.logindriver)
Router.get("/driver",DriverAuth,DriverController.getdriverbyid)
Router.put("/password",DriverController.changeDriverPassword)

module.exports = Router;