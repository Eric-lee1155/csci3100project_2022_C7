const serverURL = 'mongodb+srv://stu150:p351885-@csci2720.m2qbq.mongodb.net/stu150'; // this is my account =_=
const mongoose = require('mongoose');
mongoose.connect(serverURL);

const express = require('express');
const app = express();

// Database Connection
const db = mongoose.connection;
// Connection Failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Connection Success
db.once('open', function () {
    console.log("Connection is open...");

});
// handle ALL requests
app.all('/', function(req, res){
    res.sendFile('game.html');
});

// listen to port 3000
const server = app.listen(3000);