const Tokens = require("csrf");
var csrfTokens = new Tokens();

exports.getIndexPage = (req, res, next) => {
  res.render("blog/index", {
    pageTitle: "Welcome to NodeMongoBlog",
    path: "/",
  });
};

exports.getLogin = (req, res, next) => {
  res.render("blog/login", {
    pageTitle: "Login to NodeMongoBlog",
    path: "/login",
  });
};

exports.getSignup = (req, res, next) => {
  const csrfSecret = csrfTokens.secretSync();
  req.session.userSignUpStatus = "start";
  req.session.csrfSecret = csrfSecret;
  const csrfToken = csrfTokens.create(csrfSecret);
  return req.session.save((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.render("blog/signup", {
      pageTitle: "Signup to NodeMongoBlog",
      path: "/signup",
      atFtk: csrfToken,
    });
  });
};

exports.postSignup = (req, res, next) => {
  const isValidRequest = csrfTokens.verify(
    req.session.csrfSecret,
    req.body.atFtk,
  );
  if (!isValidRequest) {
    return res.redirect("/");
  }
  res.render("blog/signup", {
    pageTitle: "Signup to NodeMongoBlog",
    path: "/signup",
    atFtk: "",
  });
};
