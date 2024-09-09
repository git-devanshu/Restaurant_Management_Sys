const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    username : {type : String, required : true},
    email : String,
    password : String,
    vfcode : {type : Number, default : 0},
    privilege : {type : String, default : 'user'}
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = {User};