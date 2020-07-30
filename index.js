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

function acceptQuery(q) {
  q.then((rows) => {
    console.log(rows);
  }).catch((error) => {
    console.log(error);
  });
}

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
// POST Functionality! :D
// POST Model
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

function editUser(getUser, newPassword) {
  console.log("Editing user");
  let query = knex("users")
    .update({ pass: newPassword })
    .where("username", getUser);
  acceptQuery(query);
}

editUser("lesleyUsername", "newpassword");

function deleteUser(username) {
  console.log("Deleting user");
}

// POST Controller
app.post("/submitted", (request, response) => {
  // request is the client (which is YOU, submitting the data)
  let newUsername = request.body.newUsername;
  let newPassword = request.body.newPassword;
  console.log("Username: " + newUsername);
  console.log("Password: " + newPassword);
  postUser(newUsername, newPassword);
  response.send(request.body);
});

// at the end of your application, you just connect to the port
app.listen(3000, () => {
  console.log("Port works on 3000");
});

/*
MANY TO MANY RELATIONSHIP
*/
