const express = require("express");

// Routes is used to specify the different routes
const router = express.Router();

const productControler = require("../controllers/products");

// route will be evaluated to /admin/add-product => GET
router.get("/add-product", productControler.getAddProduct);

// We can have the same route path with different http method. i.e get, post etc
router.post("/add-product", productControler.postAddProduct);

module.exports = router;
