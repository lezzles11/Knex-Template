// Configuration
const hbs = require("express-handlebars");
const app = require("./config/express.js");
const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: "postgres",
    user: "postgres",
    password: "orange",
  },
});

// using the package
app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
  })
);
function acceptQuery(q) {
  q.then((rows) => {
    console.log(rows);
  }).catch((error) => {
    console.log(error);
  });
}

// creating a route
app.get("/", (request, response) => {
  response.render("home");
});
app.get("/user_form", (request, response) => {
  response.render("user_form");
});

app.get("/note_form", (request, response) => {
  response.render("note_form");
});

/** # Get List of Users Method #
/*  ====================== */
/** Model and Controller */
app.get("/get_users", (request, response) => {
  // Can successfully render the page
  let getQuery = knex.from("users").select("username", "pass");
  getQuery
    .then((rows) => {
      console.log(rows);
      response.render("get_users", { users: rows });
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

/** # Get User Notes Method #
/*  ====================== */
/** Model and Controller */
// getUser, by passing in username
// current table structure:
// users: username, pass, created
// notes: username, content
function getUserNotes(searchTerm) {
  console.log("Getting " + searchTerm + "'s notes!");
  console.log("I want this to output all of lesleyUsername's notes");
  const query = knex
    .select("content")
    .from("notes")
    .leftJoin("users", "notes.username", "users.username")
    .where("notes.username", "=", searchTerm);
  acceptQuery(query);
}

/** # Edit User Method #
/*  ====================== */
/** 1) Model and Controller */

app.get("/edit_user_form/:username", (request, response) => {
  // #TODO: Create query that would get a user, based on username
  console.log("What variable holds username?");
  console.log(request.params.username);
  response.render("edit_user_form", { username: request.params.username });
});

/*
app.get("/get_users", (request, response) => {
  // Can successfully render the page
  let getQuery = knex.from("users").select("username", "pass");
  getQuery
    .then((rows) => {
      console.log(rows);
      response.render("get_users", { users: rows });
    })
    .catch((error) => {
      console.log(error);
    });
});
*/
function editUser(getUser, newPassword) {
  console.log("Editing user");
  let query = knex("users")
    .update({ pass: newPassword })
    .where("username", getUser);
  acceptQuery(query);
}

app.post("/put_user/:username", (request, response) => {
  console.log("supposed to render username");
  let username = request.params.username;
  console.log("Supposed to render password");
  let newPass = request.body.newPassword;
  console.log(request.body.newPassword);
  let getQuery = knex("users")
    .update({ pass: newPass })
    .where("username", username);
  getQuery
    .then((rows) => {
      console.log(rows);
      response.render("home");
    })
    .catch((error) => {
      console.log(error);
    });
});
/** # Delete User #
/*  ====================== */
/** Model and Controller */
function deleteUser(getUser) {
  console.log("Deleting user");
  let query = knex("users").where({ username: getUser }).del();
  acceptQuery(query);
}

/** # Post Note Method #
/*  ====================== */
/** Model and Controller */
function postNote(getUser, getContent) {
  console.log("Creating new note");
  let newQuery = knex
    .insert({ username: getUser, content: getContent })
    .into("notes");
  acceptQuery(newQuery);
}

app.post("/post_note", (request, response) => {
  // request is the client (which is YOU, submitting the data)
  let user = request.body.username;
  let note = request.body.content;
  console.log("Username: " + user);
  console.log("Content: " + note);
  postNote(user, note);
  response.send(request.body);
});

/** # Get all notes method #
/*  ====================== */
/** Controller */
app.get("/get_notes", (request, response) => {
  // Can successfully render the page
  let getQuery = knex.from("notes").select("username", "content");
  getQuery
    .then((rows) => {
      console.log(rows);
      response.render("get_notes", { notes: rows });
    })
    .catch((error) => {
      console.log(error);
    });
});
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
