const {Feedback} = require('../../models/feedbackModel');

const getFeedback = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const data = await Feedback.find({}).sort({ _id: -1 });
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

const removeFeedback = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'admin'){
            const id = req.params.id;
            const data = await Feedback.findByIdAndDelete({_id : id});
            if(data){
                res.json({status : 200, message : 'Feedback Removed Successfully' });
            }
            else{
                res.json({ status : 404, message : 'Feedback Not Found' });
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

module.exports = {getFeedback, removeFeedback};