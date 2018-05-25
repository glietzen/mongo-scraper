// REQUIRE PACKAGES
// ==================================
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// GET MODELS
// ==================================
const Note = require("./models/Note.js");
const Article = require("./models/Article.js");

// SCRAPING TOOLS
// ==================================
const request = require("request");
const cheerio = require("cheerio");

// SET MONGO & PORT
// ==================================
mongoose.Promise = Promise;
let PORT = process.env.PORT || 8000;

// INITIALIZE EXPRESS
// ==================================
let app = express();

// PARSE BODY
// ==================================
app.use(bodyParser.urlencoded({
  extended: false
}));

// SET STATIC DIRECTORY
// ==================================
app.use(express.static("public"));

// SET HANDLEBARDS
// ==================================
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// SET ROUTES
// ==================================
const routes = require("./controllers/scraper_controller.js");
app.use("/", routes);

// CONNECT DB & START APP
// ==================================
mongoose.connect("mongodb://localhost/mongo-scraper-dev");
const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Mongoose Error: ", error);
});

db.once("open", () => {
  console.log("Mongoose connection successful.");
});

app.listen(PORT, () => {
  console.log("App running on PORT " + PORT);
});


