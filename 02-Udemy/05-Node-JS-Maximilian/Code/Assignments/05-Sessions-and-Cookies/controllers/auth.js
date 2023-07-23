const User = require("../models/user");

exports.getLogin = (request, response, next) => {
  response.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: true,
  });
};

exports.postLogin = (request, response, next) => {
  User.findById("64948f171d014d4fc9600dcc")
    .then((user) => {
      request.session.isLoggedIn = true;
      request.session.user = user;
      request.session.save((error) => response.redirect("/"));
    })
    .catch((error) => console.log(error));
};

exports.postLogout = (request, response, next) =>
  request.session.destroy((error) => response.redirect("/"));
