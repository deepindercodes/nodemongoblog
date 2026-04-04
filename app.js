const express = require("express");
const app = express();

app.get("/",(req,res,next)=>{
    res.status(200).send("Coming soon..");
})

app.listen(3000,(err)=>{
    console.log('Server is running on http://localhost:3000')
})