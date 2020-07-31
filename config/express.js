const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "hbs");
// configuration to actually use the package

app.use(bodyParser.urlencoded({ extended: false }));
// this will make sure the response comes, it will be in json (string format)
app.use(bodyParser.json());
// export knex

module.exports = app;
