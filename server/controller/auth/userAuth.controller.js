
const ErrorResponse = require('../../utils/ErrorResponse');
const User = require('../../model/User');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const uploadfile = require('../../utils/fileUploader');

exports.userLoign = async(req,res,next)=>{
    try {
        const{
            email,
            password
        } = req.body;
        if(!email){
            throw new ErrorResponse('you should provide email')
        }
        if(!password){
            throw new ErrorResponse('you should provide password')
        }

        const user = await User.findOne({email:email}).select('+password');
        if(!user){
            throw new ErrorResponse('User Not Found',404);
        }
       
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new Error('invalid credentials');
        }

        const payload = {
            id:user._id,
            userName:user.userName,
            email:user.email ,
            role:user.role
        }
    
        const createToken = await new Promise((fill,reject)=>{
            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"7d"},(err,token)=>{
                   if(err){
                    reject(new ErrorResponse("something went wrong!"));
                }
                res.cookie("_token",token, {
                      maxAge:1000*60*60*24*7,// 7day
                      httpOnly: true,
                      //secure: true, // only works on https
                });
                
                fill(token)
            });
        });
        
        return res.status(200).json({
            success:true,
            message:"user loggedIn successfully",
            user:{
                userName:user.userName,
                email:user.email,
                id:user._id
            }
        });

       // console.log("tkn",res.cookie('_token'))
      
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error:err.message
        });        
    }
  
}

exports.userRegister = async(req,res,next)=>{
    try {
        const{
            email,
            userName,
            password
        } = req.fields;
        const{image} = req.files;
        
         //check if user Exists already
         const oldUser = await User.findOne({email:email});
         if(oldUser){
            throw new ErrorResponse("this email already token try diffrent one",404);
         }

        if(image){ //upload file 
            const newPath =  __dirname+'/../../../client/public/uploads/users/';
            const oldPath = image.filepath;
            await uploadfile(image,oldPath,newPath);
        }
       
        //hash password
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = User({
            userName:userName,
            email:email,
            password:hashedPassword,
            image : image.newFilename
        });

        const saveUser = await newUser.save();

        return res.status(201).json({
            success:true,
            message:"User SignedUp Successfully",
            user:{
                "userName":saveUser.userName,
                "email":saveUser.email,
                "image":saveUser.image,
                "id":saveUser._id
            }
        });

    } catch (err) {
         return res.status(500).json({
            success:false,
            error:JSON.stringify({"error":err.message})
        });
    }
}

exports.userLogout = async (req,res,next)=>{
    try{
        res.clearCookie('_token');
        return res.status(200).json({
           success:true,
           message:"logged out succefully"
        });
     }catch(err){
        return res.status(500).json({
           success:false,
           error:err.message
        });
     }
}

exports.userInfo = async (req,res,next)=>{
  
    try {
        const id = req.user.id;
        console.log('user id ',id)
        const user = await User.findById(id);
        
        return res.status(200).json({
            success:true,
            user:{
              "userName":user.userName,
              "email":user.email,
              "id":user._id,
              "image":user.image,
              "role":user.role
            }
        });

    } catch (err) {
        return res.status(500).json({
            success:false,
            error:"user not found"
        }); 
    }
}
