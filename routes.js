const fs = require("fs");

const requestHandler = (req, res) => {
  console.log(
    "Request URL---",
    req.url,
    "Method---",
    req.method,
    "Headers----",
    req.headers
  );

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Form</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    // Looking for data from the request, it will be in the form of chunks that needs to be parsed
    req.on("data", (chunk) => {
      console.log("Incoming chunk data---", chunk);
      body.push(chunk);
    });

    // Second argument is a callback function and it will not be executed immediately
    // At first it will be registered
    return req.on("end", () => {
      // Buffer is a global object used to parse the stroed chunk
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      // Writes the data to the file in asyn way
      //fs.writeFileSync("Message", message);

      fs.writeFile("Message", message, (err) => {
        // fs.writeFileSync("Message", "Dummy");
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  // setting the header
  res.setHeader("Content-Type", "text/html");
  // returning the response for the UI
  res.write("<html>");
  res.write("<head><title>Title : Node.js</title></head>");
  res.write("<body>Hello from Node.js response object</body>");
  res.write("</html>");
  res.end();

  // Helps to quite the server
  // process.exit();
};

module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: "Some text",
// };

// exports.handler = requestHandler;
