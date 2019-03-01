"use strict";

const audioWall = new Audio('wall.wav');
const audioApplause = new Audio("applause.wav");
const audioHit = new Audio("click.wav");
const initialBall = [250,130,-1 , 0];
const initialBallSpeed = 8;
const initialLeftPlayer = [10,120];
const initiaRightPlayer = [480,120];
const aiSpeed = 8;

const state = { ids: ids, 
    player : [ new Player(ids.leftPlayer,ids.leftScore,...initialLeftPlayer,true,0), 
               new Player(ids.rightPlayer,ids.rightScore,...initiaRightPlayer,false,0)],
    ball : new Ball(ids, ...initialBall),
    ballSpeed : initialBallSpeed,
    playerSpeed : 6,
    pause: false
};

function keyListener(event) {
    const goUp=["a","ArrowUp"];
    const goDown=["s","ArrowDown"];
    //console.log(event.key);

    if (goUp.includes(event.key)) {
        if(state.pause) return;
        state.player[0].move(true,state.playerSpeed);
    }
    else if(goDown.includes(event.key)) {
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

function toogleSound(element) {
    playSounds = element.checked;
}

var gameInterval,aiInterval,ballTimer,playSounds=true;
function init() {
    console.log("Init...");
    document.addEventListener("keydown",keyListener);
    gameInterval = setInterval(gameController,1);
    aiInterval = setInterval( ai, aiSpeed);
    ballTimer = setTimeout( moveBall, state.ballSpeed );
    console.log("...done");
}


