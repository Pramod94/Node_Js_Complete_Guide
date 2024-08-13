// Note : Cookies are stored on the Client side and Sessions are stored on the server side

const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // This way we can access the Cookie sent by all API's
  console.log("Cookie", req.get("Cookie"));
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // This will set the cookie "isLoggedIn=true", which can be tested in the browser (Application -> Cookie)
  // IMP - This cookie will be attached to the every request sent by the browser. This can be checked in
  // the request header of all the incoming request i.e all API from the browser to the server
  res.setHeader("Set-Cookie", "isLoggedIn=true");

  // Session will be stored on the server
  // This will set a session, we can check on Application -> Cookie -> connect.sid
  // In here session will be stored on the memory, Ideally we should store it on the DB
  req.session.loggedIn = true;

  res.redirect("/");
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  // checking whether the user exists with the provided email or not
  User.findOne({ email: email })
    .then((userDoc) => {
      // if user exists we are redirecting the user to login page
      if (userDoc) {
        return res.redirect("/signup");
      }

      // bcrypt.hash() will generate the hashed password. So that no one can decrypt it back.
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            // Here we are storing the hashed password on the db
            password: hashedPassword,
            cart: { items: [] },
          });
          // this returns the promise, so we can chain one more then after this then
          return user.save();
        })
        .then(() => {
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  // destory() will delete the session created
  req.session.destroy((err) => {
    console.log("Session destroyed...!!!");
    console.log(err);
    res.redirect("/");
  });
};
