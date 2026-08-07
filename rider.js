/* =====================================================
   MISI RIDER V3.1
   RIDER.JS
===================================================== */

/* =====================================================
   UPDATE RIDER
===================================================== */

function updateRider(){

    Game.ui.rider.style.left =
        Game.lanePositions[Game.lane] + "%";

}


/* =====================================================
   MOVE LEFT
===================================================== */

function moveLeft(){

    if(!Game.playing) return;

    if(Game.paused) return;

    if(Game.lane > 0){

        Game.lane--;

        updateRider();

    }

}


/* =====================================================
   MOVE RIGHT
===================================================== */

function moveRight(){

    if(!Game.playing) return;

    if(Game.paused) return;

    if(Game.lane < 2){

        Game.lane++;

        updateRider();

    }

}


/* =====================================================
   RESET RIDER
===================================================== */

function resetRider(){

    Game.lane = 1;

    updateRider();

}


/* =====================================================
   BUTTON CONTROL
===================================================== */

if(Game.ui.leftBtn){

    Game.ui.leftBtn.addEventListener("click", moveLeft);

}

if(Game.ui.rightBtn){

    Game.ui.rightBtn.addEventListener("click", moveRight);

}


/* =====================================================
   KEYBOARD CONTROL
===================================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft"){

        moveLeft();

    }

    if(e.key==="ArrowRight"){

        moveRight();

    }

});
