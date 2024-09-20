const express = require('express');
const staffRouter = express.Router();
const {loginStaff, forgotPasswordStaff, resetPasswordStaff} = require('../controllers/staffHandlers');
const {logoutUser} = require('../controllers/userHandlers');
const {checkAuthorization} = require('../middlewares/checkAuthorization');

// endpoint prefix : /staff

staffRouter.post('/login', loginStaff);
staffRouter.put('/forgot-password', forgotPasswordStaff);
staffRouter.put('/reset-password', resetPasswordStaff);
staffRouter.post('/logout',checkAuthorization, logoutUser);

module.exports = {staffRouter};