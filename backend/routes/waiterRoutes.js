const express = require('express');
const waiterRouter = express.Router();

const {checkAuthorization} = require('../middlewares/checkAuthorization');
const {getServingTables} = require('../controllers/waiter-controllers/waiter');

// endpoint prefix : /waiter

waiterRouter.get('/get-data', checkAuthorization, getServingTables);

module.exports = {waiterRouter};