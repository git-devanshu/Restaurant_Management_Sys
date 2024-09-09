const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name : String,
    username : {type : String, required : true},
    email : String,
    password : String,
    vfcode : {type : Number, default : 0},
    privilege : {type : String, default : 'user'}
});

module.exports = {User};