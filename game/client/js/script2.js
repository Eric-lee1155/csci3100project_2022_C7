var socket;
var myid;
var mynumber;
var array = [];//array of players
var movementX = 0;
var movementY = 0;
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
        this.angle = 0;

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
        
        this.draw = function () {
            fill(255, 0, 0);
            push();
            translate(this.x, this.y);
            rotate(this.angle);
            circle(0, 0, 50);
            circle(10,-25,20);
            circle(10,25,20);
            pop();
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
    var angle = atan2(mouseY - windowHeight/2, mouseX - windowWidth/2);
    socket.emit("inputdata", {mynumber, mouseX, mouseY, angle, windowWidth, windowHeight, movementX, movementY});
}

function checkcirclecollision(circle1, circle2){
    var collide = false;
    collide = collideCircleCircle(circle1.x, circle1.y, 50, circle2.x, circle2.y, 250);
    return collide;
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
    console.log(movementX,movementY);
  return false;
}

function preload() {
    // write code
}
function setup() {
    array=[]
    socket = io();
    socket.emit('ready', {name: '123'});
    socket.on('yourid', function(data){
        myid = data.id;
        mynumber = data.number;
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
        if(data.disconnectednumber < mynumber){
            mynumber--;
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
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    background(205,255,255);
    for(var i in array) {
        if(array[i].id === myid) {
            translate(width/2 - array[i].x, height/2 - array[i].y);
            console.log(array[i].speedX, array[i].speedY);
        }
    }
    
    
    //console.log(array);
    for (var i in arrayofobstacles){
        arrayofobstacles[i].draw();
    }
    for(var i in array) {
        for(var j = 0; j < array.length; j++){
            array[j].draw();
        }
    }
    /*for(var i in array){
        if(array[i].id === myid){
            for(var j in arrayofobstacles){
                if (checkcirclecollision(array[i],arrayofobstacles[j])){
                    socket.emit('collide', {player: i, object: j});
                    console.log('collide');
                    console.log(i);
                    break;
                    

                    }
                    
                
                if (checkcirclecollision(array[i],arrayofobstacles[j])==false){
                    socket.emit('uncollide', {player: i});
                    console.log('uncollide');
                }
                
                
            }
            break;
        }
    }*/
    input();
    //console.log(collideCircleCircle(1, 1, 50, 1, 1, 100));
    // write code
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
