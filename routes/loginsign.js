const express = require("express");
const routes = express.Router();
const verifyToken = require('../middleware/auth')
const login = require("../controllers/loginController")
const signup = require("../controllers/signupController");

routes.get('/', (req, res) => {
    res.render('logSignpage', { img: '/pics/img1.jpg' })
})
routes.get('/home', verifyToken, (req, res) => {
    res.render('home');
});

routes.get('/login', (req, res) => {
    res.render('login', { message: null });

});

routes.get('/signup', (req, res) => {
    res.render('signup', { message: null, type: null });
});

routes.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});


routes.post('/login', login.loginUser);

routes.post('/signup', signup.signupUser);

module.exports = routes;