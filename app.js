// Here we are importing the module called 'http'
const http = require("http");

const express = require("express");

const app = express();

// request will be handled in a sequence by "use"

// "use" will look for every request
app.use((req, res, next) => {
  console.log("From the middleware...!");
  next(); // next will allow to execute the subsequent "use" call
});

// This will be executed only if we specify the next in previous "use" call
app.use((req, res, next) => {
  console.log("From the another middleware...!!!");
  res.send("<h1>Hello from Express js...!!!</h1>");
});

// http module has a method to create a server
// createServer will accept a function with request and response
const server = http.createServer(app);

// To start the server we need to specify the port
server.listen(8080);
