"use strict";

var Player = function(domPlayer,domScore,x,y,left,score,speed=8) {
    this.x = x;
    this.y = y;
    this.left = left;
    this.score = score;
    this.speed = speed;
    this.domPlayer = domPlayer;
    this.domScore = domScore;
    this.height = domPlayer.clientHeight;
    console.log(this.domPLayer);
};

var Ball = function(dom,x,y,dx,dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.dom = dom;
    this.reset = function(x,y,dx,dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;            
    }

    this.move = function(speed) {
        this.x += this.dx*speed;
        this.y += this.dy*speed;
        if(this.y<=0) {
            this.dy = -this.dy;
            this.y = 1;
        }
        const lowerLimit = this.dom.gameField.clientHeight-this.dom.ball.clientHeight;
        if(this.y>=lowerLimit) { 
            this.dy = -this.dy;
            this.y = lowerLimit;      
        
        }
      
        dom.ball.style.top = this.y+"px";
        dom.ball.style.left = this.x+"px";
        
        if(this.x <= 0) {
            return 2;
        }
        if(this.x >= (this.dom.gameField.clientWidth-this.dom.ball.clientWidth)) {
            return 1;
        }

        return 0;
    }
    
};


function move(up) {
    const lowerLimit = boardHeight-this.height;
    //console.log("moving", this);
    let newPosition = this.y + this.speed * (up ? 1 : -1);
    //console.log(newPosition,lowerLimit);
    if(newPosition<0 || newPosition>lowerLimit) {
            // console.log("out of screen!");
            return;
        }
    this.y = newPosition;
    this.domPlayer.style.top = this.y+"px";
    
}

function scored() {
    this.score++;
    this.domScore.innerHTML = this.score.toString();
    //console.log("New score is:",this.score,this.domScore);
}

Player.prototype.move = move;
Player.prototype.scored = scored;
Player.prototype.reset = function(x,y) {
    console.log(this);
    this.x = x;
    this.y = y;
    this.domPlayer.style.top = this.y+"px";
    this.score = 0;
    this.domScore.innerHTML = this.score.toString();

}