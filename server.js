var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var PORT = process.env.PORT || 3000;
var app = express();
var db = require("./models");

// serve static content for the app from the "public" directory in the application directory
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes and give the server access to them
var routes = require("./controllers/routes.js");

app.use('/', routes);

db.sequelize.authenticate().then(function() {
  console.log('Database connected and authenticated!');
  return true;
}).catch(function(err) {
  console.error('Failed to connect and authenticate', err);
  return false;
});

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});