const express = require("express");
const fs = require("fs");

// This module is required to parse the incoming data
const bodyParser = require("body-parser");

const app = express();

// This will helps to parse the incoming response body
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  console.log("From the path '/add-product'");
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Add Product</button></form>'
  );
});

// To restrict the Usage of api end point only to GET, POST, PUT or DELETE requests
// We can make use of app.get(), app.post(), app.put() or app.delete() instead of app.use()
app.post("/product", (req, res, next) => {
  console.log(req.body);
  fs.writeFileSync("Book", req.body.title);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("From the path '/'");
  res.send('<h1>From the Next js on path "/"</h1>');
});

app.listen(8080);
