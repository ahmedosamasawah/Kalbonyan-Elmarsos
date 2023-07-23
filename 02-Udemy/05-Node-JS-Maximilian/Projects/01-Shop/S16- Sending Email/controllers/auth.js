const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getLogin = (request, response, next) => {
  let message = request.flash("error");
  message.length > 0 ? (message = message[0]) : (message = null);

  response.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (request, response, next) => {
  let message = request.flash("error");
  message.length > 0 ? (message = message[0]) : (message = null);

  response.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (request, response, next) => {
  const email = request.body.email;
  const password = request.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        request.flash("error", "Invalid email or password!");
        return response.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            request.session.isLoggedIn = true;
            request.session.user = user;
            return request.session.save((error) => response.redirect("/"));
          }
          request.flash("error", "Invalid email or password!");
          response.redirect("/login");
        })
        .catch((error) => response.redirect("/login"));
    })
    .catch((error) => console.log(error));
};

exports.postSignup = (request, response, next) => {
  const email = request.body.email;
  const password = request.body.password;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        request.flash(
          "error",
          "E-Mail exists already, please pick a different one!"
        );
        return response.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          response.redirect("/login");
          return transporter.sendMail({
            to: email,
            from: "shop@node-complete.com",
            subject: "Signup succeeded!",
            html: "<h1>You successfully signed up!</h1>",
          });
        });
    })
    .catch((error) => console.log(error));
};

exports.postLogout = (request, response, next) => {
  request.session.destroy((error) => response.redirect("/"));
};
