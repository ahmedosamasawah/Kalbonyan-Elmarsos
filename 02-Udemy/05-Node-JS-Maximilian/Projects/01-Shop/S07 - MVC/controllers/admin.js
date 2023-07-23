const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
  response.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const imgUrl = request.body.imgUrl;
  const price = request.body.price;
  const description = request.body.description;
  const product = new Product(null, title, imgUrl, description, price);
  product.save();
  response.redirect("/");
};

exports.getEditProduct = (request, response, next) => {
  const editMode = request.query.edit;
  !editMode && response.redirect("/");
  const productId = request.params.productId;
  Product.findById(productId, (product) => {
    !product && response.redirect("/");

    response.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
    });
  });
};

exports.postEditProduct = (request, response, next) => {
  const productId = request.body.productId;
  const updatedTitle = request.body.title;
  const updatedPrice = request.body.price;
  const updatedimgUrl = request.body.imgUrl;
  const updatedDescription = request.body.description;
  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedimgUrl,
    updatedDescription,
    updatedPrice
  );
  updatedProduct.save();
  response.redirect("/admin/products");
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (request, response, next) => {
  const productId = request.body.productId;
  Product.deleteById(productId);
  response.redirect("/admin/products");
};
