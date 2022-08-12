const {Schema,model} = require('mongoose');

const tagSchema = new Schema({
    tagName : {
        type : String,
        index:true,
        required : true
    },
    tagSlug : {
        type : String,
        index:true
    },
    tagDesc : {
        type : String,
    }
},{timestamps:true});

const Tag= model('tag',tagSchema);
module.exports = Tag;
