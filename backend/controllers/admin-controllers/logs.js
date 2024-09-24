const fs = require('fs');
const path = require('path');

const getSystemLogs = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            fs.readFile('C:/Users/devan/OneDrive/Desktop/Projects/Restaurant  POS/backend/logs.txt', 'utf8', (err, data)=>{
                if(err){
                  return res.json({status : 400, error: 'Failed to read logs'});
                }
                res.json({status : 200, data});
            });
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