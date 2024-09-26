const {Logs} = require('../../models/logsModel');

const getSystemLogs = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await Logs.find({}).sort({_id : -1});
            res.json({status : 200, data});
        }
        else{
            res.json({ status : 401, message : 'Error fetching logs' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

module.exports = {getSystemLogs}