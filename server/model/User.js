const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role:{
        type:String,
        default:"user"
    },
    likes:[{
        articleId:'',
        status:''
    }],
    loginMethod: {
        type: String
    },
    image: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    accessStatus: {
        type: String,
        default: 'unblock'
    }
}, { timestamps: true })

const User=mongoose.model('user', userSchema);
module.exports = User ;