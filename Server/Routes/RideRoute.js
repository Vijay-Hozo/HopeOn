const express = require("express");
const Router = express.Router();
const UserAuth = require("../Middleware/UserAuth");
const RideController = require('../Controllers/RideController');

Router.post("/addservice",UserAuth,RideController.addservice)
Router.get('/getservice',UserAuth,RideController.getservice);

module.exports = Router;