const express = require("express");
const path = require("path");

// Routes is used to specify the different routes
const shopRoutes = express.Router();

const rootDir = require("../utils/path");

shopRoutes.get("/", (req, res, next) => {
  console.log("From the path '/'");

  // If we specify the path like this, it will look for the file in the OS with the below path.
  // So it doesn't work
  // res.sendFile("/views/shop.html");

  // Looks for the file in the rootDir
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = shopRoutes;
