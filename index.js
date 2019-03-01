"use strict";

const ids ={
        leftPlayer : document.getElementById("leftPlayer"),
        rightPlayer : document.getElementById("rightPlayer"),
        ball : document.getElementById("ball"),
        leftScore : document.getElementById("leftScore"),
        rightScore : document.getElementById("rightScore")
    };

state = { ids: ids, 
    player : [ new Player(ids.leftPlayer,120,10,true,0), new Player(ids.rightPlayer,120,480,false,0)],
    ball : new Ball(ids.ball,180,250,-1 , -0.5, 500),
    pause: false
}

function controller(event) {
    switch (event.key) {
        case("ArrowDown"): {
            state.player[0].move(false);

            break;
        }

        case("ArrowUp"): {
            state.player[0].move(true);
            break;
        }
        case("Space") : {
            state.pause = !state.pause;
        }


    }

}

function init() {
    console.log("Init...");
    document.addEventListener("keydown",controller);
    console.log("...done");
}


