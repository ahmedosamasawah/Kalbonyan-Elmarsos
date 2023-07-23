const express = require("express");
const bodyParser = require("body-parser");

const users = [];
const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response, next) => {
  response.render("index", { pageTitle: "Add User" });
});

app.get("/users", (request, response, next) => {
  response.render("users", { pageTitle: "Users", users: users });
});

app.post("/add-user", (request, response, next) => {
  users.push({ name: request.body.username });
  response.redirect("/users");
});

app.listen(3000);
