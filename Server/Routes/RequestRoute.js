const express = require('express');
const Router = express.Router();
const RequestController = require('../Controllers/RequestController');  
const UserAuth = require("../Middleware/UserAuth");
const DriverAuth = require("../Middleware/DriverAuth");

Router.post('/request',UserAuth,RequestController.request);
Router.get('/request',DriverAuth,RequestController.getrequests);
Router.put('/request',DriverAuth,RequestController.managerequest);
Router.delete('/request',DriverAuth,RequestController.deleterequest);

module.exports = Router;