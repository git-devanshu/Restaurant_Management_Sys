const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service : 'Gmail',
    secure : false,
    auth : {
        user : process.env.USER,
        pass : process.env.PASS
    }
});

const sendSignupMail = (emailid, name)=>{
    try{
        const info = transporter.sendMail({
            from : process.env.USER,
            to : emailid,
            subject : 'Registration Successful',
            text : `
Dear ${name},
Your registration at the foodies website is successful. 
You can now avail the services provided by the restaurant. 
Use your registered username and password to login.

Thankyou...
Team Foodies`
        });
        console.log("Signup email sent to : ", name);
    }
    catch(error){
        console.log("Error sending signup email", error);
    }
};

const sendVFCodeMail = (emailid, vfcode)=>{
    try{
        const info = transporter.sendMail({
            from : process.env.USER,
            to : emailid,
            subject : 'Reset Password',
            text : `
A request to reset the password for your foodies online account was initiated. 
Use the following verification code to reset your password.

${vfcode}

Thankyou...
Team Foodies`
        });
        console.log("Verification code email sent");
    }
    catch(error){
        console.log("Error sending signup email", error);
    }
}

// const sendInvoiceOnMail = (emailid) =>{
//     try{
//         const info = transporter.sendMail({
//             from : process.env.USER,
//             to : emailid,
//             subject : 'Order Invoice',
//             text : ``
//         });
//         console.log("Order invoice sent on Email");
//     }
//     catch(error){
//         console.log("Error sending invoice", error);
//     }
// }

module.exports = {
    sendSignupMail,
    sendVFCodeMail,
    // sendInvoiceOnMail
}