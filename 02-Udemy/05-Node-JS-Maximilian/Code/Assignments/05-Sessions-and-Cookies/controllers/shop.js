const Order = require("../models/order");
const Product = require("../models/product");

exports.getProducts = (request, response, next) => {
  Product.find()
    .then((products) =>
      response.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: request.session.isLoggedIn,
      })
    )
    .catch((error) => console.log(error));
};

exports.getProduct = (request, response, next) => {
  const prodId = request.params.productId;
  Product.findById(prodId).then((product) =>
    response.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
      isAuthenticated: request.session.isLoggedIn,
    })
  );
};

exports.getIndex = (request, response, next) => {
  Product.find()
    .then((products) =>
      response.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: request.session.isLoggedIn,
      })
    )
    .catch((error) => console.log(error));
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
        isAuthenticated: request.session.isLoggedIn,
      });
    })
    .catch((error) => console.log(error));
};

exports.postCart = (request, response, next) => {
  const prodId = request.body.productId;
  Product.findById(prodId)
    .then((product) => request.user.addToCart(product))
    .then(() => response.redirect("/cart"))
    .catch((error) => console.log(error));
};

exports.postCartDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  request.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      response.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.postOrder = (request, response, next) => {
  request.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;

      const order = new Order({
        user: {
          name: request.user.name,
          userId: request.user,
        },
        products: products.map((item) => {
          return {
            quantity: item.quantity,
            productId: { ...item.productId._doc },
          };
        }),
      });
      response.redirect("/orders");
      return order.save();
    })
    .then((result) => {
      return request.user.clearCart();
    })
    .then(() => {
      response.redirect("/orders");
    })
    .catch((error) => console.log(error));
};

exports.getOrders = (request, response, next) => {
  Order.find({ "user.userId": request.user._id })
    .then((orders) => {
      response.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: request.session.isLoggedIn,
      });
    })
    .catch((error) => console.log(error));
};
