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
  const imageUrl = request.body.imageUrl;
  const price = request.body.price;
  const description = request.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: request.user,
  });
  product
    .save()
    .then(() => response.redirect("/admin/products"))
    .catch((error) => console.log(error));
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
      });
    })
    .catch((error) => console.log(error));
};

exports.postEditProduct = (request, response, next) => {
  const prodId = request.body.productId;
  const updatedTitle = request.body.title;
  const updatedPrice = request.body.price;
  const updatedImageUrl = request.body.imageUrl;
  const updatedDesc = request.body.description;

  Product.findById(prodId)
    .then((product) => {
      product.userId.toString() !== request.user._id.toString() &&
        response.redirect("/");

      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save().then(() => response.redirect("/admin/products"));
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (request, response, next) => {
  Product.find({ userId: request.user._id })
    .then((products) => {
      response.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  Product.deleteOne({ _id: prodId, userId: request.user._id })
    .then(() => response.redirect("/admin/products"))
    .catch((error) => console.log(error));
};
