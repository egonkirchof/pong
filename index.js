"use strict";

const initialBall = [250,130,-1 , 0];
const initialBallSpeed = 8;
const initialLeftPlayer = [10,120];
const initiaRightPlayer = [480,120];
const aiSpeed = 80;

const state = { ids: ids, 
    player : [ new Player(ids.leftPlayer,ids.leftScore,...initialLeftPlayer,true,0), 
               new Player(ids.rightPlayer,ids.rightScore,...initiaRightPlayer,false,0)],
    ball : new Ball(ids, ...initialBall),
    ballSpeed : initialBallSpeed,
    playerSpeed : 6,
    pause: false
};

function keyListener(event) {
    const goUp="a";
    const goDown="s";
    //console.log(event.key);

    if (event.key===goUp) {
        if(state.pause) return;
        state.player[0].move(true,state.playerSpeed);
    }
    else if(event.key===goDown) {
        if(state.pause) return;
        state.player[0].move(false,state.playerSpeed);
    }
    else if(event.key===" ") {
        pause();
    }

}

function pause() {
    state.pause = !state.pause;    
    console.log("Pause:",state.pause);

}

function reset() {
    state.pause = false;
    state.player[0].reset(...initialLeftPlayer);
    state.player[1].reset(...initiaRightPlayer);
    state.ball.reset(...initialBall);
}

function touched(ball,player) {
    
    if(ball.dx>0) { // check if ball touch right player
        let x = ball.x + ball.width;
        return x>=player.x && 
               x <= (player.x + player.width) &&
              (ball.y + ball.height) >= player.y &&
              ball.y <= (player.y + player.height);       

    }
    // check if ball touched left player

    return Math.abs( ball.x-player.x)<= 1 && 
          (ball.y + ball.height) >= player.y &&
          ball.y <= (player.y + player.height);
    

}

function ai() {  // basic A.I. for player 2
    let ball = state.ball;
    let player = state.player[1];

    if(state.pause) return;
    // if(ball.dx <0) return;

    if(ball.dy>0 && (player.y+player.height/2) < ball.y ) {
        player.move(false,state.playerSpeed);
    }
    else
    if(ball.dy<0 && (player.y+player.height/2) > ball.y ) {
        player.move(true,state.playerSpeed);
    } 
    else
    if(ball.y < player.y) player.move(true,state.playerSpeed);
    else
    if(ball.y > player.y) player.move(false,state.playerSpeed);
}

function gameController() {

    if(state.pause) return;
    if( touched(state.ball,state.player[0]) ||
       touched(state.ball,state.player[1])) {
      
        state.ball.dx *= -1;
        state.ball.dy  += Math.random()/1.5;
        if(state.ballSpeed>1) state.ballSpeed -= 0.2;

   }
   
    let result = state.ball.out();
    if(result) { // someone scored 
        let player = result - 1;
        state.player[player].scored();
        state.ballSpeed = initialBallSpeed;
        initialBall[1] = state.player[0].y;
        state.ball.reset(...initialBall);
        return;      
   }
    


}

function moveBall() {
    if(!state.pause) state.ball.move();
    ballTimer = setTimeout( moveBall, state.ballSpeed );
    
}

var gameInterval,aiInterval,ballTimer;
const p = state.player[0],b=state.ball;
const p2 = state.player[1];

function init() {
    console.log("Init...");
    document.addEventListener("keydown",keyListener);
    gameInterval = setInterval(gameController,1);
    aiInterval = setInterval( ai, aiSpeed);
    ballTimer = setTimeout( moveBall, state.ballSpeed );
    console.log("...done");
}


