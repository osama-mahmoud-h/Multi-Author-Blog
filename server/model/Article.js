const {Schema,model} = require('mongoose');

const articleSchema = new Schema({
    adminId: {
        type: String
    },
    adminName: {
        type: String
    },
    title : {
        type : String,
        index:true
    },
    titleSlug : { 
        type:String,
        index:true,
    },
    category : {
        type : String
    },
    category_slug: {
        type: String
    },
    tag_slug: {
        type: String
    },
    tag : {
        type : String
    },
    text : {
        type:String
    },
    image:{
        type:String
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    views:{
        type: Number,
        default: 0
    }
    
    /*
    
    like_dislike: [
        {
            like_disliker_id: {
                type: String,
            },
            like_or_dislike: {
                type: String,
                default: ''
            }
        }
    ],
    viewer: {
        type: Number,
        default: 0
    },
    viewerIp: [
        {
            ip: {
                type: String,
                required: true
            }
        }
    ]
    */
    
},{timestamps:true});

const Article =  model('article',articleSchema);
module.exports = Article;