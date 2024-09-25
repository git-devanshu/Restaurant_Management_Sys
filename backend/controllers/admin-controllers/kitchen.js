const {Chef} = require('../../models/chefModel');
const {KDS} = require('../../models/kdsModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const getChefs = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await Chef.find({privilege : 'chef'}).sort({ _id: -1 });
            res.json({status : 200, data});
        }
        else{
            res.json({ status : 401, message : 'Error getting chef list' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const addChef = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {username, name, age, email, password, speciality} = req.body;
            const user = await Chef.findOne({username});
            if(!user){
                const hashedPass = await bcrypt.hash(password, 10);
                const chef = new Chef({
                    name,
                    username,
                    age,
                    email,
                    password : hashedPass,
                    speciality
                });
                await chef.save();
                res.json({ status : 200, message : 'Chef added successfully' });
            }
            else{
                res.json({ status : 400, message : 'Chef with the username already exists' });
            }
        }
        else{
            res.json({ status : 401, message : 'Error adding chef' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const removeChef = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const id = req.params.id;
            const chef = await Chef.findByIdAndDelete({_id : id});
            if(chef){
                res.json({ status : 200, message : 'Chef removed successfully' });
            }
            else{
                res.json({ status : 404, message : 'Chef not found' });
            }
        }
        else{
            res.json({ status : 401, message : 'Error removing chef' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const getKDSdata = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await KDS.find({});
            res.json({ status : 200, data });
        }
        else{
            res.json({ status : 401, message : 'Error' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

module.exports = {getChefs, addChef, removeChef, getKDSdata};