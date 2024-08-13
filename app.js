const mongoose = require("mongoose");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);

// Access the Database which returns the promise
// const sequelize = require("./util/database");

const app = express();

const MongoDbURI =
  "mongodb+srv://pramodmithyantha:Mx0SUYUt5f9sZEcE@cluster0.dk4h42f.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

// Creates a new collection on the MongoDbStore to store the session values
// Here session values are stored in session collection, can be accessible using MongoDbCompass application
const store = new MongoDbStore({
  uri: MongoDbURI,
  collection: "session",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Session should be used which belongs to a particular user and that should not be shared between other users
// Ex: Shopping cart items, manging authentication - which will be unique amoung the users

// secret - should be a long string value
// resave - session won't be saved for every request and response, it will be saved only when it is changed
// store - session data will be stored in the store. i.e MongoDbStore under specified collection
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MongoDbURI)
  .then(() => {
    console.log("Connected to MongoDB...!!!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
