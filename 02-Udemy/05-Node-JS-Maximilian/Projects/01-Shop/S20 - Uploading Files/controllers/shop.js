const path = require("path");
const fileSystem = require("fs");
const PDFDocument = require("pdfkit");

const Product = require("../models/product");
const Order = require("../models/order");

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
      const products = user.cart.items.map((item) => {
        return { quantity: item.quantity, product: { ...item.productId._doc } };
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

exports.getInvoice = (request, response, next) => {
  const orderId = request.params.orderId;
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return next(new Error("No order found."));
      }
      if (order.user.userId.toString() !== request.user._id.toString()) {
        return next(new Error("Unauthorized"));
      }
      const invoiceName = "invoice-" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);

      const pdfDoc = new PDFDocument();
      response.setHeader("Content-Type", "application/pdf");
      response.setHeader(
        "Content-Disposition",
        'inline; filename="' + invoiceName + '"'
      );
      pdfDoc.pipe(fileSystem.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text("Invoice", {
        underline: true,
      });
      pdfDoc.text("-----------------------");
      let totalPrice = 0;
      order.products.forEach((prod) => {
        totalPrice += prod.quantity * prod.product.price;
        pdfDoc
          .fontSize(14)
          .text(
            prod.product.title +
              " - " +
              prod.quantity +
              " x " +
              "$" +
              prod.product.price
          );
      });
      pdfDoc.text("---");
      pdfDoc.fontSize(20).text("Total Price: $" + totalPrice);
      pdfDoc.end();
    })
    .catch((error) => next(error));
};
