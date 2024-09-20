const {Menu} = require('../../models/menuModel');

const getMenuItems = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await Menu.find({});
            res.json({ status : 200, data });
        }
        else{
            res.json({ status : 401, message : 'Error fetching menu items' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const addMenuItem = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {name, price, category, type} = req.body;
            const item = new Menu({
                itemName : name,
                price,
                category,
                type
            });
            await item.save();
            res.json({ status : 200, message : 'Item Added Successfully' });
        }
        else{
            res.json({ status : 401, message : 'Error adding menu item' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const UpdateMenuItem = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {_id, name, price, category, type} = req.body;
            const item = await Menu.findByIdAndUpdate(_id, {itemName : name, price, category, type});
            if(item){
                res.json({ status : 200, message : 'Item Updated Successfully' });
            }
            else{
                res.json({ status : 404, message : 'Item Not Found' });
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

const removeMenuItem = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const id = req.params.id;
            const item = await Menu.findByIdAndDelete({_id : id});
            if(item){
                res.json({ status : 200, message : 'Item Removed Successfully' });
            }
            else{
                res.json({ status : 404, message : 'Item Not Found' });
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

module.exports = {getMenuItems, UpdateMenuItem, addMenuItem, removeMenuItem};