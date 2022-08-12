const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library')
const ErrorResponse = require('../../utils/ErrorResponse');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET_ID);
const User = require('../../model/User');

exports.googleLogin = async(req,res,next)=>{
    try {
     const {tokenId} = req.body;
     const response= await client.verifyIdToken({idToken:tokenId,audience:process.env.GOOGLE_CLIENT_SECRET_ID})
     const { email_verified, name, email } = response.payload;
     
     if(!email_verified){
        throw new ErrorResponse('inavlid credentials',500);
     }

     let user = await User.findOne({email:email});
     if(!user){
        const newUser = await User.create({
            userName:name,
            email:email,
            password:email+process.env.JWT_SECRET
        });
     }

     //find user Agian
     user = await User.findOne({email:email});

     const payload = {
        id:user._id,
        userName:user.userName,
        email:user.email 
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
            fill('token created successfully')
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


  
    } catch (err) {
        return res.status(err.statusCode||500).json({
            success:false,
            error:err.message,
        });
    }
}

exports.facebookLogin = async(req,res,next)=>{
    try {
        console.log("reqbody face : ",req.body);
        return res.status(200).json({
            success:true
        });
    } catch (err) {
        
        console.log("face loign err : ",err.message);
    }
}