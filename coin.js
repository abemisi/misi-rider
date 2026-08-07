/* =====================================================
   MISI RIDER V3.1
   COIN.JS
===================================================== */

/* =====================================================
   COIN TIMER
===================================================== */

Game.coinTimer = 0;
Game.coinSpawnDelay = 1800;


/* =====================================================
   CREATE COIN
===================================================== */

function createCoin(){

    const coin = document.createElement("div");

    coin.className = "coin";

    const lane = Math.floor(Math.random()*3);

    coin.dataset.lane = lane;
    coin.dataset.y = -80;

    coin.style.left = Game.lanePositions[lane] + "%";
    coin.style.top = "-80px";
    coin.style.transform = "translateX(-50%)";

    Game.ui.road.appendChild(coin);

    Game.coinsList.push(coin);

}


/* =====================================================
   UPDATE COIN
===================================================== */

function updateCoins(delta){

    for(let i=Game.coinsList.length-1;i>=0;i--){

        const coin = Game.coinsList[i];

        let y = Number(coin.dataset.y);

        y += Game.speed * (delta/16);

        coin.dataset.y = y;

        coin.style.top = y + "px";

        if(y > Game.ui.road.clientHeight + 100){

            coin.remove();

            Game.coinsList.splice(i,1);

        }

    }

}


/* =====================================================
   REMOVE ALL COIN
===================================================== */

function clearCoins(){

    Game.coinsList.forEach(c=>c.remove());

    Game.coinsList=[];

}
