module.exports = (request, response, next) => {
  if (!request.session.isLoggedIn) response.redirect("/login");
  next();
};
