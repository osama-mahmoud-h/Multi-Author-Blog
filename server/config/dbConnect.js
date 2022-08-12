const mongoose = require('mongoose');

//BD_CLOUD_URI
//BD_LOCAL_URI
const connectDB = ()=>{
    mongoose.connect(process.env.BD_LOCAL_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
   }).then(succ=>console.log("mongodb Connected succefully"))
   .catch(err=>console.log(err.message));
 }
 
 module.exports = connectDB;
