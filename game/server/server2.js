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

var playercount = 0;
var array = [];//array of players
var arrayofobstacles = [];

class Player {
    constructor(id, name, x, y, number) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.number = number;
        this.speedX = 0;
        this.speedY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.angle = 0;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.upperX = 5;
        this.lowerX = -5;
        this.upperY = 5;
        this.lowerY = -5;

        /*this.changeplayerspeed = function(changeX, changeY){
            this.speedX += changeX;
            this.speedY += changeY;
        }*/
        this.setspeedlimit = function(upperX, lowerX, upperY, lowerY){
            this.upperX = upperX;
            this.lowerX = lowerX;
            this.upperY = upperY;
            this.lowerY = lowerY;
        }
        this.resetspeedlimit = function(){
            this.upperX = 5;
            this.lowerX = -5;
            this.upperY = 5;
            this.lowerY = -5;
        }

        this.getplayerdata = function(){
            return{id: this.id,
                name: this.name,
                x: this.x,
                y: this.y,
                number: this.number
            }
        }
        this.getplayerinfo = function(){
            return{id: this.id,
                name: this.name,
                x: this.x,
                y: this.y,
                speedX: this.speedX,
                speedY: this.speedY,
                angle: this.angle,
                number: this.number
            }
        }
        
        this.move = function(){
            if (this.speedX > this.upperX){
                this.x += this.upperX;
            }
            else if(this.speedX < this.lowerX){
                this.x += this.lowerX;
            }
            else{
                this.x += this.speedX;
            }

            if (this.speedY > this.upperY){
                this.y += this.upperY;
            }
            else if(this.speedY < this.lowerY){
                this.y += this.lowerY;
            }
            else{
                this.y += this.speedY;
            }
        }

        this.updateinfo = function(){
            this.move();
        }
        
        return this;
    }
} 

class Obstacle{
    constructor(type, x, y){
        this.type = type;
        this.x = x;
        this.y = y;
    
        this.draw = function (){
            fill(211, 211, 211);
            circle(this.x, this.y, 250);
        };
        this.getobstacleinfo = function(){
            return{
                type: this.type,
                x: this.x,
                y: this.y
            }
        };
        return this;
    }
} 



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function ObjectGeneration(){
    var numberofobstacles = 10 + getRandomInt(11);
    for(i = 0; i <= numberofobstacles; i++){
        var tempX = getRandomInt(3000);
        var tempY = getRandomInt(3000);
        var alreadyexist = checkspawnblock(tempX, tempY);
        /*for (j = 0; j < i; j++){
            var Xdistance = Math.abs(arrayofobstacles[j].x - tempX);
            var Ydistance = Math.abs(arrayofobstacles[j].y - tempY);
            if(Xdistance <= 500 && Ydistance <= 500){
                alreadyexist = 1;
                break;
            }
        }*/
        if (alreadyexist == 0){
            arrayofobstacles[i] = new Obstacle("rock", tempX, tempY);
        }
        else{
            i--;
        }
    }
}


/*function collisionhandle(collidedplayernumber, collidedobstacle){
    if (collidedobstacle.x > array[collidedplayernumber].x){
        array[collidedplayernumber].setspeedlimit(0, -5, 5, -5);
    }
    else{
        array[collidedplayernumber].setspeedlimit(5, 0, 5, -5);
    }
    if (collidedobstacle.y > array[collidedplayernumber].y){
        array[collidedplayernumber].setspeedlimit(5, -5, 0, -5);
    }
    else {
        array[collidedplayernumber].setspeedlimit(5, -5, 5, 0);
    }
    
}*/

function getobstacledata(){
    var obstacledata = [];
    for(var i in arrayofobstacles){
        obstacledata.push(arrayofobstacles[i].getobstacleinfo());
    }
    return obstacledata;
}
function checkspawnblock(X, Y){
    for (var j in arrayofobstacles){
        var Xdistance = Math.abs(arrayofobstacles[j].x - X);
        var Ydistance = Math.abs(arrayofobstacles[j].y - Y);
        if(Xdistance <= 500 && Ydistance <= 500){
            return 1;
        }
    }
    for (var i in array){
        var Xdistance2 = Math.abs(array[i].x - X);
        var Ydistance2 = Math.abs(array[i].y - Y);
        if(Xdistance2 <= 500 && Ydistance2 <= 500){
            return 1;
        }
    }
    return 0;
}
function getotherplayerdata() {
    var arrayofotherplayerdata = [];
    for(var i in array) {
        arrayofotherplayerdata.push(array[i].getplayerinfo());
    }
    return arrayofotherplayerdata;
}

function updategameinfo(){
    var arrayofupdatedinfo = [];
    for(var i in array){
        array[i].updateinfo();
        arrayofupdatedinfo.push(array[i].getplayerinfo());
    }
    io.emit('infoupdate', {arrayofupdatedinfo});
}

server.listen(port, function() {
    console.log("Server successfully runned on port " + port);
    ObjectGeneration();
});


io.on('connection', function(socket) {
    console.log('someone conencted, Id: ' + socket.id);
    var player = {};
    socket.on('ready', function(data){
        while(true){
        var tempx = getRandomInt(3000);
        var tempy = getRandomInt(3000);
        var blocked = checkspawnblock(tempx,tempy);
        if (blocked == 0){
            player = new Player(socket.id, data.name, tempx, tempy, playercount);
            break;
        }
        
    }
        playercount++;
        array.push(player);
        socket.emit('yourid', {id: player.id, number: player.number});
        socket.broadcast.emit('newplayer', player.getplayerdata());
        socket.emit('otherplayerdata', {arrayofotherplayerdata: getotherplayerdata()});
        socket.emit('obstacledata', {obstacledata: getobstacledata()});
    })
    socket.on('inputdata', function(data){
            player.angle = data.angle;
            player.windowWidth = data.windowWidth;
            player.windowHeight = data.windowHeight;
            player.speedX = data.movementX;
            player.speedY = data.movementY;
            
    })
    socket.on("disconnect", () => {
        for(var i = 0;i < array.length; i++){
            if(array[i].id == socket.id){
                var disconnectednumber = array[i].number;
            }
        }
        io.emit('playerleft', {id: socket.id, nubmer: disconnectednumber});
        array = array.filter((someid) => someid.id !== socket.id);
    });
    /*socket.on('collide', function(data){
        collisionhandle(data.player, arrayofobstacles[data.object]);
    })
    socket.on('uncollide', function(data){
        array[data.player].resetspeedlimit();
    })*/
})
setInterval(function(){
    /*for(var i in array){
        array[i].resetspeedlimit();
    }*/
    updategameinfo();
},10)

