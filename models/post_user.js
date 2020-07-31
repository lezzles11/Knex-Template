const knex = require("./config");

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

module.exports = postUser;
