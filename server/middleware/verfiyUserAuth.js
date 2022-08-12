const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");

exports.verfiyUserAuth = (req,res,next)=>{ 
    try{
        const token = req.cookies._token;
        if(!token){
            throw new ErrorResponse('error!, try to login');
        }

       const verfied= jwt.verify(token,process.env.JWT_SECRET);

       if(!verfied||verfied.role!=='user'){
          throw new ErrorResponse('login first');
       }
       //console.log("from middleware: ",verfied);
            req.user = {};
            req.user.id=verfied.id;
            req.user.email=verfied.email;
            req.user.userName=verfied.userName;

            next();
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}