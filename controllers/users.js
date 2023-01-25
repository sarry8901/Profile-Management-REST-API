
const User= require('../models/User')
const bcrypt = require('bcrypt');
const{ createError}= require('../utils/error')


// function to add a user
const adduser=async (req,res,next)=>{
    try{
        const salt= bcrypt.genSaltSync(10);
        const hash= bcrypt.hashSync(req.body.password,salt);
        if(req.body.isAdmin){
          return  next(createError(400,"User cannot create admin"));
        }
         const newUser= new User({
            fName: req.body.fName,
            mName: req.body.mName,
            lName: req.body.lName,
            email: req.body.email,
            password: hash,
            department: req.body.department
           


        })
        await newUser.save();
        res.status(200).send("User has been created")
       }catch(err){
        next(err);
       }
}

// function to update a user
const updateuser=async (req,res,next)=>{
    try{
        const getUser= await User.findById(req.params.id);
        if(getUser.isAdmin){
            return  next(createError(400,"User cannot update admin"));
          }
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedUser);
      }catch(err){
        next(err);
      }
}

// function to get a user
const getuser=async (req,res,next)=>{
    try{
        const user= await User.findById(req.params.id);
        if(req.body.isAdmin){
            return  next(createError(400,"User cannot update admin"));
          }
        res.status(200).json(user);
      }catch(err){
        next(err);
      }
}

// function to get all users
const getusers=async (req,res,next)=>{
    try{
        const users= await User.find({isAdmin:false});
        res.status(200).json(users);
      }catch(err){
        next(err);
      }
}



module.exports={adduser,updateuser,getuser,getusers};