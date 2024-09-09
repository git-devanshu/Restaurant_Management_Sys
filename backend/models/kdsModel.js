const mongoose = require('mongoose');

const KDS = new mongoose.Schema({
    tabeleNo : String,
    items : {type : Array, default : [{}]}
});

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