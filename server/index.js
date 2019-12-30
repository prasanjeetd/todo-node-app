// Sets up dotenv as soon as our application starts
var env = require('dotenv').config();

console.log("env", env);

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

// Configuring the database
const dbConfig = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// create express app
const app = express();
const router = express.Router();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// app.use(logger('dev'));

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Rest API for Todo list." });
});

router.use('/api/v1', (req, res, next) => {
    res.send('Hello');
    next();
});


require('./api/routes/router')(app);
const routes = require('./api/routes/user.route');
app.use('/api/v1', routes(router));

// listen for requests
var server = app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

module.exports = app;
