const express= require('express');
const app= express();
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const {authRouter}= require('./routes/auth');
const {userRouter}= require('./routes/user');
const {adminRouter}= require('./routes/admin');
const cookieParser = require("cookie-parser");
dotenv.config()
const PORT= process.env.PORT || 8000;

//  connecting to database using mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log(err);
})
mongoose.connection.on("disconnected",()=>{
    console.log('db disconnected');
})


// middlewares
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/admin',adminRouter);
app.use((err,req,res,next)=>{
    const errStatus= err.status || 500;
    const errMessage= err.message || 
    'something went wrong';
 
     return res.status(errStatus).json({
         success:false,
         status:errStatus,
         message:errMessage,
         stack:err.stack,
     });
 })


// listening on port
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})