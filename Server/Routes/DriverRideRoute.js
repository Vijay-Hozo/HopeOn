const express = require("express");
const Router = express.Router();
const DriverRideController = require('../Controllers/DriverRideController')
const DriverAuth = require('../Middleware/DriverAuth');

Router.post('/driverride',DriverAuth,DriverRideController.driverride);
Router.get('/driverride',DriverAuth,DriverRideController.getrides);
Router.delete('/driverride/:id',DriverAuth,DriverRideController.deleteride);
Router.get('/driverrides',DriverRideController.getallrides);

module.exports = Router;