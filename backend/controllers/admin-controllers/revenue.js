const {KOT} = require('../../models/kotModel');

const getRevenueData = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await KOT.aggregate([
                {$match : { billStatus : 'paid' }},
                {
                    $addFields : {
                        monthYear : {
                            $substr : [
                                "$orderDate",
                                { $add: [{$indexOfCP: ["$orderDate", " "]}, 1] },
                                -1 
                            ]
                        }
                    }
                },
                {
                    $group : {_id : "$monthYear", totalRevenue : { $sum : "$totalPrice" }}
                }
            ]);
            res.json({ status : 200, data });
        }
        else{
            res.json({ status : 401, message : 'Error fetching revenue data' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

module.exports = {getRevenueData};