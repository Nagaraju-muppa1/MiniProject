const express=require('express');
const route=express.Router();

route.get('/',(req,res)=>{
    res.render("home.ejs")
})
route.get('/signin',(req,res)=>{
    res.render("signin.ejs");
})
route.get('/home',(req,res)=>{
    res.render('home.ejs');
})

module.exports=route;