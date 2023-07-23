const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
// const expressHbs = require("express-handlebars");

const app = express();

// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "Public")));

app.use("/admin", adminRoutes.router);

app.use(shopRoutes);

app.use((request, response, next) => {
  response.status(404).render("404", { pageTitle: "Page Not Found!" });
});

app.listen(3000);
