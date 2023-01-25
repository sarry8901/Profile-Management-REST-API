const jwt= require('jsonwebtoken');
const {createError}= require('./error')

// function to check if token is correct or not
const verifyToken= (req,res,next)=>{
    const token= req.cookies.access_token;
    if(!token){
        return next(createError(401,'You are not authenticated'));
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) next(createError(401,'Token is not valid'));
        req.user= user;
        next();
    });

}
// function to check if token is for the authenticated user or not
const verifyUser= (req,res,next)=>{
   verifyToken(req,res,next,()=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
        next();
    }
    else{
        return  next(createError(403,'You are not authorized'));
        
    }
   })
}

// function to check if user is authenticated and is admin or not 
const verifyAdmin= (req,res,next)=>{
   verifyToken(req,res,next,()=>{
    if( req.user.isAdmin){
        next();
    }
    else{
        return  next(createError(403,'You are not authorized'));
        
    }
   })
}

module.exports= {verifyToken,verifyUser,verifyAdmin};