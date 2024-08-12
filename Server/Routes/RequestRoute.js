const express = require('express');
const Router = express.Router();
const RequestController = require('../Controllers/RequestController');  
const UserAuth = require("../Middleware/UserAuth");

Router.post('/request',UserAuth,RequestController.request);
Router.get('/request',UserAuth,RequestController.getrequests);
Router.put('/request/:id',UserAuth,RequestController.managerequest);

module.exports = Router;