
var socket;
var myid;
var mynumber = 0;
var array = [];//array of players
var movementX = 0;
var movementY = 0;
var arrayofobstacles = [];
var ImReady = 0;//0 = not ready 1 = ready
let button;
let button2;
let button3;
var gamestarted = 0;//0 = not started 1 = started
var arrayofitem = [];

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
        this.team = 0; //1 = seeker 0 = hider
        this.revive = 0;
        this.quest = 0;
        this.score = 0;
        this.maxscore = 20;

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

        //to set new position of player
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

        //to update the position of player
        this.updateinfo = function(){
            this.move();
        }

        //to draw the player on the screen
        this.draw = function () {
            if (this.team == 1){
                fill(0, 0, 255);
            }
            //color is affected by score(max = 20)
            else if (this.team == 0){
                if(this.score < this.maxscore){
                    fill(255, (25*this.score), 0);
                }
                else{
                    fill(255, (25*this.maxscore), 0);
                }
            }
            push();
            translate(this.x, this.y);
            rotate(this.angle); 
            circle(0, 0, 50);
            circle(10,-25,20);
            circle(10,25,20);
            pop();
            noFill();
        } 
        
        return this;
    }
}

class Obstacle{
    constructor(type, x, y){
        this.type = type;
        this.x = x;
        this.y = y;

        //to draw the obstacle on screen
        this.draw = function (){
            fill(211, 211, 211);
            circle(this.x, this.y, 250);
        };

        return this;
    }
} 

class Item{
    constructor(type, x, y){
        this.type = type;
        this.x = x;
        this.y = y;
        this.picked = 0;

        //to draw the item on screen
        this.draw = function (){
            push();
            if (this.type == 'revive'){
                fill(0, 100, 255);
            }
            else if (this.type == 'quest'){
                fill(128, 128, 0);
            }
            else if (this.type == 'coin'){
                fill(255, 255, 0)
            }
            circle(this.x, this.y, 30);
            pop();
        };
        
        return this;
    }
} 

//sending input (WASD and mouse movement) unless you are caught
function input(){
    if(array[mynumber].caught == 0 && gamestarted == 1){
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
                //if collided players are from different team, catch the hider
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

                //if the collided players are both hiders, and one is caught, and the other has revive item, release the caught hider
                else if (checkplayercollision(array[i],array[j]) == true && (array[i].team == 0 && array[j].team == 0 )&& array[i].caught == 1 && array[j].revive == 1){
                    socket.emit('release', {releasenum: i, reviver :j});
                    array[j].revive = 0;
                    array[i].caught = 0;
                    return;
                }
                else if (checkplayercollision(array[i],array[j]) == true && (array[i].team == 0 && array[j].team == 0 )&& array[j].caught == 1 && array[i].revive == 1){
                    socket.emit('release', {releasenum: j, reviver: i});
                    array[i].revive = 0;
                    array[j].caught = 0;
                    return;
                }
                
            }
    }
}
function checkitemcollide(){
    for(var i in array){
        for(var j in arrayofitem){
            if((collideCircleCircle(array[i].x, array[i].y, 50, arrayofitem[j].x, arrayofitem[j].y, 30))==true){
                if(array[i].team == 0){
                        socket.emit('pickitem', {pickeditem: j, pickeditemtype: arrayofitem[j].type, pickedplayer: i});
                    }
            }
        }
            
    }
}

//Send caught player to middle(x=0,y=0)
function sendcaughttomiddle(){
    for(var i in array){
        if(array[i].caught == 1){
            array[i].x = 0;
            array[i].y = 0;
            socket.emit('sendcaught', {number: i})
        }
    }
}

//check if there's any collision of player and wall/object
function checkcollide(){
    for(var i in array){
        if(array[i].id === myid){
            for(var j in arrayofobstacles){
                //collide with obstacle
                if (checkobstaclecollision(array[i],arrayofobstacles[j])){
                    socket.emit('collide', {player: i, object: j});
                    return;
                }         
            }
            //collide with wall
            if(array[i].x >= 4475 || array[i].x <= -4475 || array[i].y >= 4475 || array[i].y <=-4475){
                socket.emit('collidewall', {player: i});
                return;
            }
            //not colliding
            socket.emit('uncollide', {player: i});
            return;
        }
    }
    return;
}

//Create movement of the player when pressing WASD
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
    //press c to cheat(teleport you to x=0,y=0)
    if(key === "c"){
        for(var i in array){
            if(array[i].id == myid){
                array[i].x = 0;
                array[i].y = 0;
                socket.emit('cheat', {cheatplayer: i})
            }
        }
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
  return false;
}

//Get the player ready/unready for game, it triggers by pressing ready button
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

