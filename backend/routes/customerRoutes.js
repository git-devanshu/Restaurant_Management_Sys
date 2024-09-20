const express = require('express');
const customerRouter = express.Router();

const {checkAuthorization} = require('../middlewares/checkAuthorization');
const {getAllTablesData, requestBooking} = require('../controllers/customer-controllers/tableReservation');
const {getMenu, putOrders} = require('../controllers/customer-controllers/orderFood');
const {getBookingStatus} = require('../controllers/customer-controllers/myOrders');
const { submitFeedback } = require('../controllers/customer-controllers/feedback');

// api endpoint prefix : /customer

// table reservation functions
customerRouter.get('/reservations', checkAuthorization, getAllTablesData);
customerRouter.put('/reservations', checkAuthorization, requestBooking);

// order food functions
customerRouter.get('/order', checkAuthorization, getMenu);
customerRouter.put('/order', checkAuthorization, putOrders);

// my orders functions
customerRouter.get('/my-orders', checkAuthorization, getBookingStatus);

// feedback functions
customerRouter.post('/feedback', checkAuthorization, submitFeedback);

module.exports = {customerRouter};