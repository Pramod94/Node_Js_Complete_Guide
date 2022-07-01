const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// This module is required to parse the incoming data
const bodyParser = require("body-parser");

const app = express();

// This will helps to parse the incoming response body
app.use(bodyParser.urlencoded({ extended: false }));

// Base route will be "/admin" for all the routes mentioned in the adminRoutes
app.use("/admin", adminRoutes);

// This will executes the shop route
app.use(shopRoutes);

// This will be executed for all the request types
// Since it will look for the default route '/'
// So this can be used to handle error response for invalid route requests
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found...!!!</h1>");
});

app.listen(8080);
