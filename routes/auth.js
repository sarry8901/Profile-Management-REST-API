const express= require('express');
const authRouter= express.Router();
const {register,login} = require('../controllers/auths');

// REGISTER ROUTE
authRouter.post('/register',register);

// LOGIN ROUTE
authRouter.post('/login',login);




module.exports= {authRouter};
