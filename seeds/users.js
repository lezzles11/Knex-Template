exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "sam", password: "123456" },
        { username: "lesley", password: "asdf" },
        { username: "hhh", password: "asdf" },
        { username: "admin", password: "admin" },
      ]);
    });
};
