/* =====================================================
   MISI RIDER V3.1
   ROAD.JS
===================================================== */

/* =====================================================
   ROAD DATA
===================================================== */

Game.road = {

    offset: 0,

    speed: 6

};


/* =====================================================
   UPDATE ROAD
===================================================== */

function updateRoad(delta){

    if(!Game.playing) return;

    Game.road.offset += Game.speed * (delta / 16);

    Game.ui.road.style.backgroundPositionY =
        Game.road.offset + "px";

}


/* =====================================================
   RESET ROAD
===================================================== */

function resetRoad(){

    Game.road.offset = 0;

    Game.ui.road.style.backgroundPositionY = "0px";

}
