const express = require('express');
const adminRouter = express.Router();

// import middlewares
const {checkAuthorization} = require('../middlewares/checkAuthorization');

// import controllers
const {getCustomer, updateCustomer, removeCustomer} = require('../controllers/admin-controllers/customers');
const {getFeedback, removeFeedback} = require('../controllers/admin-controllers/feedback');
const {getMenuItems, UpdateMenuItem, addMenuItem, removeMenuItem} = require('../controllers/admin-controllers/menu');
const {getTablesData, addTable, updateTable, removeTable} = require('../controllers/admin-controllers/tables');
const {getWaitersList, addWaiter, removeWaiter, assignWaiter, freeAllWaiters} = require('../controllers/admin-controllers/waiters');
const {getRevenueData} = require('../controllers/admin-controllers/revenue');
const {getBookingRequests, getCurrentBookings, approveRequest, rejectRequest, freeTable} = require('../controllers/admin-controllers/reservation');
const {getCurrentKOTs, approveOrder, rejectOrder, markBillPaid, getOrderHistory, removeHistoryItem, clearHistory} = require('../controllers/admin-controllers/orders');
const {getChefs, addChef, removeChef, getKDSdata} = require('../controllers/admin-controllers/kitchen');
const {getDashboardData} = require('../controllers/admin-controllers/dashboard');
const {getSystemLogs} = require('../controllers/admin-controllers/logs');

// endpoint prefix : /admin

// dashboard functions
adminRouter.get('/dashboard', checkAuthorization, getDashboardData);

// customer functions
adminRouter.get('/customers', checkAuthorization, getCustomer);
adminRouter.put('/customers', checkAuthorization, updateCustomer);
adminRouter.delete('/customers/:id', checkAuthorization, removeCustomer);

// kitchen functions
adminRouter.get('/kitchen/chefs', checkAuthorization, getChefs);
adminRouter.get('/kitchen/kds-data', checkAuthorization, getKDSdata);
adminRouter.post('/kitchen', checkAuthorization, addChef);
adminRouter.delete('/kitchen/:id', checkAuthorization, removeChef);

// waiter functions
adminRouter.get('/waiters', checkAuthorization, getWaitersList);
adminRouter.post('/waiters', checkAuthorization, addWaiter);
adminRouter.put('/waiters/assign', checkAuthorization, assignWaiter);
adminRouter.put('/waiters/free-all', checkAuthorization, freeAllWaiters);
adminRouter.delete('/waiters/:id', checkAuthorization, removeWaiter);

// orders functions
adminRouter.get('/orders/current-bills', checkAuthorization, getCurrentKOTs);
adminRouter.get('/orders/order-history', checkAuthorization, getOrderHistory);
adminRouter.put('/orders/approve', checkAuthorization, approveOrder);
adminRouter.put('/orders/reject', checkAuthorization, rejectOrder);
adminRouter.put('/orders/mark-paid', checkAuthorization, markBillPaid);
adminRouter.delete('/orders/remove-item/:id', checkAuthorization, removeHistoryItem);
adminRouter.delete('/orders/clear-all', checkAuthorization, clearHistory);

// reservation functions
adminRouter.get('/reservation/requests', checkAuthorization, getBookingRequests);
adminRouter.get('/reservation/current-bookings', checkAuthorization, getCurrentBookings);
adminRouter.put('/reservation/approve-request', checkAuthorization, approveRequest);
adminRouter.put('/reservation/reject-request', checkAuthorization, rejectRequest);
adminRouter.put('/reservation/free-table', checkAuthorization, freeTable);

// revenue functions
adminRouter.get('/revenue', checkAuthorization, getRevenueData);

// menu functions
adminRouter.get('/menu', checkAuthorization, getMenuItems);
adminRouter.post('/menu', checkAuthorization, addMenuItem);
adminRouter.put('/menu', checkAuthorization, UpdateMenuItem);
adminRouter.delete('/menu/:id', checkAuthorization, removeMenuItem);

// tables functions
adminRouter.get('/tables', checkAuthorization, getTablesData);
adminRouter.post('/tables', checkAuthorization, addTable);
adminRouter.put('/tables', checkAuthorization, updateTable);
adminRouter.delete('/tables/:id', checkAuthorization, removeTable);

// feedback functions
adminRouter.get('/feedback', checkAuthorization, getFeedback);
adminRouter.delete('/feedback/:id', checkAuthorization, removeFeedback);

// logs functions
adminRouter.get('/logs', checkAuthorization, getSystemLogs);

module.exports = {adminRouter};