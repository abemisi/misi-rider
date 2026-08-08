/* =====================================================
   MISI RIDER V3.1
   ROAD.JS
===================================================== */

Game.road = {
    offset: 0
};


/* =====================================================
   CREATE ROAD LINES
===================================================== */

function createRoadLines(){

    const container = document.getElementById("lines");

    if(!container) return;

    container.innerHTML = "";

    for(let y = -100; y < 800; y += 150){

        const lineLeft = document.createElement("div");

        lineLeft.className = "roadLine line1";
        lineLeft.dataset.y = y;

        container.appendChild(lineLeft);


        const lineRight = document.createElement("div");

        lineRight.className = "roadLine line2";
        lineRight.dataset.y = y;

        container.appendChild(lineRight);

    }

}


/* =====================================================
   UPDATE ROAD
===================================================== */

function updateRoad(delta){

    if(!Game.playing) return;

    const container = document.getElementById("lines");

    if(!container) return;

    const lines = container.querySelectorAll(".roadLine");

    lines.forEach(line => {

        let y = Number(line.dataset.y);

        y += Game.speed * (delta / 16);

        if(y > Game.ui.road.clientHeight){

            y = -100;

        }

        line.dataset.y = y;

        line.style.top = y + "px";

    });

}


/* =====================================================
   RESET ROAD
===================================================== */

function resetRoad(){

    Game.road.offset = 0;

    createRoadLines();

}
