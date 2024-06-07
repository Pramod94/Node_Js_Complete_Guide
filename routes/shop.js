const express = require("express");

// Routes is used to specify the different routes
const router = express.Router();

const productControler = require("../controllers/products");

router.get("/", productControler.listProducts);

module.exports = router;

/**
 * EJS - Syntax
 *
 * <%= evaluates the content inside %>
 *
 * <% we can write javascript syntax inside this %>
 */
