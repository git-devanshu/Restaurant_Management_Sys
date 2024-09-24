const express = require('express');
const chefRouter = express.Router();

const {checkAuthorization} = require('../middlewares/checkAuthorization');
const {getKDSData, completeOrderCooking} = require('../controllers/kitchen-controllers/kds');

// endpoint prefix : /chef

chefRouter.get('/kitchen', checkAuthorization, getKDSData);
chefRouter.put('/kitchen', checkAuthorization, completeOrderCooking);

module.exports = {chefRouter};