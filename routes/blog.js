const Router = require("express").Router;
const blogController = require("../controllers/blog");

const blogRoutes = new Router();

//Index page of the website
blogRoutes.get("/",blogController.getIndexPage);


module.exports = blogRoutes;