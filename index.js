// 1. We're going to create a website

// 2. That has a database

// 3. You can add, edit, delete and get notes

// importing the package
const express = require("express");

const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
// using the package
const app = express();

// Configure for HBS
app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "hbs");
// configuration to actually use the package

//
app.use(bodyParser.urlencoded({ extended: false }));
// this will make sure the response comes, it will be in json (string format)
app.use(bodyParser.json());

// creating a route
app.get("/", (request, response) => {
  response.render("home");
});
app.get("/form", (request, response) => {
  response.render("form");
});

// at the end of your application, you just connect to the port
app.listen(3000, () => {
  console.log("Port works on 3000");
});
