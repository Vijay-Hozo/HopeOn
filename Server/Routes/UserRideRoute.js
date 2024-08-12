const express = require("express");
const Router = express.Router();
const UserRideController = require('../Controllers/UserRideController')
const UserAuth = require('../Middleware/UserAuth')

Router.post('/userride',UserAuth,UserRideController.userRide);
Router.get('/userride',UserAuth,UserRideController.getrides);
Router.delete('/userride/:id',UserAuth,UserRideController.cancelride);
module.exports = Router;