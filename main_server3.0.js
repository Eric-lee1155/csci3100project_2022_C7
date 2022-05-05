// Before run this script in first time
// Please type "npm install express"
// Please type "npm install mongoose"
// Please type "npm install body-parser"
// Please type "npm install cookie-parser"
// Please type "npm install socket.io"

const port = 3000;
const cookieTimeOut = 900000; // 15 mins

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const dbURi = 'mongodb+srv://stu150:p351885-@csci2720.m2qbq.mongodb.net/stu150'; // this is my account =_=
const options = {
    user:'stu150',
    pass: 'p351885-',
    dbName: 'csci3100db'
}

const mongoose = require('mongoose');
mongoose.connect(dbURi);
const db = mongoose.connection;


// create schema
const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    permission: {type: String, required: true}, // 'none' or 'user' or 'admin'
    verifycode: {type: Number, required: true},
    win_record: {type: Number, required: true},
    photo: {data: Buffer, contentType: String}
});
let User = mongoose.model('User', UserSchema);


// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    console.log('Connection is open...');


    // handle request here
    // root (auto-login)
    app.all('/', (req, res) => {
        User.findOne({
            email: req.cookies.email,
            password: req.cookies.password
        }, (err, result) => {
            if(err){
                console.log('[FAIL] login (auto)');
                res.sendFile(__dirname + '/other/login.html');
            }else if(result == null){
                console.log('[FAIL] login (auto)');
                res.sendFile(__dirname + '/other/login.html');
            }else{
                if(result.permission == 'none'){
                    console.log('[OKAY] login (auto)');
                    res.sendFile(__dirname + '/other/account.html');
                }else{
                    console.log('[OKAY] login (auto)');
                    res.sendFile(__dirname + '/other/account.html');
                }
            }
        });
    });


    // login
    app.post('/login', (req, res) => {
        User.findOne({
            email: req.body['email'],
            password: req.body['password']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] login');
                res.send({state: 0, message: 'Server error occurred'});
            }else if(result == null){
                console.log('[FAIL] login');
                res.send({state: 0, message: 'Invalid email or password'});
            }else{
                if(result.permission == 'none'){
                    console.log('[FAIL] login');
                    res.send({state: 1, message: 'Account requires verification via email'});
                }else{
                    res.cookie('email', result.email, {maxAge: cookieTimeOut});
                    res.cookie('password', result.password, {maxAge: cookieTimeOut});
                    res.cookie('permission', result.permission, {maxAge: cookieTimeOut});
                    console.log('[OKAY] login');
                    res.send({state: 2, message: 'Account logged in successfully'});
                }
            }
        });
    });


    // logout
    app.get('/logout', (req, res) => {
        res.cookie('email', '', {maxAge: -1});
        res.cookie('password', '', {maxAge: -1});
        res.cookie('permission', '', {maxAge: -1});
        console.log('[OKAY] logout');
        res.send({state: 2, message: 'Account logged out successfully'});
    });


    // signup
    app.post('/signup', (req, res) => {
        User.create({
            name: req.body['name'],
            email: req.body['email'],
            password: req.body['password'],
            permission: 'none', // 'none' or 'user' or 'admin'
            verifycode: Math.floor(Math.random() * 8999) + 1000,
            win_record: 0
        }, (err, result) => {
            if(err){
                console.log('[FAIL] signup');
                res.send({state: 0, message: 'Email has already been used'});
            }else{
                console.log('[OKAY] signup');
                res.send({state: 1, message: 'Account created successfully\nVerify code sent to email', verifycode: result.verifycode});
            }
        });
    });


    // verify
    app.post('/verify', (req, res) => {
        User.findOne({
            email: req.body['email'],
            verifycode: req.body['verifycode']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] verify');
                res.send({state: 0, message: 'Server error occurred'});
            }else if(result == null){
                console.log('[FAIL] verify');
                res.send({state: 0, message: 'Invalid email or verifycode'});
            }else{
                console.log('[OKAY] verify');
                res.send({state: 1, message: 'Account verified successfully'});
            }
        });
    });


    // forget (re-generate verifycode)
    app.post('/forget', (req, res) => {
        User.findOne({
            email: req.body['email']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] forget');
                res.send({state: 0, message: 'Server error occurred'});
            }else if(result == null){
                console.log('[FAIL] forget');
                res.send({state: 0, message: 'Invalid email'});
            }else{
                result.verifycode = Math.floor(Math.random() * 8999) + 1000;
                result.save();
                console.log('[OKAY] forget');
                res.send({state: 1, message: 'Verify code sent to email', verifycode: result.verifycode});
            }
        });
    });


    // modify
    app.post('/modify', (req, res) => {
        let combination = {};
        if(req.body['name'] != undefined && req.body['name'] != ""){
            combination = Object.assign(combination, {name: req.body['name']});
        }
        if(req.body['email'] != undefined && req.body['email'] != ""){
            combination = Object.assign(combination, {email: req.body['email']});
        }
        if(req.body['password'] != undefined && req.body['password'] != ""){
            combination = Object.assign(combination, {password: req.body['password']});
        }
        if(req.body['permission'] != undefined && req.body['permission'] != ""){
            combination = Object.assign(combination, {permission: req.body['permission']});
        }
        if(req.body['win_record'] != undefined && req.body['win_record'] != ""){
            combination = Object.assign(combination, {win_record: req.body['win_record']});
        }

        User.findOneAndUpdate({
            email: req.body['source_email']
        }, combination, (err, result) => {
            if(err){
                console.log('[FAIL] modify');
                res.send({state: 0, message: 'Invalid email'});
            }else{
                console.log('[OKAY] modify');
                res.send({state: 1, message: 'Account modified successfully'});
            }
        });
    });


    // delete
    app.post('/delete', (req, res) => {
        User.findOneAndDelete({
            email: req.body['email']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] delete');
                res.send({state: 0, message: 'Invalid email'});
            }else{
                console.log('[OKAY] delete');
                res.send({state: 1, message: 'Account deleted successfully'});
            }
        });
    });


    // account
    app.get('/account', (req, res) => {
        User.findOne({
            email: req.cookies.email,
            password: req.cookies.password
        }, (err, result) => {
            if(err){
                console.log('[FAIL] account');
                res.send({state: 0, message: 'Server error occurred'});
            }else{
                if(result == null){
                    console.log('[FAIL] account');
                    res.send({state: 0, message: 'Access requires logging in'});
                }else{
                    console.log('[OKAY] account');
                    let combination = {state: 1, message: 'Account accessed successfully'};
                    combination = Object.assign(combination, result);
                    res.send(combination);
                }
            }
        });
    });


    // account_all (without error message)
    app.get('/account_all', (req, res) => {
        if(req.cookies.permission != 'admin'){
            console.log('[FAIL] account_all');
            res.send([]);
        }else{
            User.find({}, (err, results) => {
                if(err){
                    console.log('[FAIL] account_all');
                    res.send([]);
                }else{
                    console.log('[OKAY] account_all');
                    res.send(results);
                }
            });
        }
    });


    // delete all users (warning)
    app.get('/initial', (req, res) => {
        // reset index in DB (debug only)
        User.syncIndexes();

        User.deleteMany({}, (err, results) => {
            if(err){
                console.log('[FAIL] initial');
                res.send({state: 0, message: 'Server error occurred'});
            }else{
                console.log('[OKAY] initial (WARNING)');
                res.send({state: 1, message: 'Initial successfully'});
            }
        });
    });
    

    // shutdown
    app.all('/shutdown', (req, res) => {
        setTimeout(() => {
            app.close();
        }, 3000);
    });


    // static folder
    app.use(express.static('other'));


    // handle default
    app.all('/*', (req, res) => {
        res.send('This page is not available!');
    });
});


const server = app.listen(port);
