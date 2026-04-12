const Router = require("express").Router;
const blogController = require("../controllers/blog");

const blogRoutes = new Router();

//Index page of the website
blogRoutes.get("/",blogController.getIndexPage);

//Login page GET route
blogRoutes.get("/login", blogController.getLogin);


//SignUp page GET route
blogRoutes.get("/signup", blogController.getSignup);


module.exports = blogRoutes;