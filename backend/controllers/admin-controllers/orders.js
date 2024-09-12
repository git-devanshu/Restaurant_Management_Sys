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
            const {_id, itemName, price} = req.body;
            const kot = await KOT.find({_id});
            if(kot){
                const filteredItems = kot.items.filter(item => 
                    item.itemName === itemName && item.price === price && item.status === 'pending'
                );
                if(filteredItems.length === 0){
                    return res.json({ status : 404, message : 'No such orders pending' });
                }
                await KOT.updateOne(
                    { _id: _id, "items.itemName": itemName, "items.price": price, "items.status": "pending" },
                    { $set: {"items.$[].status": "preparing"} }
                );
                await KDS.findOneAndUpdate(
                    { tableNo: kot.tableNo },
                    { $push: {items: {$each: filteredItems}} },
                    { new: true },
                    { upsert : true }
                );
                await KDS.updateMany(
                    { tableNo: kot.tableNo, "items.status": "pending" },
                    { $set: { "items.$[elem].status": "preparing" } },
                    { arrayFilters: [{ "elem.status": "pending" }] }
                );
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
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const rejectOrder = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {_id, itemName, price} = req.body;
            const kot = await KOT.findByIdAndUpdate(
                {_id},
                {
                    $pull: {
                        items : {"itemName": itemName, "price": price, "status": "pending"}
                    }
                }
            );
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
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

// it is expected to mark the bill as paid only on completion of all the orders.
const markBillPaid = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {_id} = req.body;
            const bill = await KOT.findByIdAndUpdate({_id}, {billStatus : 'paid'});
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