// Configuration
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
// Bookshelf is a package that helps you
// #TODO: What is this supposed to do?
const bookshelf = require("bookshelf")(knex);

const User = bookshelf.model("User", {
  tableName: "users",
  notes() {
    return this.hasMany("Note");
  },
});

const Note = bookshelf.model("Note", {
  tableName: "notes",
  user() {
    return this.belongsTo("User");
  },
});

// let query2 = knex.insert({ username: "Meow", pass: "meowpass" }).into("users");
// let query3 = knex
//   .insert({ username: "whiskey", pass: "whiskeyspass" })
//   .into("users");

// let query4 = knex("users")
//   .update({ pass: "newpassword" })
//   .where("username", "whiskey");

// let query5 = knex("users")
//   .update({ pass: "newpass" })
//   .where("username", "Meow");

function acceptQuery(q) {
  q.then((rows) => {
    console.log(rows);
  }).catch((error) => {
    console.log(error);
  });
}

// function postNote(content) {}
// acceptQuery(query5);
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
function acceptQuery(q) {
  q.then((rows) => {
    console.log(rows);
  }).catch((error) => {
    console.log(error);
  });
}
function postUser(newUsername, newPassword) {
  console.log("Creating new user");
  let newQuery = knex
    .insert({ username: newUsername, pass: newPassword })
    .into("users");
  acceptQuery(newQuery);
}
app.post("/submitted", (request, response) => {
  // request is the client (which is YOU, submitting the data)
  let newUsername = request.body.newUsername;
  let newPassword = request.body.newPassword;
  console.log("Username: " + newUsername);
  console.log("Password: " + newPassword);
  postUser(newUsername, newPassword);
  response.send(request.body);
  //     .then(function () {
  //       response.send(request.body);
  //     })
  //     .catch(function () {
  //       response.status(500).send("Something went wrong");
  //     });
});

// at the end of your application, you just connect to the port
app.listen(3000, () => {
  console.log("Port works on 3000");
});

/*
MANY TO MANY RELATIONSHIP
*/
