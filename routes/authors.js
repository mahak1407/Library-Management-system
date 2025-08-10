const express = require("express");
const routes = express.Router();
const authorsController = require("../controllers/authorsController");
routes.get("/author", (req, res) => {
    res.render("author");
});
routes.get("/addAuthor", (req, res) => {
    res.render("addAuthor", { message1: "", message2: "" });
});
routes.get("/deleteAuthor", (req, res) => {
    res.render("deleteAuthor", { message1: "", message2: "" });
});
routes.get("/updateAuthor", (req, res) => {
    res.render("updateAuthor", { message1: "", message2: "" });
});
routes.get("/displayAuthor", (req, res) => {
    res.render("displayAuthor", { message1: "", message2: "", authors: null, author: null });
});
routes.post("/addAuthor", authorsController.addAuthor);
routes.post("/deleteAuthor", authorsController.deleteAuthor);
routes.post("/updateAuthor", authorsController.updateAuthor);
routes.post("/displayAuthor", authorsController.displayAuthor);
module.exports = routes;
