const mongoose = require('mongoose');
const {getCurrentDate} = require('../utils/helperFunctions');

const KOT = new mongoose.Schema({
    // _id will be used as KOTno
    items : {type : Array, default : [{}]},
    tableNo : String,
    orderDate : {type : String, default : getCurrentDate(2)},
    orderTime : {type : String, default : getCurrentDate(5)},
    billStatus : {type : String, default : 'pending'}, //pending, paid
    totalPrice : Number
});

module.exports = {KOT};

/*
object of items will be as
{
    itemName,
    price,
    qty,
    status
}
*/