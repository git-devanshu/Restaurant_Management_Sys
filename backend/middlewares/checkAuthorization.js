const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuthorization = (req, res, next)=>{
    const token = req.headers.authorization;
    if(token){
        try{
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
            req.id = decoded.id;
            req.username = decoded.username;
            req.privilege = decoded.privilege;
            req.name = decoded.name;
            next();
        }
        catch(error){
            res.json({status : 401, message : 'Unauthorized access denied'});
        }
    }
    else{
        res.json({status : 401, message : 'Unauthorized access denied'});
    }
}

module.exports = {checkAuthorization}