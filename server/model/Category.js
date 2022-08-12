const {Schema,model} = require('mongoose');

const categorySchema = new Schema({
    categoryName : {
        type : String,
        index:true,
        required : true
    },
    categorySlug : {
        type : String,
        index:true
    },
    categoryDesc : {
        type : String,
    }
},{timestamps:true});

const Category =  model('category',categorySchema);
module.exports = Category;