//These takes place as soon as the cilent starts
function setup() {
    array=[];
        /*socket = io.connect('http://119.246.79.200:8085/', {
        'reconnect': false
    });*/

    socket = io();
        //getting number and id upon joining
        socket.emit('ready', {name: '123'});
        socket.on('yourid', function(data){
            myid = data.id;
            mynumber = data.number;
        })

        //adding a new player if a new player joins
        socket.on('newplayer', function(data){
            var player = new Player(data.id, data.name, data.x, data.y, data.number);
            array.push(player);
        })

        //initializing other player's info
        socket.on('otherplayerdata', function(data){
            for(var i in data.arrayofotherplayerdata){
                var player = new Player(data.arrayofotherplayerdata[i].id, data.arrayofotherplayerdata[i].name, data.arrayofotherplayerdata[i].x, data.arrayofotherplayerdata[i].y, data.arrayofotherplayerdata[i].number)
                array.push(player);
            }
        })

        //initializing obstacle
        socket.on('obstacledata', function(data){
            for(var i in data.obstacledata){
                var obstacle = new Obstacle(data.obstacledata[i].type, data.obstacledata[i].x, data.obstacledata[i].y);
                arrayofobstacles.push(obstacle);
            }
        })

        //update info after a player left
        socket.on('playerleft', function(data){
            //deleting player
            for(var i in array) {
                if(array[i].id === data.id) {
                    array.splice(i, 1);
                }
            }
            //adjusting player number
            if(data.number < mynumber){
                mynumber--;
                for(var i in array) {
                    if(array[i].id === myid) {
                        array[i].number = mynumber;
                        socket.emit('updateplayernumber', array[i].getplayerdata());
                    }
                }
            }
        })

        //updating game info every moment
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

        //update info after a player catch a hider
        socket.on('catchupdate', function(data){
            array[data.caughtnum].caught = 1;
        })

        //update info after a player revive a hider
        socket.on('reviveupdate', function(data){
            array[data.releasenum].caught = 0;
            array[data.reviver].revive = 0;
        })

        //updating score
        socket.on('scoreupdate', function(data){
                array[data.pickedplayernum].score++;    
        })

        //update info after a player picking up item
        socket.on('pickitemupdate', function(data){
            arrayofitem.splice(data.pickeditem, 1);
        })

        //initializing item info
        socket.on('setupitemdata', function(data){
            for (var i in arrayofitem){
                arrayofitem.splice(i, 1);
            }
            for (var i in data){
                item = new Item(data[i].type, data[i].x, data[i].y);
                arrayofitem.push(item);
            }
        })

        //starting game and updating team info
        socket.on('GameStart', function(data){
            gamestarted = 1;
            for(var i in array){
                if(i == data.seeker){
                    array[i].team = 1;
                }
            }
            
        })

        //initialize game info
        socket.on('GameStartUpdate', function(data){
            for(var i in array)
            {
                array[i].x = data.arrayofinfoforini[i].x;
                array[i].y = data.arrayofinfoforini[i].y;
                array[i].team = data.arrayofinfoforini[i].team;
                array[i].Ready = data.arrayofinfoforini[i].Ready;
                array[i].revive = data.arrayofinfoforini[i].revive;
                array[i].caught = data.arrayofinfoforini[i].caught;
                array[i].score = data.arrayofinfoforini[i].score;
            
        }})
    
        //updating info once a player pick up revive item
        socket.on('reviveitempicked', function(data){
            array[data.pickedplayernum].revive = 1;
        })

        //resetting player after game finish
        socket.on('GG',function(){
                for(var i in array){
                    array[i].team = 0;
                    array[i].caught = 0;
                    array[i].Ready = 0;
                    array[i].revive = 0;
                    array[i].speedX = 0;
                    array[i].speedY = 0;
                }
                ImReady = 0;
                gamestarted = 0;
            
        })

    //interface
    createCanvas(windowWidth, windowHeight);

    //button for ready
    button = createButton('ReadyToPlay');
    button.position(0,0);
    button.size(200,100);
    button.mousePressed(
        ReadyForGame
    );

    //button for redirecting
    button2 = createButton('GoToURL');
    button2.position(0, windowHeight-100);
    button2.size(200,100);
    button2.mousePressed(() => {
        window.location.assign('http://119.246.79.200:8080/')
    });

}


//These takes place every moment
function draw() {
    background(88,155,0);
    socket.on('connect_error', function (err) {
        socket.disconnect();
    });


    //constantly emitting whether the player is ready or not and constantly showing player's info(location...etc)
    console.log(array[mynumber]);
    socket.emit('GameReady', {number: mynumber, Ready: ImReady});


    //Running the game    
    if (gamestarted == 1 && ImReady == 1){
        //Keeping the player model at the centre of screen
        for(var i in array) {
            if(array[i].id === myid) {
                translate(width/2 - array[i].x, height/2 - array[i].y);
            }
        }

        rectMode(CENTER);
        push();
        strokeWeight(10);
        stroke(51);
        rect(0, 0, 9000, 9000);
        pop();
        
        //draw all obstacle
        for (var i in arrayofobstacles){
            arrayofobstacles[i].draw();
        }
        //draw all players
        for(var i in array) {
            for(var j = 0; j < array.length; j++){
                array[j].draw();
            }
        }
        //draw all items
        for (var i in arrayofitem){
            arrayofitem[i].draw();
        }
        checkcollide();//checking collision of obstacle/wall
        checkplayercollide();//checking player collision (reviving/catching)
        checkitemcollide();//checking item collision (picking up item)
        input();//input (WASD)
        sendcaughttomiddle();//sending caught player to middle if there's any
    }
}

//Just resizing the window for better experience
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }