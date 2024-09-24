const mongoose = require('mongoose');
const {getCurrentDate} = require('../utils/helperFunctions');

const feedbackSchema = new mongoose.Schema({
    custId : String,
    review  : String,
    name : String,
    dateTime : {type : String, default : ''}
});

const Feedback = mongoose.model('feedback', feedbackSchema, 'feedback');

module.exports = {Feedback};