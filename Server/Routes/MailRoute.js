const express = require('express');
const Router = express.Router();
const MailController = require('../Controllers/MailController');
// const DriverAuth = require('../Middleware/DriverAuth');

Router.post('/mail', MailController.sendmail);

module.exports = Router;