const express = require("express");
const path = require("path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./utils/path");

// This module is required to parse the incoming data
const bodyParser = require("body-parser");

const app = express();

// Setting the Template engine as ejs
app.set("view engine", "ejs");

// Specifying the "views" as the folder name to find the views for the Template engine
app.set("views", "views");

// This will helps to parse the incoming response body
app.use(bodyParser.urlencoded({ extended: false }));

// Base route will be "/admin" for all the routes mentioned in the adminData
app.use("/admin", adminData.routes);

// This will executes the shop route
app.use(shopRoutes);

// This will be executed for all the request types
// Since it will look for the default route '/'
// So this can be used to handle error response for invalid route requests
app.use((req, res, next) => {
  res.render("404", {
    pageTitle: "Page Not Found...!!!",
  });
});

app.listen(8080);
