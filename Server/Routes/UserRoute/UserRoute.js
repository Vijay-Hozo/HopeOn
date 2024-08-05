const express = require("express");
const Router = express.Router();
const UserController = require("../../Controllers/UserController")

Router.post("/registeruser",UserController.newuser);
Router.post("/loginuser",UserController.loginuser)

module.exports = Router;