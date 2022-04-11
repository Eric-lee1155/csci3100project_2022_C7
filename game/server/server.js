class Player {
    constructor(id, name, x, y, number) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.number = number;
        this.speedX = 0;
        this.speedY = 0;
        this.getinfo = function(){
            return{id: this.id,
                name: this.name,
                x: this.x,
                y: this.y,
                number: this.number
            }
        }
        return this;
    }
    

};
var path = require("path"); 
var http = require("http"); 

var express = require("express"); 
var socketIO = require("socket.io"); 

var publicPath = path.join(__dirname, '../client'); 
var port = process.env.PORT || 2000; 
var app = express(); 
var server = http.createServer(app); 
var io = socketIO(server); 
app.use(express.static(publicPath)); 
var ArrayofPlayers = [];
var playernumber = 0;

server.listen(port, function() {
    console.log("Server  running on port " + port); 
});


io.on('connection', function(socket) {
    console.log('someone conencted, Id: ' + socket.id);
    var player = {};

    socket.on('ready', function(data) {
        player = new Player(socket.id, data.name, data.x, data.y, playernumber);
        playernumber++;
        ArrayofPlayers.push(player);
        socket.emit('yourinfo', {
            id: player.id,
            name: player.name, 
            x: player.x, 
            y: player.y,
            number: player.number
        });
        socket.emit('getinfo', {info: geteveryoneinfo()});
        socket.broadcast.emit('newplayerinfo', player.getinfo());
        console.log(ArrayofPlayers);
        }); 
    socket.on("inputData", (data) => {   
        console.log(player);
        player.mouseX = data.mouseX;
        player.mouseY = data.mouseY;
        player.angle = data.angle;
        player.windowWidth = data.windowWidth;
        player.windowHeight = data.windowHeight;
    })
    socket.on("disconnect", () => {
        io.emit('Leave', {id: socket.id});

        ArrayofPlayers = ArrayofPlayers.filter((leave) => leave.id !== socket.id);
        if(playernumber > 0){
            playernumber--;
        }

    });
})
function geteveryoneinfo(){
    var info = [];
    for(let i in ArrayofPlayers){
        info.push(ArrayofPlayers[i].getinfo());
    }
    return info;
}


/*var path = require("path"); // this will find the path of any folder of our game
var http = require("http"); // for starting an online server
// npm install libraryName
var express = require("express"); // sending and recieving files // we need to download it
var socketIO = require("socket.io"); // sending and recieving information/data // we need to download it

var publicPath = path.join(__dirname, '../client'); // it simply adds two paths together ("E:/") joins ("class/client") = ("E:/class/client") 
var port = process.env.PORT || 2000; // this is the port that our server is using on a computer
var app = express(); // we initialize express library and we call it app
var server = http.createServer(app); // we create the server and the file responsibility is on app(express library)
var io = socketIO(server); // connecting the socket.io library to our server
app.use(express.static(publicPath)); // this sends client folder to each client who connects

// we run the server and we make sure it is started on the PORT
server.listen(port, function() {
    console.log("Server successfully runned on port " + port); // this will log something to the therminal
});

// the clients information will be stored in socket parameter
io.on('connection', function(socket) {
    console.log('someone conencted, Id: ' + socket.id);
    
})*/

