
var socket;
var myid;
var mynumber = 0;
var array = [];//array of players
var movementX = 0;
var movementY = 0;
var arrayofobstacles = [];
var ImReady = 0;
let button;
var gamestarted = 0;


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
        this.caught = 0;
        this.Ready = 0;
        this.team = 0;//0 hider 1hunter

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
        this.draw = function () {
            if (this.team == 1){
                fill(0, 0, 255);
            }
            else if (this.team == 0){
                fill(255, 0, 0);
            }
            push();
            translate(this.x, this.y);
            rotate(this.angle);
            circle(0, 0, 50);
            circle(10,-25,20);
            circle(10,25,20);
            pop();
            noFill();
            //this.x += this.speedX;
            //this.y += this.speedY;
        
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
        return this;
    }
} 

function input(){
    if(array[mynumber].caught == 0){
    var angle = atan2(mouseY - windowHeight/2, mouseX - windowWidth/2);
    socket.emit("inputdata", {mynumber, mouseX, mouseY, angle, windowWidth, windowHeight, movementX, movementY});
    }
}

function checkobstaclecollision(circle1, circle2){
    var collide = false;
    collide = collideCircleCircle(circle1.x, circle1.y, 50, circle2.x, circle2.y, 250);
    return collide;
}

function checkplayercollision(player1,player2){
    var collide = false;
    collide = collideCircleCircle(player1.x, player1.y, 50, player2.x, player2.y, 50);
    return collide;
}

function checkplayercollide(){
    for(var i in array){
        for(var j in array)
            if(i != j){
                
                if (checkplayercollision(array[i],array[j]) == true && array[i].team == 1){
                    socket.emit('Catch', {caughtnum: j});
                    array[j].caught = 1;
                    return;
                }
                else if (checkplayercollision(array[i],array[j]) == true && array[j].team == 1){
                    socket.emit('Catch', {caughtnum: i});
                    array[i].caught = 1;
                    return;
                }
            }
    }
}
function sendcaughttomiddle(){
    for(var i in array){
        if(array[i].caught == 1){
            array[i].x = 0;
            array[i].y = 0;
            socket.emit('sendcaught', {number: i})
        }
    }
}
function checkcollide(){
    for(var i in array){
        if(array[i].id === myid){
            for(var j in arrayofobstacles){
                if (checkobstaclecollision(array[i],arrayofobstacles[j])){
                    socket.emit('collide', {player: i, object: j});
                    return;
                }         
            }
            if(array[i].x >= 4475 || array[i].x <= -4475 || array[i].y >= 4475 || array[i].y <=-4475){
                socket.emit('collidewall', {player: i});
                return;
            }
            
            socket.emit('uncollide', {player: i});
            return;
        }
    }
    return;
}

function keyPressed() {
    if(key === "w") { 
        
            movementY += -5;
        
    }
    if(key === "s") { 
        
            movementY += 5;
        
    }
    if(key === "a") { 
        
            movementX += -5;
        
    }
    if(key === "d") { 
        
            movementX += 5;
        
    }
}

function keyReleased() {
    if(key === "w") { 
        movementY -= -5;
    }
    if(key === "s") { 
        movementY -= 5;
    }
    if(key === "a") { 
        movementX -= -5;
    }
    if(key === "d") { 
        movementX -= 5;
    }
    //console.log(movementX,movementY);
  return false;
}

function ReadyForGame(){
    if(ImReady == 0){
        ImReady = 1;
    }
    else if (ImReady == 1){
        ImReady = 0;
    }
    array[mynumber].Ready = ImReady;
}

function preload() {
}

function setup() {
    console.log(ImReady);
    array=[];
    
        /*socket = io.connect('http://localhost:2000', {
        'reconnect': false
    });*/
    socket = io();
        socket.emit('ready', {name: '123'});
        socket.on('yourid', function(data){
            myid = data.id;
            mynumber = data.number;
            //console.log('mynumis', mynumber);
        })
        socket.on('newplayer', function(data){
            var player = new Player(data.id, data.name, data.x, data.y, data.number);
            array.push(player);
        })
        socket.on('otherplayerdata', function(data){
            for(var i in data.arrayofotherplayerdata){
                var player = new Player(data.arrayofotherplayerdata[i].id, data.arrayofotherplayerdata[i].name, data.arrayofotherplayerdata[i].x, data.arrayofotherplayerdata[i].y, data.arrayofotherplayerdata[i].number)
                array.push(player);
            }
        })
        socket.on('obstacledata', function(data){
            for(var i in data.obstacledata){
                var obstacle = new Obstacle(data.obstacledata[i].type, data.obstacledata[i].x, data.obstacledata[i].y);
                arrayofobstacles.push(obstacle);
            }
        })
        socket.on('playerleft', function(data){
            for(var i in array) {
                if(array[i].id === data.id) {
                    array.splice(i, 1);
                }
            }
            if(data.number < mynumber){
                mynumber--;
                console.log(mynumber);
                for(var i in array) {
                    if(array[i].id === myid) {
                        array[i].number = mynumber;
                        socket.emit('updateplayernumber', array[i].getplayerdata());
                    }
                }
            }
        })
        socket.on("infoupdate", function(data) {
            for(var i in data.arrayofupdatedinfo) {
                for(var j in array) {
                    if(array[j].id === data.arrayofupdatedinfo[i].id) {
                        array[j].x = data.arrayofupdatedinfo[i].x;
                        array[j].y = data.arrayofupdatedinfo[i].y;
                        array[j].speedX = data.arrayofupdatedinfo[i].speedX;
                        array[j].speedY = data.arrayofupdatedinfo[i].speedY;
                        array[j].angle = data.arrayofupdatedinfo[i].angle;
                    }
                }
            }
        });
        socket.on('catchupdate', function(data){
            array[data.caughtnum].caught = 1;
        })
        socket.on('GameStart', function(data){
            gamestarted = 1;
            for(var i in array){
                if(i == data.seeker){
                    array[i].team = 1;
                    //console.log(data.seeker);
                    //console.log(array[i]);
                }
            }
            
        })
        socket.on('GameStartUpdate', function(data){
            for(var i in array){
                array[i].x = data.x;
                array[i].y = data.y;
            }
            
        })
        socket.on('GG',function(){
            for(var i in array){
                array[i].team = 0;
                array[i].caught = 0;
                array[i].Ready = 0;
            }
            ImReady = 0;
            gamestarted = 0;
        })
    createCanvas(windowWidth, windowHeight);
    button = createButton('ReadyToPlay');
    button.position(0,0);
    button.mousePressed(ReadyForGame);
    
}



function draw() {
    background(88,155,0);
    socket.on('connect_error', function (err) {
        socket.disconnect();
    });
    console.log(array[mynumber]);
    //console.log(mynumber);

    socket.emit('GameReady', {number: mynumber, Ready: ImReady});
        
    if (gamestarted == 1 && ImReady == 1){
        for(var i in array) {
            if(array[i].id === myid) {
                translate(width/2 - array[i].x, height/2 - array[i].y);
                //console.log(array[i].speedX, array[i].speedY);
                //console.log(array[i]);
            }
        }

        

        rectMode(CENTER);
        push();
        strokeWeight(10);
        stroke(51);
        rect(0, 0, 9000, 9000);
        pop();
        
        for (var i in arrayofobstacles){
            arrayofobstacles[i].draw();
        }
        for(var i in array) {
            for(var j = 0; j < array.length; j++){
                array[j].draw();
            }
        }
        checkcollide();
        checkplayercollide();
        input();
        sendcaughttomiddle();
        //checkGG
    }

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
