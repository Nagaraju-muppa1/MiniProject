const express = require('express');
const router = express.Router();
const { signup, signin} = require('../Controllers/usercontroller.js');
const {validateSignUpRequest,validateSignInRequest, isRequestCorrect}= require('../Validator/auth.validate.js');
/*
 route / signup
  @param
   fullname
   email
   password
   username
   contactname
    new userModel({
         password --> correct
         hash_password --> wrong 
   })
   auth.controller.js
     signupUser
        password =bcrypt.hashSync

        new userModel({hash_password :password})



*/

router.post('/sign', validateSignUpRequest, isRequestCorrect, signup);
router.post('/signin',validateSignInRequest,isRequestCorrect,signin);
module.exports = router; // Directly export the router






// Placeholder for signin route
/*router.post('/signin', (req, res) => {
    res.send('Signin route');
});*/
