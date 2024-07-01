const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

// Access the Database which returns the promise
const db = require("./util/database");

// Executing the SQL query to access the data from DB
db.execute("SELECT * FROM products")
  .then((res) => console.log("res----------", res[0]))
  .catch((err) => console.log("err-----", err));

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
