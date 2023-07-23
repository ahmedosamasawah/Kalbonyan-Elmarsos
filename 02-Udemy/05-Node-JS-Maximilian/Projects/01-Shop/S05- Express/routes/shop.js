const express = require("express");
const adminRoutes = require("./admin");

const router = express.Router();

router.get("/", (request, response, next) => {
  const productsInShopFile = adminRoutes.products;
  response.render("shop", {
    products: productsInShopFile,
    pageTitle: "My Shop",
    path: "/",
    hasProducts: productsInShopFile.length > 0,
    productCSS: true,
    activeShop: true,
  });
});

module.exports = router;
