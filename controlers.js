"use strict";

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

    if(ball.dy==0) {
        if(ball.y < player.y) 
            player.move(true,1);
        else if(ball.y > player.y) 
            player.move(false,1);

    }
    else if(ball.dy>0 && (player.y+player.height/2) < ball.y ) {
        player.move(false,1);
    }
    else if(ball.dy<0 && (player.y+player.height/2) > ball.y ) {
        player.move(true,1);
    } 
}


function moveBall() {
    if(!state.pause) {
        if(state.ball.move() && playSounds) audioWall.play();
    }
    ballTimer = setTimeout( moveBall, Math.round(state.ballSpeed) );
    
}
function gameController() {

    if(state.pause) return;
    if( touched(state.ball,state.player[0]) ||
       touched(state.ball,state.player[1])) {
      
        state.ball.dx *= -1;
        state.ball.dy  += Math.random()/1.5;
        if(state.ballSpeed>1) state.ballSpeed -= 0.2;
        //console.log(state.ballSpeed);
        if(playSounds) audioHit.play();

   }
   
    let result = state.ball.out();
    if(result) { // someone scored 
        let player = result - 1;
        state.player[player].scored();
        state.ballSpeed = initialBallSpeed;
        initialBall[1] = state.player[0].y;
        state.ball.reset(...initialBall);
        if(playSounds) audioApplause.play();
        return;      
   }    

}

