const {Menu} = require('../../models/menuModel');
const {KOT} = require('../../models/kotModel');

const getMenu = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await Menu.find({});
            res.json({status : 200, data});
        }
        else{
            res.json({ status : 401, message : 'Error getting menu' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const putOrders = async (req, res) => {
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {orderList, total} = req.body;
            const custId = req.id;
            const kot = await KOT.findOneAndUpdate({custId, billStatus: 'pending'}, {
                $inc : {totalPrice : total},
                $push : {items : {$each : orderList}}
            });
            if (kot){
                res.json({ status: 200, message: 'Order Added Successfully', totalPrice: kot.totalPrice });
            }
            else{
                res.json({ status: 404, message: 'KOT not found' });
            }
        }
        else{
            res.json({ status: 401, message: 'Error placing orders' });
        }
    } 
    catch(error){
        res.json({ status: 500, message: 'Internal Server Error' });
    }
};

module.exports = {getMenu, putOrders};