const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    itemName : {type : String, required : true},
    price : {type : Number, required : true},
    category : {type : String, required : true},
    type : {type : String, default : 'veg'} //veg, non-veg, egg-food
});

const Menu = mongoose.model('menu', menuSchema, 'menu');

module.exports = {Menu};