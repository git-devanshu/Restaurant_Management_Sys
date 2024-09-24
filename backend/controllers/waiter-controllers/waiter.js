const {Waiter} = require('../../models/waiterModel');

const getServingTables = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'waiter'){
            const data = await Waiter.findById({_id : req.id});
            res.json({status : 200, data});
        }
        else{
            res.json({ status : 401, message : 'Error' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

module.exports = {getServingTables};