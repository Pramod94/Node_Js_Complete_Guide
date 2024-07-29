const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const mongoConnect = require("./util/database_mongodb").mongoConnect;

// Access the Database which returns the promise
// const sequelize = require("./util/database");

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

// This sync() will search for all the models defined with sequelize
// and creates appropriate table on the DB
// sequelize
//   .sync()
//   .then((result) => {
//     // console.log("result---", result);
//     app.listen(3000);
//   })
//   .catch((err) => console.log(err));

mongoConnect(() => {
  app.listen(3000);
});
