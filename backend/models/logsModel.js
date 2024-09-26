const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    id : {type : String, default : ''},
    username : {type : String, default : ''},
    privilege : {type : String, default : ''},
    timeStamp : {type : String, default : ''}
});

const Logs = mongoose.model('logs', logSchema, 'logs');

module.exports = {Logs}