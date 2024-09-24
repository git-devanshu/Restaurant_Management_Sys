const mongoose = require('mongoose');
const { getCurrentDate } = require('../utils/helperFunctions');

const KDSSchema = new mongoose.Schema({
    tableNo : String,
    items : {type : Array, default : []},
    kotId : {type : String, default : ''}
});

const KDS = mongoose.model('KDS', KDSSchema, 'KDS');

module.exports = {KDS};

/*
object of items will be as
{
    itemName,
    price,
    qty,
    status,
    index //index of this object in the items array of KOT
}
*/