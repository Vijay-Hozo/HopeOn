const express = require("express");
const Router = express.Router();
const UserRideController = require('../../Controllers/UserRideController')
const UserAuth = require('../../Middleware/UserAuth')

Router.post('/user/addride',UserAuth,UserRideController.userRide);
Router.get('/user/getride',UserAuth,UserRideController.getrides);
Router.delete('/user/cancelride',UserAuth,UserRideController.cancelride);
module.exports = Router;