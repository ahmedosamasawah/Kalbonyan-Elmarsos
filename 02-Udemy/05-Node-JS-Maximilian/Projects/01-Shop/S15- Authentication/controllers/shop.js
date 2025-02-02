const Order = require("../models/order");
const Product = require("../models/product");

exports.getProducts = (request, response, next) => {
  Product.find()
    .then((products) =>
      response.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
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
      })
    )
    .catch((error) => console.log(error));
};

exports.getCart = (request, response, next) => {
  console.log(request.user);
  request.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      response.render("shop/cart", {
        path: "/cart",
        products: products,
        pageTitle: "Your Cart",
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
    .then(() => response.redirect("/cart"))
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
    .then(() => request.user.clearCart())
    .then(() => response.redirect("/orders"))
    .catch((error) => console.log(error));
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
    .catch((error) => console.log(error));
};
