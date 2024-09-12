const express = require('express');
const staffRouter = express.Router();
const {loginStaff, forgotPasswordStaff, resetPasswordStaff} = require('../controllers/staffHandlers');
const {logoutUser} = require('../controllers/userHandlers');
const {checkAuthorization} = require('../middlewares/checkAuthorization');

// endpoint prefix : /staff
userRouter.post('/login', loginStaff);
userRouter.put('/forgot-password', forgotPasswordStaff);
userRouter.put('/reset-password', resetPasswordStaff);
userRouter.post('/logout',checkAuthorization, logoutUser);

module.exports = {staffRouter};