const {User} = require('../../models/userModel');
const {KOT} = require('../../models/kotModel');

const getBookingStatus = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const user = await User.findById({_id : req.id});
            const bookingId = user.bookingId;
            if(bookingId === '0'){
                res.json({status : 200, message : 'Request Rejected'});
            }
            else if(bookingId !== ''){
                const data = await KOT.findById({_id : bookingId});
                res.json({status : 202, data});
            }
            else{
                res.json({status : 204, message: 'Wait until your request is approved'});
            }
        }
        else{
            res.json({ status : 401, message : 'Error checking booking status' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

module.exports = {getBookingStatus};