"use strict";

var Player = function(domPlayer,domScore,x,y,left,score) {
    this.x = x;
    this.y = y;
    this.left = left;
    this.score = score;
    this.domPlayer = domPlayer;
    this.domScore = domScore;
    this.height = domPlayer.clientHeight;
    this.width = domPlayer.clientWidth;

};

var Ball = function(dom,x,y,dx,dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.dom = dom;
    this.width = dom.ball.clientWidth;
    this.height = dom.ball.clientHeight;
    this.reset = function(x,y,dx,dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;            
    }

    this.move = function() {
        this.x += this.dx;
        this.y += this.dy;
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
        
    }

    this.out = function() {
        if(this.x <= 0) {
            return 2;
        }
        if(this.x >= (this.dom.gameField.clientWidth-this.dom.ball.clientWidth)) {
            return 1;
        }
        return 0;


    }
    
};


function move(up,speed) {
    const lowerLimit = boardHeight-this.height;
    //console.log("moving", this);
    let newPosition = this.y + speed * (up ? -1 : 1);
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
    this.x = x;
    this.y = y;
    this.domPlayer.style.top = this.y+"px";
    this.score = 0;
    this.domScore.innerHTML = this.score.toString();

}