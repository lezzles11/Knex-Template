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

function returnQuery(q) {
  q.then((rows) => {
    return rows;
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
  response.render("create_user_form");
});

/** # Get List of Users Method #
/*  ====================== */
/** Model and Controller */

// parse the users into array of objects - should i do this through the frontend or backend?
app.get("/get_users", (request, response) => {
  // Can successfully render the page
  let getQuery = knex.from("users").select("username", "pass");
  getQuery
    .then((rows) => {
      console.log(rows);
      response.render("list_users", { users: rows });
    })
    .catch((error) => {
      console.log(error);
    });
});
/** # Post User Method #
/*  ====================== */
/** Model and Controller */
function postUser(newUsername, newPassword) {
  console.log("Creating new user");
  let newQuery = knex
    .insert({ username: newUsername, pass: newPassword })
    .into("users");
  acceptQuery(newQuery);
}

app.post("/post_user", (request, response) => {
  // request is the client (which is YOU, submitting the data)
  let newUsername = request.body.newUsername;
  let newPassword = request.body.newPassword;
  console.log("Username: " + newUsername);
  console.log("Password: " + newPassword);
  postUser(newUsername, newPassword);
  response.send(request.body);
});

/** # Edit User Method #
/*  ====================== */
/** 1) Model and Controller */
function editUser(getUser, newPassword) {
  console.log("Editing user");
  let query = knex("users")
    .update({ pass: newPassword })
    .where("username", getUser);
  acceptQuery(query);
}

/** # Delete User #
/*  ====================== */
/** 1) Model and Controller */
function deleteUser(getUser) {
  console.log("Deleting user");
  let query = knex("users").where({ username: getUser }).del();
  acceptQuery(query);
}

/** # Post Note Method #
/*  ====================== */
/** 1) Model and Controller */

/** # Edit Note Method #
/*  ====================== */
/** 1) Model and Controller */

/** # Delete Note Method #
/*  ====================== */
/** 1) Model and Controller */

/** # Get Notes, based on Username #
/*  ====================== */
/** 1) Model and Controller */

// at the end of your application, you just connect to the port
app.listen(3000, () => {
  console.log("Port works on 3000");
});

/*
MANY TO MANY RELATIONSHIP
*/
