exports.getIndexPage = (req,res,next) =>{
    res.render("blog/index" ,{
        pageTitle:"Welcome to NodeMongoBlog",
        path: "/"
    });
}

exports.getLogin = (req, res, next) => {
    res.render("blog/login" ,{
        pageTitle:"Login to NodeMongoBlog",
        path: "/login"
    });
}

exports.getSignup = (req, res, next) => {
    res.render("blog/signup" ,{
        pageTitle:"Signup to NodeMongoBlog",
        path: "/signup"
    });
}