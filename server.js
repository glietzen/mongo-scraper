// REQUIRE PACKAGES
// ==================================
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const exphbs = require('express-handlebars');

// GET MODELS
// ==================================
let Note = require('./models/Note');
let Article = require('./models/Article');


// SET MONGO
// ==================================
mongoose.Promise = Promise;

// SET PORT
// ==================================
let PORT = process.env.PORT || 8000;

// INITIALIZE EXPRESS
// ==================================
let app = express();
app.use(express.static('public'));

// SETUP HANDLEBARS & STATIC
// ==================================
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// SET ROUTES
// ==================================
let routes = require('./controllers/scraper_controller');
app.use('/', routes);


// CONNECT DB & START APP
// ==================================
mongoose.connect("mongodb://localhost/mongo-scraper-dev");
let db = mongoose.connection;

db.on('error', (e) => {
    console.log(e);
})

db.once('open', () => {
    console.log('Mongoose success.')
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});