const express = require("express");

// Routes is used to specify the different routes
const shopRoutes = express.Router();

shopRoutes.get("/", (req, res, next) => {
  console.log("From the path '/'");
  res.send('<h1>From the Next js on path "/"</h1>');
});

module.exports = shopRoutes;
