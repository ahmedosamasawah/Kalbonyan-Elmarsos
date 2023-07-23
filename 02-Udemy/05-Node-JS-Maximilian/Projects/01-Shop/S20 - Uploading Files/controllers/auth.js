const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator/check");

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
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.getSignup = (request, response, next) => {
  let message = request.flash("error");
  message.length > 0 ? (message = message[0]) : (message = null);

  response.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

exports.postLogin = (request, response, next) => {
  const email = request.body.email;
  const password = request.body.password;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return response.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "Invalid email or password.",
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            request.session.isLoggedIn = true;
            request.session.user = user;
            return request.session.save((error) => response.redirect("/"));
          }
          return response.status(422).render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            errorMessage: "Invalid email or password.",
            oldInput: {
              email: email,
              password: password,
            },
            validationErrors: [],
          });
        })
        .catch((error) => response.redirect("/login"));
    })
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postSignup = (request, response, next) => {
  const email = request.body.email;
  const password = request.body.password;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return response.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: request.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return user.save();
    })
    .then(() => response.redirect("/login"))
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (request, response, next) => {
  request.session.destroy((error) => response.redirect("/"));
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
    if (error) response.redirect("/reset");

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
        transporter.sendMail({
          to: request.body.email,
          from: "shop@node-complete.com",
          subject: "Password reset",
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `,
        });
      })
      .catch((error) => {
        const error = new Error(error);
        error.httpStatusCode = 500;
        return next(error);
      });
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
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
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
    .then(() => response.redirect("/login"))
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};
