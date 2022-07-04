const express = require("express");

// Routes is used to specify the different routes
const shopRoutes = express.Router();

const adminData = require("../routes/admin");

shopRoutes.get("/", (req, res, next) => {
  console.log("From the path '/'");

  console.log("Books---------", adminData.products);

  // render method will look for the Template engine
  // Then it will look for the file name specific to the template. here shop.pug
  // We can pass additional data as an object
  res.render("shop", {
    prods: adminData.products,
    docTitle: "Shop Page",
  });
});

module.exports = shopRoutes;
