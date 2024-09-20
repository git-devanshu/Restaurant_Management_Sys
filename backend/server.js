const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connectToDB} = require('./configs/dbconfig');
const {userRouter} = require('./routes/userRoute');
const {adminRouter} = require('./routes/adminRoutes');
const {customerRouter} = require('./routes/customerRoutes');
const {staffRouter} = require('./routes/staffRoutes');

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

connectToDB();

app.use('/user', userRouter); //user authentication routes
app.use('/staff', staffRouter); //staff authentication routes
app.use('/admin', adminRouter); //same router for all admin API requests
app.use('/customer', customerRouter); //router for booking requests from user

const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`==== Server is running on port ${port} ====`);
});