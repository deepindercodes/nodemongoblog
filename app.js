//In built and third party modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//------!!Important!!--- Following module will provide the application configuration settings
const {
  databaseConnectionString,
  databaseName,
  sessionSecret,
} = require("./applicationconfig");

//The connection string to the MongoDB and the database name will be fetched from applicationconfig.js
//Preparing the MongoDB, connectionstring
const MONGODB_CONN = `${databaseConnectionString}/${databaseName}`;

//In code modules
const blogRoutes = require("./routes/blog");
const manageRoutes = require("./routes/manage");

//Creating the express app instance
const app = express();

//Setting the template engine EJS to be used
app.set("view engine", "ejs");
app.set("views", "views");

//Setting the middleware for body parsing
app.use(bodyParser.urlencoded({ extended: false }));

//Setting the middleware for handling static files
app.use(express.static(path.join(__dirname, "public")));

//Using MongoDb as Session store
const sessionStoreMongDb = new MongoDBStore({
  uri: MONGODB_CONN,
  collection: "usersessions",
});

//Express session will use the sessionSecret from applicationconfig
//Setting the maxAge of the server Session cookie to 20 mins
//Setting resave and saveUninitialized to false, in order to avoid race around conditions and server loads
const sessionSettings = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: sessionStoreMongDb,
};

//Setting the middleware for express session
//Express session will be stored in memory
app.use(session(sessionSettings));

//Applying routing configurations
app.use(blogRoutes);
app.use("/manage", manageRoutes); //all routes of Manage , will be under the url prefix /manage

//Connecting to MongoDB, using mongoose and on successfull connection, starting the express app
mongoose
  .connect(MONGODB_CONN)
  .then((result) => {
    console.log("MongoDB connected. Starting Express App");
    app.listen(3000, (err) => {
      console.log("Express App is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log(
      `Error connecting to MongoDB. Following are the error details:`,
    );
    console.log(err);
  });
