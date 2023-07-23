const express = require("express");

const app = express();

app.use("/users", (request, response, next) => {
  response.send("<h1>The Users Page</h1>");
});

app.use("/", (request, response, next) => {
  response.send("<h1>The Main Page</h1>");
});

app.listen(3000);
