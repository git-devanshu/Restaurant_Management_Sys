const mongoose = require('mongoose');

const Menu = new mongoose.Schema({
    itemName : String,
    price : Number,
    category : String,
    type : {type : String, default : 'veg'} //veg, non-veg, egg-food
});

module.exports = {Menu};