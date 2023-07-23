const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

const SENDGRID_API_KEY =
  "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";

sgMail.setApiKey(SENDGRID_API_KEY);

const User = require("../models/user");

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
        request.flash("error", "Invalid email or password.");
        return response.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            request.session.isLoggedIn = true;
            request.session.user = user;
            return request.session.save(() => response.redirect("/"));
          }
          request.flash("error", "Invalid email or password.");
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
          "E-Mail exists already, please pick a different one."
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
          const signupMsg = {
            to: email,
            from: "ahmedosamaalsawah@gmail.com",
            subject: "Sending with Twilio SendGrid is Fun",
            text: "You successfully signed up",
            html: "<h1>You successfully signed up!</h1>",
          };

          sgMail(signupMsg);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

exports.postLogout = (request, response, next) => {
  request.session.destroy(() => response.redirect("/"));
};

exports.getReset = (request, response, next) => {
  let message = request.flash("error");
  message.length > 0 ? (message = message[0]) : (message = null);

  response.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = (request, response, next) => {
  crypto.randomBytes(32, (error, buffer) => {
    error && response.redirect("/reset");

    const token = buffer.toString("hex");
    User.findOne({ email: request.body.email })
      .then((user) => {
        if (!user) {
          request.flash("error", "No account with that email found.");
          return response.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(() => {
        response.redirect("/");
        const resetMsg = {
          to: email,
          from: "ahmedosamaalsawah@gmail.com",
          subject: "Password reset",
          html: `<p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>`,
        };
        sgMail(resetMsg);
      })
      .catch((error) => console.log(error));
  });
};

exports.getNewPassword = (request, response, next) => {
  const token = request.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      let message = request.flash("error");
      message.length > 0 ? (message = message[0]) : (message = null);

      response.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((error) => console.log(error));
};

exports.postNewPassword = (request, response, next) => {
  const newPassword = request.body.password;
  const userId = request.body.userId;
  const passwordToken = request.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      response.redirect("/login");
    })
    .catch((error) => console.log(error));
};
