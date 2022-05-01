// Before run this script in first time
// Please type "npm install express"
// Please type "npm install mongoose"
// Please type "npm install body-parser"
// Please type "npm install cookie-parser"
// Please type "npm install socket.io"

const port = 3000;
const cookieTimeOut = 600000; // 10 mins

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

const cors = require('cors'); // test!!!!!( delete this after all complete )
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
});
let User = mongoose.model('User', UserSchema);


// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    console.log('Connection is open...');


    // handle request here
    // test!!!!!( delete this after all complete )
    app.post('/test', cors(), (req, res) => {
        res.cookie('login', 'none', {maxAge: cookieTimeOut});
        
        console.log('Casdasdopen...');
        res.send({sssd:"123"});
    });


    // auto-login
    app.all('/*', (req, res, next) => {


        if (req.cookies.login == undefined) {
            res.cookie('login', 'none', {maxAge: cookieTimeOut});
            next();
        }else if(req.cookies.login == 'admin'){
            res.send('Go to admin page');
        }else if(req.cookies.login == 'user'){
            res.send('Go to user page');
        }
    });


    // login
    app.post('/login', (req, res) => {
        User.findOne({
            username: req.body['username'],
            password: req.body['password'],
        }, (err, result) => {
            if(err){
                console.log('login error');
                res.send('Server error occurred');
            }else if(result == null){
                console.log('login fail');
                res.send('Invalid username or password');
            }else{
                if(result.permission == 'none'){
                    console.log('login fail');
                    res.send('Account requires verification via email');
                }else{
                    res.cookie('username', result.username, {maxAge: cookieTimeOut});
                    res.cookie('password', result.password, {maxAge: cookieTimeOut});
                    res.cookie('permission', result.permission, {maxAge: cookieTimeOut});
                    console.log('login okay');
                    res.send('Login successfully');
                }
            }
        });
    });


    // logout
    app.get('/logout', (req, res) => {
        res.cookie('username', '', {maxAge: -1});
        res.cookie('password', '', {maxAge: -1});
        res.cookie('permission', '', {maxAge: -1});
        console.log('logout okay');
        res.send('Logout successfully');
    });


    // signup
    app.post('/signup', (req, res) => {
        User.create({
            name: req.body['name'],
            email: req.body['email'],
            password: req.body['password'],
            permission: 'none', // 'none' or 'user' or 'admin'
            verifycode: 1234, // test!!!!!
            win_record: 0,
        }, (err, result) => {
            if(err){
                console.log('create fail');
                res.send('Username already exists');
            }else{
                console.log('create okay');
                res.send('Account created successfully')
            }
        });
    });


    // verify
    app.post('/verify', (req, res) => {
        User.findOne({
            username: req.body['username'],
            password: req.body['password'],
        }, (err, result) => {
            if(err){
                res.send('Here is error');
            }else if(result == null){
                res.send('Invalid username or password!');
            }else if(result.permission){
                res.cookie('login', 'admin', { maxAge: cookieTimeOut});
                res.cookie('username', result.username);
                res.send('Go to admin page');
            }else{
                res.cookie('login', 'user', { maxAge: cookieTimeOut});
                res.cookie('username', result.username);
                res.send('Go to user page');
            }
        })
    });


    // forget
    app.post('/verify', (req, res) => {
        User.findOne({
            username: req.body['username'],
            password: req.body['password'],
        }, (err, result) => {
            if(err){
                res.send('Here is error');
            }else if(result == null){
                res.send('Invalid username or password!');
            }else if(result.permission){
                res.cookie('login', 'admin', { maxAge: cookieTimeOut});
                res.cookie('username', result.username);
                res.send('Go to admin page');
            }else{
                res.cookie('login', 'user', { maxAge: cookieTimeOut});
                res.cookie('username', result.username);
                res.send('Go to user page');
            }
        })
    });


    // modify
    app.put('/modify', (req, res) => {
        User.findOne({
            username: req.body['username'],
            password: req.body['password'],
        }, (err, result) => {
            if(err){
                res.send('Here is error');
            }else if(result == null){
                res.send('Invalid username or password!');
            }else if(result.permission){
                res.cookie('login', 'admin', { maxAge: cookieTimeOut});
                res.cookie('username', result.username);
                res.send('Go to admin page');
            }else{
                res.cookie('login', 'user', { maxAge: cookieTimeOut});
                res.cookie('username', result.username);
                res.send('Go to user page');
            }
        })
    });


    // delete
    app.put('/delete', (req, res) => {
        User.findOne({
            username: req.body['username'],
            password: req.body['password'],
        }, (err, result) => {
            if(err){
                res.send('Here is error');
            }else if(result == null){
                res.send('Invalid username or password!');
            }else if(result.permission){
                res.cookie('login', 'admin', { maxAge: cookieTimeOut});
                res.cookie('username', result.username);
                res.send('Go to admin page');
            }else{
                res.cookie('login', 'user', { maxAge: cookieTimeOut});
                res.cookie('username', result.username);
                res.send('Go to user page');
            }
        })
    });


    // delete all users (warning)
    app.get('/initial', (req, res) => {
        // reset index in DB (debug only)
        User.syncIndexes();

        User.deleteMany({}, (err, results) => {
            if(err){
                res.status(500);
                res.send('Server error occurred');
            }else{
                res.status(200);
                res.send('Initial successfully');
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
    app.use(express.static('public'));


    // handle default
    app.all('/*', (req, res) => {
        res.send('This page is not available!');
    });
});


const server = app.listen(port);