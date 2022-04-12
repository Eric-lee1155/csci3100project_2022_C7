// Before run this script in first time
// Please type "npm install express"
// Please type "npm install mongoose"
// Please type "npm install body-parser"
// Please type "npm install cookie-parser"
// Please type "npm install socket.io"

const port = 3000;
const http = require('http');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());
let cookieTimeOut = 600000; // 10 mins

const dbURi = 'mongodb+srv://stu150:p351885-@csci2720.m2qbq.mongodb.net/stu150'; // this is my account =_=
const options = {
    user:'stu150',
    pass: 'p351885-',
    dbName: 'csci3100db'
}

const mongoose = require('mongoose');
const { nextTick } = require('process');
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

// Root routing
app.get('/', (req, res) => {
    if (req.cookies.email == undefined) {
        res.cookie('email', '', { maxAge: cookieTimeOut});
        res.cookie('password', '', { maxAge: cookieTimeOut});
        res.cookie('login', 'false', { maxAge: cookieTimeOut});
    }
    console.log('email:' + req.cookies.email);
    console.log('password:' + req.cookies.password);
    console.log('login:' + req.cookies.login);

    let condition = { email: req.cookies.email, password: req.cookies.password };
    User.findOne(condition, (err, result) => {
        if(err){
            res.sendFile(__dirname + '/public/index.html');
            //res.status(301).redirect("https://www.google.com");
            //res.redirect("https://www.google.com");
        }else if(result == null){
            res.sendFile(__dirname + '/public/index.html');
            //res.redirect("https://www.google.com");
        }else{
            res.cookie('login', 'true', { maxAge: cookieTimeOut});
            res.sendFile(__dirname + '/public/index.html');
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






// testing area (cookie)

app.all('/cookie', (req, res, next) => {
    console.log('cookie created!');
    res.cookie('email', 'tester02email', { maxAge: cookieTimeOut});
    res.cookie('password', '123456', { maxAge: cookieTimeOut});
    next();
});

//test only
app.post('/test', (req, res) => {
    let form_email = req.body['email'];
    let form_password = req.body['password'];
    let condition = {email: form_email, password: form_password };

    User.findOne(condition, (err, result) => {
        if(err){
            res.redirect(__dirname + '/signup');
            console.log('Incorrect email or password!(ERROR)');
        }

        if(result == null){
            res.redirect('https://app.example.io');
            console.log('Incorrect email or password!');

        }else{

            if(result.permission == 'none'){
                res.location(__dirname + '/signup');
                console.log('The account requires verification via email!');
            }else{
                res.send("{value: 'true', message: 'Welcome!'}");
                console.log('Hi ' + result);
            }
        }
    });
});


// Shutdown
app.all('/shutdown', (req, res) => {
    setTimeout(() => {
        app.close();
    }, 3000);
});


// Public static folder
app.use(express.static('public'));
app.use(express.static('server'));
app.use(express.static('client'));
app.use(express.static('library'));
app.use(express.static('p5.collide2D-0.7.3'));


// Default redicting
app.all('/*', (req, res) => {
    if (req.cookies.email == undefined) {
        res.cookie('email', '', { maxAge: cookieTimeOut});
        res.cookie('password', '', { maxAge: cookieTimeOut});
    }
    console.log('email:' + req.cookies.email);
    console.log('password:' + req.cookies.password);
    let idd = 0;
    let condition = { email: req.cookies.email, password: req.cookies.password };
    User.findOne(condition, (err, result) => {
        if(err){
            if(idd == 0){
                res.sendFile(__dirname + '/public/index.html');
                idd += 1;
            }else{
                res.redirect('/signup');
            }
            
        }else if(result == null){
            if(idd == 0){
                res.sendFile(__dirname + '/public/index.html');
                idd += 1;
            }else{
                res.redirect('/signup');
            }
        }else{
            res.sendFile(__dirname + '/client/index.html');
        }
    });
});


// listen to port 3000
//const server = app.listen(3000);
const server = http.createServer(app);
server.listen(port, function(){
    console.log("The main sever has been set up on port " + port);
    //game.servertakeover(server);
    //game.rungameengine();
});
