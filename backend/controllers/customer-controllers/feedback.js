const {Feedback} = require('../../models/feedbackModel');
const {getCurrentDate} = require('../../utils/helperFunctions');

const submitFeedback = async (req, res) =>{
    try{
        const privilege = req.privilege;
        if(privilege === 'user'){
            const {review} = req.body;
            const feedback = new Feedback({
                name : req.name,
                custId : req.id,
                review,
                dateTime : getCurrentDate(2)
            });
            await feedback.save();
            res.json({status : 200, message : 'Feedback sent'});
        }
        else{
            res.json({ status : 401, message : 'Error sending feedback' });
        }
    }
    catch(error){
        res.json({ status : 500, message : 'Internal Server Error' });
    }
}

module.exports = {submitFeedback};