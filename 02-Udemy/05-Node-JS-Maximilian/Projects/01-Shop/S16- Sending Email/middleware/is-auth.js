module.exports = (req, res, next) => {
  !req.session.isLoggedIn && res.redirect("/login");
  next();
};
