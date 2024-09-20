const {Table} = require('../../models/tableModel');

const getTablesData = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await Table.find({});
            res.json({ status : 200, data });
        }
        else{
            res.json({ status : 401, message : 'Error getting tables data' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const addTable = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {tableNo, location, capacity} = req.body;
            const table = new Table({
                tableNo,
                location,
                capacity
            });
            await table.save();
            res.json({ status : 200, message : 'Table Added Successfully' });
        }
        else{
            res.json({ status : 401, message : 'Error adding table' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}
const updateTable = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const {id, tableNo, location, capacity} = req.body;
            const table = await Table.findByIdAndUpdate({_id: id}, {tableNo, location, capacity});
            if(table){
                res.json({ status : 200, message : 'Table Updated Successfully' });
            }
            else{
                res.json({ status : 404, message : 'Table Not Found' });
            }
        }
        else{
            res.json({ status : 401, message : 'Error updating table' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const removeTable = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const id = req.params.id;
            const table = await Table.findByIdAndDelete({_id : id});
            if(table){
                res.json({ status : 200, message : 'Table Removed Successfully' });
            }
            else{
                res.json({ status : 404, message : 'Table Not Found' });
            }
        }
        else{
            res.json({ status : 401, message : 'Error removing table' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

module.exports = {getTablesData, addTable, updateTable, removeTable};