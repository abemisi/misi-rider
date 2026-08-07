/* =====================================================
   MISI RIDER V3.1
   BUILDING.JS
===================================================== */

const buildingImages = [

    "assets/buildings/Cafe.png",
    "assets/buildings/Restoran.png",
    "assets/buildings/petrol-station.png"

];


/* =====================================================
   CREATE BUILDING
===================================================== */

function createBuilding(){

    const building = document.createElement("div");

    building.className = "building";

    building.dataset.y = -350;

    const side = Math.random() < 0.5 ? "left" : "right";

    if(side==="left"){

        building.style.left="10px";

    }else{

        building.style.right="10px";

    }

    building.style.top="-350px";

    const img =
    buildingImages[
        Math.floor(Math.random()*buildingImages.length)
    ];

    building.style.backgroundImage=`url("${img}")`;

    Game.ui.road.appendChild(building);

    Game.buildings.push(building);

}


/* =====================================================
   UPDATE BUILDING
===================================================== */

function updateBuildings(delta){

    for(let i=Game.buildings.length-1;i>=0;i--){

        const building=Game.buildings[i];

        let y=Number(building.dataset.y);

        y+=Game.speed*(delta/16);

        building.dataset.y=y;

        building.style.top=y+"px";

        if(y>Game.ui.road.clientHeight+350){

            building.remove();

            Game.buildings.splice(i,1);

        }

    }

}


/* =====================================================
   CLEAR BUILDING
===================================================== */

function clearBuildings(){

    Game.buildings.forEach(b=>b.remove());

    Game.buildings=[];

}
