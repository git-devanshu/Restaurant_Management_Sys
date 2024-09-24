const {Table} = require('../../models/tableModel');
const {User} = require('../../models/userModel');
const {KOT} = require('../../models/kotModel');
const {getCurrentDate} = require('../../utils/helperFunctions');

const getBookingRequests = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await Table.find({});
            res.json({ status : 200, data });
        }
        else{
            res.json({ status : 401, message : 'Error getting reservation requests' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const approveRequest = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {id, tableNo, custId, name, username, reqTime} = req.body;
            const reservation = await Table.findByIdAndUpdate({_id : id},
                {
                    $set : {
                        status : 'occupied',
                        bookingTime : getCurrentDate(5),
                        currentBooking : {
                            custId, name, username, reqTime, reqStatus : 'approved'
                        }
                    },
                    $pull : {
                        waitlist : {
                            custId, name, username, reqTime, reqStatus : 'pending'
                        }
                    }
                }
            );
            if(reservation){
                const newKOT = new KOT({
                    tableNo,
                    custId,
                    orderDate : getCurrentDate(2),
                    orderTime : getCurrentDate(5)
                });
                const kot = await newKOT.save();
                const customer = await User.findByIdAndUpdate({_id : custId}, {bookingId : kot._id});
                if(customer){
                    res.json({ status : 200, message : 'Request approved' });
                }
                else{
                    res.json({ status : 404, message : 'Requesting customer not found' });
                }
            }
            else{
                res.json({ status : 404, message : 'Request not found' });
            }
        }
        else{
            res.json({ status : 401, message : 'Error approving request' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const rejectRequest = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {id, custId, name, username, reqTime} = req.body;
            const reservation = await Table.findByIdAndUpdate({_id : id}, {
                $pull : {
                    waitlist : {
                        custId, name, username, reqTime, reqStatus : 'pending'
                    }
                }
            });
            const user = await User.findByIdAndUpdate({_id : custId}, {$set : {bookingId : '0'}});
            if(reservation){
                res.json({ status : 200, message : 'Request rejected' });
            }
            else{
                res.json({ status : 404, message : "Request not found" });
            }
        }
        else{
            res.json({ status : 401, message : 'Error' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const getCurrentBookings = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await Table.find({ currentBooking : {$ne : {}} });
            res.json({ status : 200, data });
        }
        else{
            res.json({ status : 401, message : 'Error getting current bookings' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const freeTable = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {id} = req.body;
            const table = await Table.findByIdAndUpdate({_id : id}, {$set : {status : "free", bookingTime : '', currentBooking : {}}});
            if(table){
                res.json({ status : 200, message : 'Table vacated successfully' });
            }
            else{
                res.json({ status : 404, message : "Table not found" });
            }
        }
        else{
            res.json({ status : 401, message : 'Error vacating table' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

module.exports = {getBookingRequests, getCurrentBookings, approveRequest, rejectRequest, freeTable};