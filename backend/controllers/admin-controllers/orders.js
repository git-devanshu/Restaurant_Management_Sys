const {KDS} = require('../../models/kdsModel');
const {KOT} = require('../../models/kotModel');
const {User} = require('../../models/userModel');

const getCurrentKOTs = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await KOT.find({billStatus : 'pending'});
            res.json({ status : 200, data });
        }
        else{
            res.json({ status : 401, message : 'Error getting current KOTs' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const approveOrder = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {id, ind} = req.body;
            const kot = await KOT.findByIdAndUpdate({_id : id}, {
                $set: {[`items.${ind}.status`]: 'preparing'}
            }, {new : true});
            if(kot){
                const currOrder = kot.items[ind];
                const kds = await KDS.findOneAndUpdate({tableNo : kot.tableNo, kotId : id}, {
                    $push : {items : currOrder}
                }, {upsert : true});
                res.json({ status : 200, message : 'Order sent to kitchen' });
            }
            else{
                res.json({ status : 404, message : "KOT not found" });
            }
        }
        else{
            res.json({ status : 401, message : 'Error approving orders' });
        }
    }
    catch(error){
        console.log(error);
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const rejectOrder = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {id, ind, price, qty} = req.body;
            await KOT.findByIdAndUpdate({_id  : id},{
                $unset : {[`items.${ind}`]: 1},
                $inc : {totalPrice : -1 * price * qty},
            });
            const kot = await KOT.findByIdAndUpdate({_id : id}, {
                $pull : {items : null}
            }, {new : true});
            if(kot){
                res.json({ status : 200, message : 'Order rejected' });
            }
            else{
                res.json({ status : 404, message : "KOT not found" });
            }
        }
        else{
            res.json({ status : 401, message : 'Error rejecting order' });
        }
    }
    catch(error){
        console.log(error);
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

// it is expected to mark the bill as paid only on completion of all the orders.
const markBillPaid = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {id} = req.body;
            const bill = await KOT.findByIdAndUpdate({_id : id}, {billStatus : 'paid'}, {new : true});
            if(bill){
                await User.findByIdAndUpdate({_id : bill.custId}, {$set : {bookingId : ''}});
                res.json({ status : 200, message : 'Bill marked as paid' });
            }
            else{
                res.json({ status : 404, message : "Bill not found" });
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

const getOrderHistory = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await KOT.find({billStatus : 'paid'});
            res.json({ status : 200, data });
        }
        else{
            res.json({ status : 401, message : 'Error fetching orders history' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const removeHistoryItem = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const id = req.params.id;
            const data = await KOT.findByIdAndDelete({_id : id});
            if(data){
                res.json({ status : 200, message : 'Item removed successfully' });
            }
            else{
                res.json({ status : 404, message : 'Item not found' });
            }
        }
        else{
            res.json({ status : 401, message : 'Error removing bill' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const clearHistory = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const history = await KOT.deleteMany({billStatus : 'paid'});
            if(history){
                res.json({status : 200, message : 'Bills history cleared'});
            }
            else{
                res.json({status : 404, message : 'No bill history to clear'});
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

module.exports = {getCurrentKOTs, approveOrder, rejectOrder, markBillPaid, getOrderHistory, removeHistoryItem, clearHistory};