const express = require("express");
const Router = express.Router();
const UserController = require("../Controllers/UserController")
const UserAuth = require("../Middleware/UserAuth")

Router.post("/register",UserController.newuser);
Router.post("/login",UserController.loginuser);
Router.get("/user",UserAuth,UserController.getuserbyid);
Router.put("/reset",UserController.changePassword);

module.exports = Router;