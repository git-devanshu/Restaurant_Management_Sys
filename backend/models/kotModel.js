const mongoose = require('mongoose');
const {getCurrentDate} = require('../utils/helperFunctions');

const KOTSchema = new mongoose.Schema({
    // _id will be used as KOTno
    items : {type : Array, default : []},
    tableNo : String,
    orderDate : {type : String, default : ''},
    orderTime : {type : String, default : ''},
    billStatus : {type : String, default : 'pending'}, //pending, paid
    totalPrice : {type : Number, default : 0},
    custId : String
});

const KOT = mongoose.model('KOT', KOTSchema, 'KOT');

module.exports = {KOT};

/*
object of items will be as
{
    itemName,
    price,
    qty,
    status // pending, preparing, ready
}
*/