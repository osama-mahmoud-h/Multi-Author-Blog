const {Schema,model} =require('mongoose');

const AdminSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    role : {
        type : String,
        required : true
    },
    image : {
        type : String,
        
    }
},{timeseries:true});


const Admin = model('admin',AdminSchema);

module.exports = Admin; 