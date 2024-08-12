const express = require("express");
const Router = express.Router();
const DriverRideController = require('../Controllers/DriverRideController')
const UserAuth = require('../Middleware/UserAuth')

Router.post('/driverride',UserAuth,DriverRideController.driverride);
Router.get('/driverride',UserAuth,DriverRideController.getrides);
Router.delete('/driverride/:id',UserAuth,DriverRideController.deleteride);

module.exports = Router;