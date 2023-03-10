
const User= require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{ createError}= require('../utils/error')


const register= async (req,res,next)=>{
    try{
        const salt= bcrypt.genSaltSync(10);
        const hash= bcrypt.hashSync(req.body.password,salt);
    
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
};

const login= async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user) return next(createError(404,'User not found'));
    
        const isPasswordCorrect= await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect) return next(createError(400,'Wrong password or email'));
    
        const token= jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);
    
     
        const {password,isAdmin,...otherDetails}= user._doc;
    
        res
        .cookie("access_token",token,{
          httpOnly:true,  
        })
        .status(200)
        .json({...otherDetails});
    
       }catch(err){
        next(err);
       }

}



module.exports= {register,login};