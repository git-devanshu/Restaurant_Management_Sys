const {Admin} = require('../models/adminModel');
const {Waiter} = require('../models/waiterModel');
const {Chef} = require('../models/chefModel');
const bcrypt = require('bcryptjs');
const {sendVFCodeMail} = require('../utils/sendMail');
const {generateVerificationCode, addToLogs} = require('../utils/helperFunctions');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginStaff = async (req, res)=>{
    try{
        const {username, password, role} = req.body;
        if(role === 'admin'){
            const admin = await Admin.findOne({username});
            if(admin){
                const isMatch1 = await bcrypt.compare(password, admin.password);
                if(!isMatch1){
                    res.json({status : 400, message : 'Invalid password'});
                }
                else{
                    const token = jwt.sign({id : admin._id, username : admin.username, name: admin.name, privilege : admin.privilege}, process.env.SECRET);
                    addToLogs(username, 'admin', admin._id);
                    res.json({status : 202, message : 'Login successful', token});
                }
            }
            else{
                res.json({ status : 404, message : 'Admin details not found' });
            }
        }
        else if(role === 'waiter'){
            const waiter = await Waiter.findOne({username});
            if(waiter){
                const isMatch2 = await bcrypt.compare(password, waiter.password);
                if(!isMatch2){
                    res.json({status : 400, message : 'Invalid password'});
                }
                else{
                    const token = jwt.sign({id : waiter._id, username : waiter.username, name: waiter.name, privilege : waiter.privilege}, process.env.SECRET);
                    addToLogs(username, 'waiter', waiter._id);
                    res.json({status : 202, message : 'Login successful', token});
                }
            }
            else{
                res.json({ status : 404, message : 'Waiter details not found' });
            }
        }
        else if(role === 'chef'){
            const chef = await Chef.findOne({username});
            if(chef){
                const isMatch3 = await bcrypt.compare(password, chef.password);
                if(!isMatch3){
                    res.json({status : 400, message : 'Invalid password'});
                }
                else{
                    const token = jwt.sign({id : chef._id, username : chef.username, name: chef.name, privilege : chef.privilege}, process.env.SECRET);
                    addToLogs(username, 'chef', chef._id);
                    res.json({status : 202, message : 'Login successful', token});
                }
            }
            else{
                res.json({ status : 404, message : 'Chef details not found' });
            }
        }
    }
    catch(error){
        res.json({status : 500, message : 'Internal Server error'});
    }
}

const forgotPasswordStaff = async (req, res)=>{
    try{
        const {username, role} = req.body;
        if(role === 'admin'){
            const admin = await Admin.findOne({username});
            if(admin){
                const email = admin.email;
                const vfcode = generateVerificationCode(6);
                admin.vfcode = vfcode;
                await admin.save();
                sendVFCodeMail(email, vfcode);
                res.json({status : 200, message : 'Verification code sent your registered email id'});
            }
            else{
                res.json({status : 404, message : 'Staff details not found'});
            }
        }
        else if(role === 'waiter'){
            const waiter = await Waiter.findOne({username});
            if(waiter){
                const email = waiter.email;
                const vfcode = generateVerificationCode(6);
                waiter.vfcode = vfcode;
                await waiter.save();
                sendVFCodeMail(email, vfcode);
                res.json({status : 200, message : 'Verification code sent your registered email id'});
            }
            else{
                res.json({status : 404, message : 'Staff details not found'});
            }
        }
        else if(role === 'chef'){
            const chef = await Chef.findOne({username});
            if(chef){
                const email = chef.email;
                const vfcode = generateVerificationCode(6);
                chef.vfcode = vfcode;
                await chef.save();
                sendVFCodeMail(email, vfcode);
                res.json({status : 200, message : 'Verification code sent your registered email id'});
            }
            else{
                res.json({status : 404, message : 'Staff details not found'});
            }
        }
    }
    catch(error){
        res.json({status : 500, message : 'Internal Server error'});
    }
}

const resetPasswordStaff = async (req, res)=>{
    try{
        const {vfcode, password, username, role} = req.body;
        if(role === 'admin'){
            const admin = await Admin.findOne({username});
            if(admin){
                const savedVfCode = admin.vfcode;
                if(savedVfCode == vfcode){
                    const hashedPass = await bcrypt.hash(password, 10);
                    await admin.updateOne({password : hashedPass, vfcode : '0'});
                    res.json({status : 202, message : 'Password reset successful'});
                }
                else{
                    res.json({status : 203, message : 'Invalid verification code'});
                }
            }
            else{
                res.json({status : 404, message : 'Staff details not found'});
            }
        }
        else if(role === 'waiter'){
            const waiter = await Waiter.findOne({username});
            if(waiter){
                const savedVfCode = waiter.vfcode;
                if(savedVfCode == vfcode){
                    const hashedPass = await bcrypt.hash(password, 10);
                    await waiter.updateOne({password : hashedPass, vfcode : '0'});
                    res.json({status : 202, message : 'Password reset successful'});
                }
                else{
                    res.json({status : 203, message : 'Invalid verification code'});
                }
            }
            else{
                res.json({status : 404, message : 'Staff details not found'});
            }
        }
        else if(role === 'chef'){
            const chef = await Chef.findOne({username});
            if(chef){
                const savedVfCode = chef.vfcode;
                if(savedVfCode == vfcode){
                    const hashedPass = await bcrypt.hash(password, 10);
                    await chef.updateOne({password : hashedPass, vfcode : '0'});
                    res.json({status : 202, message : 'Password reset successful'});
                }
                else{
                    res.json({status : 203, message : 'Invalid verification code'});
                }
            }
            else{
                res.json({status : 404, message : 'Staff details not found'});
            }
        }
    }
    catch(error){
        res.json({status : 500, message : 'Internal Server error'});
    }
}

// const logoutUser = async (req, res)=>{
//     try{
//         console.log("User logged out");
//         /*
//         const id = req.id;
//         const username = req.username;
//         process logout request as needed
//         */
//         res.json({status : 200, message : 'logout successful'});
//     }
//     catch(error){
//         res.json({status : 500, message : 'Internal Server error'});
//     }
// }

module.exports = {
    loginStaff, forgotPasswordStaff, resetPasswordStaff
}