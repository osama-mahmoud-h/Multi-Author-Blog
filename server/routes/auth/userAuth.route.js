const express = require('express');
const router = express.Router();

//middleware
const{verfiyUserAuth} = require('../../middleware/verfiyUserAuth')
//controller

const { 
    googleLogin 
} = require('../../controller/auth/googlefaceLogin.controller');

const { 
    userLoign,
    userRegister,
    userLogout,
    userInfo
} = require('../../controller/auth/userAuth.controller');

const {userValidator} = require('../../requestValidator/auth/userAuth.validator');


//google and facebook login 
router.route('/google-login').post(googleLogin);

router.route('/login').post(userLoign);
router.route('/register').post(userValidator,userRegister);

//
router.route('/is-user-auth').get((req,res,next)=>{
    verfiyUserAuth(req,res,next)
},
userInfo
);



module.exports = router ; 

