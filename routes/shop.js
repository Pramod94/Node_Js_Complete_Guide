const express = require("express");

// Routes is used to specify the different routes
const shopRoutes = express.Router();

const adminData = require("../routes/admin");

shopRoutes.get("/", (req, res, next) => {
  console.log("From the path '/'");

  console.log("Books---------", adminData.products);

  // render method will look for the Template engine
  // Then it will look for the file name specific to the template. here shopEjs.ejs
  // We can pass additional data as an object
  res.render("shopEjs", {
    prods: adminData.products,
    docTitle: "Shop Page...!!!",
    description: "No products found...!!! Add product to see the list.",
  });
});

module.exports = shopRoutes;

/**
 * EJS - Syntax
 *
 * <%= evaluates the content inside %>
 *
 * <% we can write javascript syntax inside this %>
 */
