
const User= require('../models/User')
const bcrypt = require('bcrypt');


//function to adduser
const adduser=async (req,res,next)=>{
    try{
        const salt= bcrypt.genSaltSync(10);
        const hash= bcrypt.hashSync(req.body.password,salt);
    
         const newUser= new User({
            fName: req.body.fName,
            mName: req.body.mName,
            lName: req.body.lName,
            email: req.body.email,
            isAdmin:req.body.isAdmin,
            password: hash,
            department: req.body.department
           


        })
        await newUser.save();
        res.status(200).send("User has been created")
       }catch(err){
        next(err);
       }
}

//function to update a user
const updateuser=async (req,res,next)=>{
    try{
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedUser);
      }catch(err){
        next(err);
      }
}

//function to get a user
const getuser=async (req,res,next)=>{
    try{
        const user= await User.findById(req.params.id);
        res.status(200).json(user);
      }catch(err){
        next(err);
      }

}

//function to get all users
const getusers=async (req,res,next)=>{
    try{
        const users= await User.find();
        res.status(200).json(users);
      }catch(err){
        next(err);
      }

}



module.exports={adduser,updateuser,getuser,getusers};