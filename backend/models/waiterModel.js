const mongoose = require('mongoose');

const waiterSchema = new mongoose.Schema({
    name: {type : String, required : true},
    email : {type : String, required : true},
    username : {type : String, required : true},
    password : {type : String, required : true},
    vfcode : {type : String, default : '0'},
    age : {type : Number, required : true},
    salary : {type : Number, required : true},
    servingTable : {type : Array, default : []}, //tableNo of table the waiter is currently assigned to
    privilege : {type : String, default : 'waiter'}
});

const Waiter = mongoose.model('waiter', waiterSchema, 'staff');

module.exports = {Waiter};