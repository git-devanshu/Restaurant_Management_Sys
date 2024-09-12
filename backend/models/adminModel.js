const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {type : String, required : true},
    email : {type : String, required : true},
    username : {type : String, required : true},
    password : {type : String, required : true},
    vfcode : {type : String, default : '0'},
    privilege : {type : String, default : 'admin'}
});

const Admin = mongoose.model('admin', adminSchema, 'staff');

module.exports = {Admin};