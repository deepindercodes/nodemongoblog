const Tokens = require("csrf");
const csrfTokens = new Tokens();

const genCsrfToken = (req, res) => {
  const csrfSecret = csrfTokens.secretSync();
  req.session.csrfSecret = csrfSecret;
  const csrfToken = csrfTokens.create(csrfSecret);
  req.session.save();
  res.locals.atFtk = csrfToken;
};

module.exports = (req, res, next) => {
  if (req.method === "GET") {
    genCsrfToken(req, res);
  }

  if (req.method === "POST") {
    const isValidRequest = csrfTokens.verify(
      req.session.csrfSecret,
      req.body.atFtk,
    );

    if (!isValidRequest) {
      return res.redirect("/");
    } else {
      genCsrfToken(req, res);
    }
  }

  next();
};
