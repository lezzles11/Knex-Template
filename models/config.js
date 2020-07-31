const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: "postgres",
    user: "postgres",
    password: "orange",
  },
});

module.exports = { knex };
