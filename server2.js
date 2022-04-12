// Before run this script in first time
// Please type "npm install express"
// Please type "npm install mongoose"
// Please type "npm install body-parser"
// Please type "npm install cookie-parser"

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());
let cookieTimeOut = '1200000'; // 20 mins

const dbURi = 'mongodb+srv://stu150:p351885-@csci2720.m2qbq.mongodb.net/stu150'; // this is my account =_=
const options = {
    user:'stu150',
    pass: 'p351885-',
    dbName: 'csci3100db'
}

const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.connect(dbURi);
//mongoose.connect(dbURi, options); // (useless)


// Database Connection
const db = mongoose.connection;
// Connection Failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Connection Success
db.once('open', function () {
    console.log('Connection is open...');
});


// Schema Definition
const UserSchema = schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    permission: { type: String, required: true }, // "none" or "user" or "admin"
    win_record: { type: Number, required: true },
    verifycode: { type: Number, required: true },
});
let User = mongoose.model('User', UserSchema);


// Handle aLL requests
// Public folder
app.use(express.static('public'));


// Signup
app.post('/signup', function(req, res){
    let form_name = req.body['name'];
    let form_email = req.body['email'];
    let form_password = req.body['password'];
    let randomcode = 1234;
    let condition = {email: form_email};
    
    
    User.create({
        name: form_name,
        email: form_email,
        password: form_password,
        permission: 'none', // "none" or "user" or "admin"
        win_record: 0,
        verifycode: randomcode,
    }, (err, result) => {
        if(err){
            res.send(err);
            console.log('Incorrect create');
        }else{
            // Not done (send email to verify) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            res.send(result + 'The verification code is ' + randomcode);
            console.log('The verification code is ' + randomcode);
        }
    });
});


// Login
app.post('/login', (req, res) => {
    let form_email = req.body['email'];
    let form_password = req.body['password'];
    let condition = {email: form_email, password: form_password };

    User.findOne(condition, (err, result) => {
        if(err){
            res.send('Incorrect email or password!(ERROR)');
            console.log('Incorrect email or password!(ERROR)');
        }

        if(result == null){
            res.send('Incorrect email or password!');
            console.log('Incorrect email or password!');
        }else{

            if(result.permission == 'none'){
                res.send('The account requires verification via email!');
                console.log('The account requires verification via email!');
            }else{
                res.send('Hi ' + result);
                console.log('Hi ' + result);
            }
        }
    });
});


// Verify
app.post('/verify', (req, res) => {
    let form_email = req.body['email'];
    let form_verifycode = req.body['verifycode'];
    let condition = {email: form_email, verifycode: form_verifycode };

    User.findOne(condition, (err, result) => {
        if(err){
            res.send('Incorrect email or verify_code!(ERROR)');
            console.log('Incorrect email or verify_code!(ERROR)');
        }

        if(result == null){
            res.send('Incorrect email or verify_code!');
            console.log('Incorrect email or verify_code!');
        }else{

            if(result.permission != 'none'){
                res.send('The account has already been activated!');
                console.log('The account has already been activated!');
            }else{
                result.permission = 'user';
                result.save();

                res.send('The account activated successfully!');
                console.log('The account activated successfully!');
            }
        }
    });
});

// testing area

app.all('/cookie', (req, res, next) => {
    res.cookie('email', 'tester02email', { maxAge: '300000'});
    res.cookie('password', '123456', { maxAge: '300000'});
    console.log('cookie created!!!!');
    next();
});


// Shutdown
app.all('/shutdown', (req, res) => {
    setTimeout(() => {
        app.close();
    }, 3000);
});


// Default routing
app.all('/*', (req, res) => {
    if (req.cookies.email === undefined) {
        res.cookie('email', '', { maxAge: '300000'});
    }
    if (req.cookies.password === undefined) {
        res.cookie('password', '', { maxAge: '300000'});
    }
    
    let condition = {email: req.cookies.email, password: req.cookies.password };
    User.findOne(condition, (err, result) => {
        if(err){
            res.sendFile(__dirname + '/index.html');
        }else if(result == null){
            res.sendFile(__dirname + '/index.html');
        }else{
            res.sendFile(__dirname + '/game.html');
        }
    });
});


// listen to port 3000
const server = app.listen(3000);