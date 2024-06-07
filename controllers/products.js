const fs = require("fs");

const products = [];

exports.getAddProduct = (req, res, next) => {
  console.log("From the path '/add-product'");

  res.render("addProduct.ejs", {
    pageTitle: "Add Product",
    btnName: "Add Product",
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  fs.writeFileSync("Book", req.body.title);

  // Pushing the data to array and then exporting it, so that it can be accessed in other files
  products.push({ title: req.body.title });

  res.redirect("/");
};

exports.listProducts = (req, res, next) => {
  // render method will look for the Template engine
  // Then it will look for the file name specific to the template. here shopEjs.ejs
  // We can pass additional data as an object
  res.render("shopEjs", {
    prods: products,
    docTitle: "Shop Page...!!!",
    description: "No products found...!!! Add product to see the list.",
  });
};
