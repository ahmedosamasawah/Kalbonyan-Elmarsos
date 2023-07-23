const express = require("express");

const router = express.Router();
const products = [];

router.get("/add-product", (request, response, next) => {
  response.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    productCSS: true,
    formsCSS: true,
    activeAddProduct: true,
  });
});

router.post("/add-product", (request, response, next) => {
  products.push({ title: request.body.title });
  response.redirect("/");
});

exports.router = router;
exports.products = products;
