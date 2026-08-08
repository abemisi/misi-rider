/* =====================================================
   MISI RIDER V3.1
   COIN.JS
===================================================== */

Game.coinTimer = 0;
Game.coinSpawnDelay = 1200;


/* =====================================================
   CREATE COIN
===================================================== */

function createCoin(){

    const coin = document.createElement("div");

    coin.className = "coin";

    const lane =
        Math.floor(Math.random() * 3);

    coin.dataset.lane = lane;
    coin.dataset.y = -80;

    coin.style.left =
        Game.lanePositions[lane] + "%";

    coin.style.top = "-80px";

    coin.style.transform =
        "translateX(-50%)";

    Game.ui.road.appendChild(coin);

    Game.coinsList.push(coin);

}


/* =====================================================
   COIN COLLISION
===================================================== */

function coinCollision(coin){

    const rider =
        Game.ui.rider;

    if(!rider) return false;

    const A =
        rider.getBoundingClientRect();

    const B =
        coin.getBoundingClientRect();

    const pad = 8;

    return !(
        A.right - pad < B.left + pad ||
        A.left + pad > B.right - pad ||
        A.bottom - pad < B.top + pad ||
        A.top + pad > B.bottom - pad
    );

}


/* =====================================================
   UPDATE COIN
===================================================== */

function updateCoins(delta){

    for(
        let i = Game.coinsList.length - 1;
        i >= 0;
        i--
    ){

        const coin =
            Game.coinsList[i];

        let y =
            Number(coin.dataset.y);

        y +=
            Game.speed * (delta / 16);

        coin.dataset.y = y;

        coin.style.top =
            y + "px";


        /* =========================
           COLLECT COIN
        ========================= */

        if(coinCollision(coin)){

            Game.coins++;

            Game.score += 10;

            updateHUD();

            playCoin();

            coin.remove();

            Game.coinsList.splice(i,1);

            continue;

        }


        /* =========================
           REMOVE COIN
        ========================= */

        if(
            y >
            Game.ui.road.clientHeight + 100
        ){

            coin.remove();

            Game.coinsList.splice(i,1);

        }

    }

}


/* =====================================================
   CLEAR COINS
===================================================== */

function clearCoins(){

    Game.coinsList.forEach(
        coin => coin.remove()
    );

    Game.coinsList = [];

}
