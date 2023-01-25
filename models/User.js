const mongoose= require('mongoose')
// creating user schema as told in the assignment
const UserSchema= new mongoose.Schema({
    fName:{
        type:String,
        required:true,
        
    },
    mName:{
        type:String,
        
    },
    lName:{
        
        type:String,
        required:true
    },
   
    email:{
        
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    department:{
        type:String,
    }
    
},{timestamps:true});
const User= mongoose.model('User',UserSchema);
module.exports= User;