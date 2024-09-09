const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNo : {type : String, required : true},
    location : String,
    capacity : Number,
    status : {type : String, default : 'free'}, //status - free, occupied
    currentBooking : {type : Object, default : {}}, //details of customer who have currently booked the table
    bookingTime : String,
    waitlist : {type : Array, default : [{}]}
});

const Table = mongoose.model('tables', tableSchema, 'tables');

module.exports = {Table};

/*
for currentBooking and waitlist, the object definition is
{
    custId,
    name,
    username,
    reqTime,
    reqStatus
}
*/