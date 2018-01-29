var express = require('express')
var session = require("express-session");
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')
// var {sequelize} = require('./models')
// var config = require('./config/config')
var passport = require("./config/passport");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Sets up the Express app to handle data parsing
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory

app.use(express.static("react-ad/build/static"));
app.use(express.static("public"));

// Routes
// =============================================================
// require('./routes')(app)
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/email-routes.js")(app);

// Syncing sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
