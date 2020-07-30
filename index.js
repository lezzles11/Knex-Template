// 1. We're going to create a website

// 2. That has a database

// 3. You can add, edit, delete and get notes

// importing the package
const express = require("express");

// using the package
const app = express();

// creating a route
app.get("/", (request, response) => {
  response.send("Hello! This works!");
});
app.get("/package", (request, response) => {
  response.send("Hello! This is the package route!");
});

// at the end of your application, you just connect to the port
app.listen(3000, () => {
  console.log("Port works on 3000");
});
