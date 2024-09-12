const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    username : {type : String, required : true},
    email : {type : String, required : true},
    password : String,
    vfcode : {type : String, default : '0'},
    privilege : {type : String, default : 'user'},
    bookingId : {type : String, default : ''}
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = {User};