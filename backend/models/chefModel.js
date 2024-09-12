const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    name: {type : String, required : true},
    email : {type : String, required : true},
    username : {type : String, required : true},
    password : {type : String, required : true},
    vfcode : {type : String, default : '0'},
    age : {type : Number, required : true},
    salary : {type : Number, required : true},
    speciality : {type : String, required : true},
    privilege : {type : String, default : 'chef'}
});

const Chef = mongoose.model('chef', chefSchema, 'staff');

module.exports = {Chef};