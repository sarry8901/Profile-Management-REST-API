const express= require('express');
const {verifyAdmin}= require('../utils/verifyToken');
const adminRouter= express.Router();
const {adduser,updateuser,getuser,getusers}= require('../controllers/admins');


// ADD ADMIN/user
adminRouter.post('/adduser',verifyAdmin,adduser)

//  UPDATE Admin/user
adminRouter.put('/updateuser/:id',verifyAdmin,updateuser)

// GET USER/admin
adminRouter.get('/getuser/:id',verifyAdmin,getuser)

//GET USERS
adminRouter.get('/getusers',verifyAdmin,getusers)





module.exports={adminRouter};

