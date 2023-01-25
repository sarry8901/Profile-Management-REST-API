const express= require('express');
const {verifyUser}= require('../utils/verifyToken');
const userRouter= express.Router();
const {adduser,updateuser, getuser,getusers}= require('../controllers/users');
// userRouter.get('/',verifyToken,async(req,res,next)=>{
//     res.send('you are logged in ')
// })
// userRouter.get('/check/:id',verifyUser,async(req,res,next)=>{
//     res.send('you are logged in and access your account ')
// })
// userRouter.get('/checkAdmin/:id',verifyUser,async(req,res,next)=>{
//     res.send('you are logged in and access all accounts ')
// })

// ADD USER
userRouter.post('/adduser',verifyUser,adduser);

//  UPDATE USER
userRouter.put('/updateuser/:id',verifyUser,updateuser);

// GET USER
userRouter.get('/getuser/:id',verifyUser,getuser)

//GET USERS
userRouter.get('/getusers',verifyUser,getusers)





module.exports={userRouter};

