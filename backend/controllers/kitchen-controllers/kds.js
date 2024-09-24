const {KDS} = require('../../models/kdsModel');
const {KOT} = require('../../models/kotModel');

const getKDSData = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'chef'){
            const data = await KDS.find({});
            res.json({status : 200, data});
        }
        else{
            res.json({ status : 401, message : 'Error' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

const completeOrderCooking = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'chef'){
            const {id, kotId, index, kotIndex} = req.body; //index is the index of item in KDS items array
            //change the status of that items in the KOT items[] as ready
            await KOT.findByIdAndUpdate({_id : kotId}, {
                $set: {[`items.${kotIndex}.status`]: 'ready'}
            });
            //remove that item from items[] of KDS
            await KDS.findByIdAndUpdate({_id : id}, {
                $unset : {[`items.${index}`]: 1}
            });
            const kds = await KDS.findByIdAndUpdate({_id : id}, {
                $pull : {items : null}
            }, {new : true});
            if(kds){
                if(kds.items.length === 0){
                    await KDS.findByIdAndDelete({_id : id});
                    res.json({status : 200, message : 'All orders prepared'});
                }
                else{
                    res.json({status : 200, message : 'Order prepared'});
                }
            }
            else{
                res.json({ status : 404, message : 'Something went wrong' });
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

module.exports = {getKDSData, completeOrderCooking};