const path = require("path");
const express = require("express");

const mainRoutes = require("./routes/index");

const app = express();

app.use(mainRoutes);
app.use(express.static(path.join(__dirname, "Public")));

app.listen(3000);
