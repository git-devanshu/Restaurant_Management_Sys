const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    itemName : String,
    price : Number,
    category : String,
    type : {type : String, default : 'veg'} //veg, non-veg, egg-food
});

const Menu = mongoose.model('menu', menuSchema, 'menu');

module.exports = {Menu};