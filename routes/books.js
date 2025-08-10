const express = require("express");
const routes = express.Router();
const booksController = require("../controllers/booksController");
routes.get("/book", (req, res) => {
    res.render("book");
});
routes.get("/addBook", (req, res) => {
    res.render("addBook", { message1: "", message2: "" });
});
routes.get("/deleteBook", (req, res) => {
    res.render("deleteBook", { message1: "", message2: "" });
});
routes.get("/updateBook", (req, res) => {
    res.render("updateBook", { message1: "", message2: "" });
});
routes.get("/displayBook", (req, res) => {
    res.render("displayBook", { message1: "", message2: "", books: null, book: null });
});
routes.post("/addBook", booksController.addBook);
routes.post("/deleteBook", booksController.deleteBook);
routes.post("/updateBook", booksController.updateBook);
routes.post("/displayBook", booksController.displayBook);

module.exports = routes;
