const {Table} = require('../../models/tableModel');
const {User} = require('../../models/userModel');
const {getCurrentDate} = require('../../utils/helperFunctions');

const getAllTablesData = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'user'){
            const data = await Table.find({});
            res.json({status : 200, data});
        }
        else{
            res.json({ status : 401, message : 'Error fetching tables' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const requestBooking = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'user'){
            const {id} = req.body;
            const custId = req.id;
            await User.findByIdAndUpdate({_id : custId}, {
                $set : {bookingId : ''}
            });
            const request = {
                custId : req.id,
                name : req.name,
                username : req.username,
                reqTime : getCurrentDate(5),
                reqStatus : 'pending'
            }
            const table = await Table.findByIdAndUpdate({_id : id}, {
                $push : {waitlist : request}
            });
            if(table){
                res.json({status : 200, message : 'Reservation request added' });
            }
            else{
                res.json({status : 404, message : 'Table Not Found' });
            }
        }
        else{
            res.json({ status : 401, message : 'Error booking table' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

module.exports = {getAllTablesData, requestBooking};