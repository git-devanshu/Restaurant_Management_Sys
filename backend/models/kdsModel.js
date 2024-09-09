const mongoose = require('mongoose');

const KDSSchema = new mongoose.Schema({
    tabeleNo : String,
    items : {type : Array, default : [{}]}
});

const KDS = mongoose.model('KDS', KDSSchema, 'KDS');

module.exports = {KDS};

/*
object of items will be as
{
    itemName,
    price,
    qty,
    status
}
*/