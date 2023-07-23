module.exports = (request, response, next) => {
  !request.session.isLoggedIn && response.redirect("/login");
  next();
};
