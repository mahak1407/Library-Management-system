const express = require("express");
const routes = express.Router();
const  forgotPassword=require("../controllers/forgotController")

routes.get('/forgotPassword', (req, res) => {
    res.render('forgotPassword', { message: '' });
});

routes.get('/verifyOtp', (req, res) => {
    res.render('verifyOtp', { message: '' });
});

routes.post('/send-otp', forgotPassword.sendOTP);

routes.post('/verifyOtp', forgotPassword.veriftOtp);

module.exports = routes;