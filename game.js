/* =====================================================
   MISI RIDER V3.1
   GAME.JS
   BAHAGIAN 1 / 3
===================================================== */


/* =====================================================
   GAME TIMING
===================================================== */

Game.lastTime = 0;

Game.carTimer = 0;
Game.coinTimer = 0;
Game.buildingTimer = 0;

Game.carSpawnDelay = 1200;
Game.coinSpawnDelay = 1800;
Game.buildingSpawnDelay = 2500;


/* =====================================================
   GAME STATE
===================================================== */

Game.playing = false;
Game.paused = false;

Game.crashed = false;


/* =====================================================
   START GAME
===================================================== */

function startGame(){

    /* Hentikan animation lama */

    if(Game.animationId){

        cancelAnimationFrame(Game.animationId);

    }


    /* Reset data */

    Game.score = 0;
    Game.coins = 0;
    Game.lives = 3;

    Game.level = 1;
    Game.speed = 6;

    Game.lane = 1;

    Game.carTimer = 0;
    Game.coinTimer = 0;
    Game.buildingTimer = 0;

    Game.crashed = false;


    /* Bersihkan objek lama */

    clearCars();
    clearCoins();
    clearBuildings();


    /* Reset posisi */

    resetRoad();
    resetRider();


    /* HUD */

    updateHUD();


    /* Audio */

    setupAudio();

    playMusic();

    playEngine();


    /* Screen */

    if(Game.ui.startScreen){

        Game.ui.startScreen.classList.add("hidden");

    }

    if(Game.ui.gameOver){

        Game.ui.gameOver.classList.add("hidden");

    }


    /* Game mula */

    Game.playing = true;
    Game.paused = false;

   Game.lastTime = performance.now();

/* Kereta pertama terus muncul */
createCar();

/* Coin pertama terus muncul */
createCoin();

/* Mula loop */
Game.animationId =
    requestAnimationFrame(gameLoop);
}/* =====================================================
   GAME LOOP
===================================================== */

function gameLoop(time){

    if(!Game.playing){

        return;

    }


    /* =========================
       PAUSE
    ========================= */

    if(Game.paused){

        Game.animationId =
            requestAnimationFrame(gameLoop);

        return;

    }


    /* =========================
       DELTA TIME
    ========================= */

    let delta =
        time - Game.lastTime;

    if(delta > 50){

        delta = 16;

    }

    Game.lastTime = time;


    /* =========================
       ROAD
    ========================= */

    updateRoad(delta);


    /* =========================
       RIDER
    ========================= */

    updateRider();


    /* =========================
       CARS
    ========================= */

    updateCars(delta);


    /* =========================
       COINS
    ========================= */

    updateCoins(delta);


    /* =========================
       BUILDINGS
    ========================= */

    updateBuildings(delta);


    /* =========================
       LEVEL
    ========================= */

    checkLevel();


    /* =========================
       SPAWN CAR
    ========================= */

    Game.carTimer += delta;

    if(Game.carTimer >= Game.carSpawnDelay){

        createCar();

        Game.carTimer = 0;

    }


    /* =========================
       SPAWN COIN
    ========================= */

    Game.coinTimer += delta;

    if(Game.coinTimer >= Game.coinSpawnDelay){

        createCoin();

        Game.coinTimer = 0;

    }


    /* =========================
       SPAWN BUILDING
    ========================= */

    Game.buildingTimer += delta;

    if(Game.buildingTimer >= Game.buildingSpawnDelay){

        createBuilding();

        Game.buildingTimer = 0;

    }


    /* =========================
       HUD
    ========================= */

    updateHUD();


    /* =========================
       NEXT FRAME
    ========================= */

    Game.animationId =
        requestAnimationFrame(gameLoop);

}/* =====================================================
   GAME OVER
===================================================== */

function gameOver(){

    Game.playing = false;
    Game.paused = false;

    if(Game.animationId){

        cancelAnimationFrame(Game.animationId);

    }


    stopMusic();
    stopEngine();


    if(Game.ui.gameOver){

        Game.ui.gameOver.classList.remove("hidden");

    }

}


/* =====================================================
   PAUSE GAME
===================================================== */

function pauseGame(){

    if(!Game.playing){

        return;

    }

    Game.paused = !Game.paused;

}


/* =====================================================
   BUTTON EVENTS
===================================================== */

if(Game.ui.startBtn){

    Game.ui.startBtn.addEventListener(
        "click",
        startGame
    );

}


if(Game.ui.restartBtn){

    Game.ui.restartBtn.addEventListener(
        "click",
        startGame
    );

}


if(Game.ui.pauseBtn){

    Game.ui.pauseBtn.addEventListener(
        "click",
        pauseGame
    );

}


/* =====================================================
   KEYBOARD CONTROL
===================================================== */

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        pauseGame();

    }

});


/* =====================================================
   INITIAL RIDER
===================================================== */

Game.rider = Game.ui.rider;


/* =====================================================
   INITIAL HUD
===================================================== */

if(typeof updateHUD === "function"){

    updateHUD();

}


/* =====================================================
   READY
===================================================== */

console.log("MISI RIDER V3.1 READY");
