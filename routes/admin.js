const express = require("express");
const fs = require("fs");
const path = require("path");

// Routes is used to specify the different routes
const routes = express.Router();

const rootDir = require("../utils/path");

// route will be evaluated to /admin/add-product => GET
routes.get("/add-product", (req, res, next) => {
  console.log("From the path '/add-product'");

  // Looks for the file in the rootDir
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// We can have the same route path with different http method. i.e get, post etc
routes.post("/add-product", (req, res, next) => {
  console.log(req.body);
  fs.writeFileSync("Book", req.body.title);
  res.redirect("/");
});

module.exports = routes;
