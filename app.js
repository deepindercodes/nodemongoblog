const express = require("express");
const app = express();
const blogRoutes =require("./routes/blog");
const manageRoutes =require("./routes/manage");

//Setting the template engine EJS to be used
app.set('view engine', 'ejs');
app.set('views', 'views');

//Applying routing configurations
app.use(blogRoutes);
app.use("/manage",manageRoutes);    //all routes of Manage , will be under the url prefix /manage

app.listen(3000,(err)=>{
    console.log('Server is running on http://localhost:3000')
})