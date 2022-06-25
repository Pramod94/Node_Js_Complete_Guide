// Here we are importing the module called 'http'
const http = require("http");

const routes = require("./routes");

// http module has a method to create a server
// createServer will accept a function with request and response
const server = http.createServer(routes);

// To start the server we need to specify the port
server.listen(8080);
