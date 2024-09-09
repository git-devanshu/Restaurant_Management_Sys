const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDB = async () => {
    const db = mongoose.connection;

    db.once('open', () => {
        console.log(`==== Connected to Database ====`);
    });

    db.on('reconnected', () => {
        console.log(`==== Database Reconnected ====`);
    });

    db.on('disconnected', () => {
        console.log(`==== Database Connection lost ====`);
    });

    db.on('error', (err) => {
        console.log(`==== Error connecting to Database ====`);
        console.log("Error : ", err);
    });

    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } 
    catch(error){
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = {connectToDB};