const dotenv = require('dotenv')
dotenv.config();

const express = require("express");
const app = express();

const connectDB = require("./config/db");

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const routes = require("./routes/index");
const authorroute = require("./routes/authors");
const booksroute = require("./routes/books");
const loginsign = require("./routes/loginsign")
const forgotPassword=require("./routes/forgotPassword")

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
app.use("/", loginsign);
app.use("/",forgotPassword)
app.use("/", authorroute);
app.use("/", booksroute);

connectDB();
app.listen(3000, () => {
    console.log("Server is running on 3000 --- LIBRARY MANAGEMENT");
});
