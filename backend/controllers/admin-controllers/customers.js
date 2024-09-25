const {User} = require('../../models/userModel');

const getCustomer = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await User.find({}).sort({ _id: -1 });
            res.json({status : 200, data});
        }
        else{
            res.json({ status : 401, message : 'Error fetching customers' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const updateCustomer = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {id, name, email, username} = req.body;
            const data = await User.findByIdAndUpdate({_id : id}, {name, username, email});
            if(data){
                res.json({ status : 200, message : 'Customer updated successfully' });
            }
            else{
                res.json({ status : 404, message : 'Customer not found' });
            }
        }
        else{
            res.json({ status : 401, message : 'Error updating customer' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const removeCustomer = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const id = req.params.id;
            const data = await User.findByIdAndDelete({_id : id});
            if(data){
                res.json({ status : 200, message : 'Customer deleted successfully' });
            }
            else{
                res.json({ status : 404, message : 'Customer not found' });
            }
        }
        else{
            res.json({ status : 401, message : 'Error deleting customer' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

module.exports = {getCustomer, updateCustomer, removeCustomer};