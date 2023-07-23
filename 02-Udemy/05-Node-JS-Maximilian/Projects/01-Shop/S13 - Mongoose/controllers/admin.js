const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
  response.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: request.session.isLoggedIn,
  });
};

exports.postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const price = request.body.price;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description;
  const product = new Product({
    title,
    price,
    imageUrl,
    description,
    userId: request.user,
  });
  product
    .save()
    .then(() => {
      console.log("POSTED PRODUCT!");
      response.redirect("/admin/products");
    })
    .catch((error) => console.log("FAILED", error));
};

exports.getEditProduct = (request, response, next) => {
  const editMode = request.query.edit;
  !editMode && response.redirect("/");
  const prodId = request.params.productId;
  Product.findById(prodId)
    .then((product) => {
      !product && response.redirect("/");
      response.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated: request.session.isLoggedIn,
      });
    })
    .catch((error) => console.log(error));
};

exports.postEditProduct = (request, response, next) => {
  const updatedTitle = request.body.title;
  const updatedPrice = request.body.price;
  const updatedImageUrl = request.body.imageUrl;
  const updatedDesc = request.body.description;
  const prodId = request.body.productId;
  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;

      return product.save();
    })
    .then(() => response.redirect("/admin/products"))
    .catch((error) => console.log(error));
};

exports.getProducts = (request, response, next) => {
  Product.find()
    .then((products) =>
      response.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: request.session.isLoggedIn,
      })
    )
    .catch((error) => console.log(error));
};

exports.postDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  Product.findByIdAndDelete(prodId)
    .then(() => {
      console.log("DELETED PRODUCT!");
      response.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};
