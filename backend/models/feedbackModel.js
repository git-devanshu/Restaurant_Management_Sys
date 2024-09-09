const mongoose = require('mongoose');
const {getCurrentDate} = require('../utils/helperFunctions');

const Feedback = new mongoose.Schema({
    custId : String,
    review  : String,
    name : String,
    dateTime : {type : String, default : getCurrentDate(2)}
});

module.exports = {Feedback};