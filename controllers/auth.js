// Note : Cookies are stored on the Client side and Sessions are stored on the server side

exports.getLogin = (req, res, next) => {
  // This way we can access the Cookie sent by all API's
  console.log("Cookie", req.get("Cookie"));
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.isLoggedIn,
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
