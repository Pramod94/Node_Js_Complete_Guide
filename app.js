const mongoose = require("mongoose");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const session = require("express-session");

// Access the Database which returns the promise
// const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// secret - should be a long string value
// resave - session won't be saved for every request and response, it will be saved only when it is changed
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://pramodmithyantha:Mx0SUYUt5f9sZEcE@cluster0.dk4h42f.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB...!!!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
