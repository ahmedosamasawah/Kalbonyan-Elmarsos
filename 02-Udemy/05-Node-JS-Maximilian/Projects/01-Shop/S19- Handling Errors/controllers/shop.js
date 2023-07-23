const Order = require("../models/order");
const Product = require("../models/product");

exports.getProducts = (request, response, next) => {
  Product.find()
    .then((products) => {
      response.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (request, response, next) => {
  const prodId = request.params.productId;
  Product.findById(prodId)
    .then((product) => {
      response.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (request, response, next) => {
  Product.find()
    .then((products) => {
      response.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (request, response, next) => {
  request.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      response.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (request, response, next) => {
  const prodId = request.body.productId;
  Product.findById(prodId)
    .then((product) => request.user.addToCart(product))
    .then(() => response.redirect("/cart"))
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCartDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  request.user
    .removeFromCart(prodId)
    .then(() => response.redirect("/cart"))
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (request, response, next) => {
  request.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: request.user.email,
          userId: request.user,
        },
        products: products,
      });
      return order.save();
    })
    .then(() => request.user.clearCart())
    .then(() => response.redirect("/orders"))
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (request, response, next) => {
  Order.find({ "user.userId": request.user._id })
    .then((orders) => {
      response.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((error) => {
      const error = new Error(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};
