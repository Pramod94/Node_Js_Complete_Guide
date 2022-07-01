const express = require("express");
const fs = require("fs");

// Routes is used to specify the different routes
const routes = express.Router();

// route will be evaluated to /admin/add-product => GET
routes.get("/add-product", (req, res, next) => {
  console.log("From the path '/add-product'");
  res.send(
    '<form action="/admin/add-product" method="POST"><input type="text" name="title" /><button type="submit">Add Product</button></form>'
  );
});

// We can have the same route path with different http method. i.e get, post etc
routes.post("/add-product", (req, res, next) => {
  console.log(req.body);
  fs.writeFileSync("Book", req.body.title);
  res.redirect("/");
});

module.exports = routes;
