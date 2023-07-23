const path = require("path");
const fileSystem = require("fs");
const PDFDocument = require("pdfkit");
const Order = require("../models/order");
const Product = require("../models/product");

const ITEMS_PER_PAGE = 2;

exports.getProducts = (request, response, next) => {
  const page = +request.query.page || 1;
  let totalItems;

  Product.find()
    .countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      response.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
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
  const page = +request.query.page || 1;
  let totalItems;

  Product.find()
    .countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      response.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
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
      if (!order) return next(new Error("No order found."));

      if (order.user.userId.toString() !== request.user._id.toString())
        return next(new Error("Unauthorized"));

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
