var socket;
var myplayer = {};
var myID;
var mynumber;
var ArrayofPlayers = [];

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

        this.getinfo = function(){
            return{id: this.id,
                name: this.name,
                x: this.x,
                y: this.y,
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
            this.x += this.speedX;
            this.y += this.speedY;
            pop();
        
        } 
        return this;
    };

        
    
}
class Obstacle{
    constructor(type, x, y){
        this.type = type;
        this.x = x;
        this.y = y;
    
        this.draw = function (){
            fill(211, 211, 211);
            circle(this.x, this.y, 100);
        };
        return this;
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function Input() {
    speedY = ArrayofPlayers[mynumber].a;
    speedX = ArrayofPlayers[mynumber].a;
    var angle = atan2(mouseY - windowHeight/2, mouseX - windowWidth/2);
    console.log(speedY);
    socket.emit("inputData", {mouseX, mouseY, angle, windowWidth, windowHeight, speedX , speedY});
}

function keyPressed() {
    if(key === "w") { 
        ArrayofPlayers[mynumber].speedY += -5;
    }
    if(key === "s") { 
        ArrayofPlayers[mynumber].speedY += 5;
    }
    if(key === "a") { 
        ArrayofPlayers[mynumber].speedX += -5;
    }
    if(key === "d") { 
        ArrayofPlayers[mynumber].speedX += 5;
    }
}

function keyReleased() {
    if(key === "w") { 
        ArrayofPlayers[mynumber].speedY -= -5;
        console.log(ArrayofPlayers);
        console.log(mynumber);
    }
    if(key === "s") { 
        ArrayofPlayers[mynumber].speedY -= 5;
    }
    if(key === "a") { 
        ArrayofPlayers[mynumber].speedX -= -5;
    }
    if(key === "d") { 
        ArrayofPlayers[mynumber].speedX -= 5;
    }
  return false;
}

function preload(){

}
function setup(){
    socket = io();
    socket.emit('ready', {
        name: '123',
        x: 100,
        y: 100
    });
    
    socket.on('yourinfo', function(data){
         myID = data.id;
         mynumber = data.number;
         myplayer = new Player(data.id, data.name, data.x, data.y, data.number);
         console.log(myID);
    })
    socket.on('getinfo', function(data){
        for(var i in data.info){
            var player = new Player(data.info[i].id, data.info[i].name, data.info[i].x, data.info[i].y, data.info[i].number)
            ArrayofPlayers.push(player);
        }
        //ArrayofPlayers.push(myplayer);
    })
    
    socket.on('newplayerinfo', function(data){
        /*for(let i = 0;i < data.length; i++){
            ArrayofPlayers[i] = data[i];
        }*/
        var player = new Player(data.id, data.name, data.x, data.y, data.number);
        ArrayofPlayers.push(player);
    })
    socket.on("Leave", function(data) {
        for(var i in ArrayofPlayers) {
            if(ArrayofPlayers[i].id === data.id) {
                ArrayofPlayers.splice(i, 1);
            }
        }
        mynumber--;
    });

    createCanvas(windowWidth, windowHeight);
    rock1 = new Obstacle("rock", 500,500);
    rock2 = new Obstacle("rock", 50,50);
    rock3 = new Obstacle("rock", 700,700);
    translate(myplayer.x, myplayer.y);
    
}
function draw(){
    background(205,255,255);
    //translate(width/2 - myplayer.x, height/2 - myplayer.y);
    for(let i in ArrayofPlayers){
        if(ArrayofPlayers[i].id === myID) {
            translate(width/2 - ArrayofPlayers[i].x, height/2 - ArrayofPlayers[i].y);
        }
        ArrayofPlayers[i].draw();
        //myplayer.draw();
    }
    Input();
    rock1.draw();
    rock2.draw();
    rock3.draw();

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  /*var socket;
  var playerNum1;
  var playerNum2;
  
  
  // everything about the (loading) before the game starts
  function preload() {
      // write code
  }
  
  // this is the firs thing that is called when the game is started, and it only happens once (Setup)
  function setup() {
      socket = io();
      socket.emit("message", "Hello, Im devlogerio connecting to your server");
      socket.on('messageFromServer', function(data) {
          console.log(data);
      })
      // write code
      playerNum1 = new Player('Devlogerio', 0, 50);
      playerNum2 = new Player('Devlogerio', 50, 100);
  
      createCanvas(windowWidth, windowHeight);
  }
  
  // this is called alot of times per second (FPS, frame per second)
  function draw() {
      background(51, 51, 255); // it gets a hex/rgb color
      translate(width/2 - playerNum1.x, height/2 - playerNum1.y);
      
      fill(51);
      rect(0, 0, 600, 600);
  
      playerNum1.draw();
      playerNum2.draw();
  }
  
  function keyPressed() {
      if(key === "w") { // == === && ||
          playerNum1.speedY = -5;
      }
      if(key === "s") { // == === && ||
          playerNum1.speedY = 5;
      }
      if(key === "a") { // == === && ||
          playerNum1.speedX = -5;
      }
      if(key === "d") { // == === && ||
          playerNum1.speedX = 5;
      }
  }
  
  function keyReleased() {
      if(key === "w") { // == === && ||
          playerNum1.speedY = 0;
      }
      if(key === "s") { // == === && ||
          playerNum1.speedY = 0;
      }
      if(key === "a") { // == === && ||
          playerNum1.speedX = 0;
      }
      if(key === "d") { // == === && ||
          playerNum1.speedX = 0;
      }
    return false;
  }
  
  // The player object constructor
  class Player {
      constructor(name, x, y) {
          this.name = name;
          this.x = x;
          this.y = y;
          this.speedX = 0;
          this.speedY = 0;
  
          this.draw = function () {
              var angle = atan2(mouseY - this.y, mouseX - this.x);
              push();
              fill(255, 0, 0);
              beginShape();
              vertex(this.x + 0, this.y + 0);
              vertex(this.x + (-30), this.y + 90);
              vertex(this.x + 0, this.y + 75);
              vertex(this.x + 30, this.y + 90);
              endShape(CLOSE);
  
              var angle = atan2(mouseY - this.y, mouseX - this.x);
              //console.log(mouseY - this.y);
              fill(255, 0, 0);
              push();
              translate(this.x, this.y);
              rotate(angle);
              circle(0, 0, 50);
              circle(10,-25,30);
              circle(10,25,30);
              this.x += this.speedX;
              this.y += this.speedY;
              pop();
              
              this.x += this.speedX;
              this.y += this.speedY;
          };
  
          return this;
      }
  }*/