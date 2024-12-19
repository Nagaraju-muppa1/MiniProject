require('dotenv').config()
const express=require('express');
const path = require('path');

const db = require("./database/db");
const session=require('express-session')
const app=express();
const port=process.env.PORT|| 8000
app.use(express.json());

app.set("viewengine","ejs");

app.use(express.static(path.join(__dirname, 'public')));


//app.set('views', './views');
app.use("",require('./Routes/user'))
app.use("/api",require('./Routes/signroute'))

app.listen(port,(req,res)=>{
    console.log(`Server running at http://localhost:${port}/`)
})

