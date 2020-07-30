// 1. We're going to create a website

// 2. That has a database

// 3. You can add, edit, delete and get notes

// importing the package
const express = require("express");

const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
// using the package
const app = express();

const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: "postgres",
    user: "postgres",
    password: "orange",
  },
});

let query = knex.select("username", "pass").from("users");
// print to screen the command
console.log(query.toSQL());

query
  .then((rows) => {
    console.log(rows);
  })
  .catch((error) => {
    console.log(error);
  });

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
app.post("/submitted", (request, response) => {
  // request is the client (which is YOU, submitting the data)
  response.send(request.body);
});

// at the end of your application, you just connect to the port
app.listen(3000, () => {
  console.log("Port works on 3000");
});
