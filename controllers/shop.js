const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getAllCartItems((cartItems) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartItems,
    });
  });
};

exports.postCart = (req, res, next) => {
  console.log("productId", req.body.productId);
  const prodId = req.body.productId;

  // Fetched the specific product based on Id and passing it to Cart model method
  Product.fetchSpecificProduct(prodId, (product) => {
    console.log("Product", product);
    Cart.updateCartProduct(product, (cartList) => {
      console.log("------cartList----", cartList);
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartList,
      });
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getSpecificProduct = (req, res, next) => {
  // in req, params object will have the productId which we used in dynamic routing
  const productId = req.params.productId;
  console.log(productId);
  Product.fetchSpecificProduct(productId, (foundProduct) => {
    console.log("---------Product----------", foundProduct);

    // Once we found the proudct with dynamic id, we will be
    // redirecting to "product-detail" view page with the product info
    res.render("shop/product-detail", {
      product: foundProduct,
      pageTitle: foundProduct.title,
      path: "/products",
    });
  });
};
