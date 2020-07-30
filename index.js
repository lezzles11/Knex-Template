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

// column 1: username
// column 2: pass

let query2 = knex.insert({ username: "Meow", pass: "meowpass" }).into("users");
let query3 = knex
  .insert({ username: "whiskey", pass: "whiskeyspass" })
  .into("users");

let query4 = knex("users")
  .update({ pass: "newpassword" })
  .where("username", "whiskey");

let query5 = knex("users")
  .update({ pass: "newpass" })
  .where("username", "Meow");

function acceptQuery(q) {
  q.then((rows) => {
    console.log(rows);
  }).catch((error) => {
    console.log(error);
  });
}

acceptQuery(query5);
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

/*

ONE TO MANY RELATIONSHIP 

classes 
==========
id | primary key ()
name | string 

------------------

teachers
============ 
id | primary key
name | string 
class_id | foreign key (references table below )

*/
// Classes Table
exports.up = function (knex, Promise) {
  return knex.schema.createTable("classes", (table) => {
    table.increments();
    table.string("name");
    table.string("classroom");
    table.string("period");
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("classes");
};
// Teachers Table
exports.up = function (knex, Promise) {
  return knex.schema.createTable("teachers", (table) => {
    table.increments();
    table.string("name");
    // The unique is necessary to guarantee it is a one-to-one relation.
    table.integer("class_id").unsigned().unique();
    // foreign id is referenced here
    table.foreign("class_id").references("classes.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("teachers");
};

/*
MANY TO MANY RELATIONSHIP
*/
