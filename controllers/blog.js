exports.getIndexPage = (req,res,next) =>{
    res.render("blog/index" ,{
        pageTitle:"Welcome to NodeMongoBlog"
    });
}