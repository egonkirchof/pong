"use strict";

const initialBall = [100,248,-1 , -1.5];
const initialLeftPlayer = [10,120];
const initiaRightPlayer = [480,120];
const state = { ids: ids, 
    player : [ new Player(ids.leftPlayer,ids.leftScore,...initialLeftPlayer,true,0), 
               new Player(ids.rightPlayer,ids.rightScore,...initiaRightPlayer,false,0)],
    ball : new Ball(ids, ...initialBall),
    ballSpeed : 3,
    pause: false
};

function keyListener(event) {
    const goUp="a";
    const goDown="s";
    //console.log(event.key);

    if (event.key===goUp) {
        if(state.pause) return;
        state.player[0].move(true);
    }
    else if(event.key===goDown) {
        if(state.pause) return;
        state.player[0].move(false);
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
    state.player[0].reset(...initialLeftPlayer);
    state.player[1].reset(...initiaRightPlayer);
    state.ball.reset(...initialBall);
}

function touched(ball,player) {
    let x;
    if(ball.dx>0) 
        x = ball.x + ball.width;
    else
        x = ball.x;

    return x>=player.x && 
           x <= (player.x + player.width) &&
          ball.y >= player.y &&
          ball.y <= (player.y + player.height);
    

}

function ai(ball,player) {
    if(ball.dx <0) return;
    if(ball.dy>0 && player.y < ball.y ) {
        player.move(false);
    }
    if(ball.dy<0 && player.y > ball.y ) {
        player.move(true);
    }
}

function gameController() {
   if(state.pause) return;

   let result = state.ball.move(state.ballSpeed);
   ai(state.ball,state.player[1]);
   if(result) { // someone scored 
      let player = result - 1;
      state.player[player].scored();
      state.ball.reset(...initialBall);
      return;      
   }
   if( touched(state.ball,state.player[0]) ||
       touched(state.ball,state.player[1])) {
      
        state.ball.dx *= -1;
        state.ballSpeed += 0.1;

    }
    


}

var interval;
const p = state.player[0],b=state.ball;

function init() {
    console.log("Init...");
    document.addEventListener("keydown",keyListener);
    interval = setInterval(gameController,50);
    console.log("...done");
}


