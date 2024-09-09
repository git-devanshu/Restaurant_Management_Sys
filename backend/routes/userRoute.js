const express = require('express');
const userRouter = express.Router();
const {signupUser, loginUser, forgotPassword, resetPassword, logoutUser} = require('../controllers/userHandlers');
const {checkAuthorization} = require('../middlewares/checkAuthorization');

// endpoint prefix : /user
userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.put('/forgot-password/:username', forgotPassword);
userRouter.put('/reset-password/:username', resetPassword);
userRouter.post('/logout',checkAuthorization, logoutUser);

module.exports = {userRouter};