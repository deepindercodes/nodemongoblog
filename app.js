//In built and third party modules
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

//------!!Important!!--- Following module will provide the application configuration settings
const {databaseConnectionString, databaseName} = require("./applicationconfig");

//In code modules
const blogRoutes =require("./routes/blog");
const manageRoutes =require("./routes/manage");

//Creating the express app instance
const app = express();

//Setting the template engine EJS to be used
app.set('view engine', 'ejs');
app.set('views', 'views');

//Setting the middleware for body parsing
app.use(bodyParser.urlencoded({ extended: false }));

//Setting the middleware for handling static files
app.use(express.static(path.join(__dirname, 'public')));

//Applying routing configurations
app.use(blogRoutes);
app.use("/manage",manageRoutes);    //all routes of Manage , will be under the url prefix /manage


//The connection string to the MongoDB and the database name will be fetched from applicationconfig.js
//Preparing the MongoDB, connectionstring
const MONGODB_CONN = `${databaseConnectionString}/${databaseName}`;


//Connecting to MongoDB, using mongoose and on successfull connection, starting the express app
mongoose
    .connect(MONGODB_CONN)
    .then(result => {
        console.log("MongoDB connected. Starting Express App");
        app.listen(3000,(err)=>{
            console.log('Express App is running on http://localhost:3000')
        })
    })
    .catch(err => {
        console.log(`Error connecting to MongoDB. Following are the error details:`);
        console.log(err);
    });