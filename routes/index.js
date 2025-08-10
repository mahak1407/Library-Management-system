const express = require("express");
const routes = express.Router();
routes.get("/", (req, res) => {
    res.render("logSignPage", { img: '/pics/img1.jpg' });
});
module.exports = routes;

