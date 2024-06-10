const fs = require("fs");
const Product = require("../models/product");

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

  // Created a new instance of Product and passing the title value to it
  const products = new Product(req.body.title);

  // Calling the save method of Product instance to save the data
  products.save();

  res.redirect("/");
};

exports.listProducts = (req, res, next) => {
  // render method will look for the Template engine
  // Then it will look for the file name specific to the template. here shopEjs.ejs
  // We can pass additional data as an object

  // Here we store the 'Product' class not its instance
  Product.fetchAll((product) =>
    res.render("shopEjs", {
      // Accessing the static method of class (which is not of the Product class instance)
      prods: product,
      docTitle: "Shop Page...!!!",
      description: "No products found...!!! Add product to see the list.",
    })
  );
};
