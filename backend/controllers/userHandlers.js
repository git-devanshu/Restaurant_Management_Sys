const {User} = require('../models/userModel');
const bcrypt = require('bcryptjs');
const {sendSignupMail, sendVFCodeMail} = require('../utils/sendMail');
const {generateVerificationCode} = require('../utils/helperFunctions');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signupUser = async (req, res) =>{
    try{
        const {name, email, username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            const hashedPass = await bcrypt.hash(password, 10);
            const newUser = new User({
                name, 
                email, 
                username, 
                password : hashedPass
            });
            await newUser.save();
            sendSignupMail(email, name);
            res.json({status : 201, message : 'User registered successfully'});
        }
        else{
            res.json({status : 400, message : 'User already exists'});
        }
    }
    catch(error){
        res.json({status : 500, message : 'Internal Server error'});
    }
};

const loginUser = async (req, res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                res.json({status : 400, message : 'Invalid password'});
            }
            else{
                const token = jwt.sign({id : user._id, username : user.username, name: user.name, privilege : user.privilege}, process.env.SECRET);
                res.json({status : 202, message : 'Login successful', token});
            }
        }
        else{
            res.json({status : 404, message : 'User not found'});
        }
    }
    catch(error){
        res.json({status : 500, message : 'Internal Server error'});
    }
}

const forgotPassword = async (req, res)=>{
    try{
        const username = req.params.username;
        const user = await User.findOne({username});
        if(user){
            const email = user.email;
            const vfcode = generateVerificationCode(6);
            user.vfcode = vfcode;
            await user.save();
            sendVFCodeMail(email, vfcode);
            res.json({status : 200, message : 'Verification code sent your registered email id'});
        }
        else{
            res.json({status : 404, message : 'User not found'});
        }
    }
    catch(error){
        res.json({status : 500, message : 'Internal Server error'});
    }
}

const resetPassword = async (req, res)=>{
    try{
        const {vfcode, password} = req.body;
        const username = req.params.username;
        const user = await User.findOne({username});
        if(user){
            const savedVfCode = user.vfcode;
            if(savedVfCode == vfcode){
                const hashedPass = await bcrypt.hash(password, 10);
                await user.updateOne({password : hashedPass, vfcode : '0'});
                res.json({status : 202, message : 'Password reset successful'});
            }
            else{
                res.json({status : 203, message : 'Invalid verification code'});
            }
        }
        else{
            res.json({status : 404, message : 'User not found'});
        }
    }
    catch(error){
        res.json({status : 500, message : 'Internal Server error'});
    }
}

const logoutUser = async (req, res)=>{
    try{
        console.log("User logged out");
        /*
        const id = req.id;
        const username = req.username;
        process logout request as needed
        */
        res.json({status : 200, message : 'logout successful'});
    }
    catch(error){
        res.json({status : 500, message : 'Internal Server error'});
    }
}

module.exports = {
    signupUser,
    loginUser,
    forgotPassword,
    resetPassword,
    logoutUser
}