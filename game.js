/* =====================================================
   MISI RIDER V3.1
   GAME.JS
   BAHAGIAN 1
===================================================== */


/* =====================================================
   GAME VARIABLE
===================================================== */

Game.playing = false;
Game.paused = false;

Game.lastTime = 0;

Game.score = 0;
Game.level = 1;

Game.speed = 6;

Game.carTimer = 0;
Game.buildingTimer = 0;


/* =====================================================
   RESET GAME
===================================================== */

function resetGame(){

    Game.score = 0;
    Game.level = 1;

    Game.speed = 6;

    Game.carTimer = 0;
    Game.coinTimer = 0;
    Game.buildingTimer = 0;

    Game.playing = false;
    Game.paused = false;

    Game.lastTime = 0;

}


/* =====================================================
   START GAME
===================================================== */

function startGame(){

    resetGame();

    clearCars();
    clearCoins();
    clearBuildings();

    resetRoad();
    resetRider();

    setupAudio();

    playMusic();

    playEngine();

    if(Game.ui.startScreen){

        Game.ui.startScreen.classList.add("hidden");

    }

    if(Game.ui.gameOver){

        Game.ui.gameOver.classList.add("hidden");

    }

    Game.playing = true;

    Game.lastTime = performance.now();

    requestAnimationFrame(gameLoop);

}


/* =====================================================
   GAME LOOP
===================================================== */

function gameLoop(time){

    if(!Game.playing){

        return;

    }

    if(Game.paused){

        requestAnimationFrame(gameLoop);

        return;

    }

    const delta = time - Game.lastTime;

    Game.lastTime = time;

    updateRoad(delta);

    updateRider();

    updateCars(delta);

    updateCoins(delta);

    updateBuildings(delta);

    checkLevel();    /* =========================
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


    requestAnimationFrame(gameLoop);

}


/* =====================================================
   PAUSE GAME
===================================================== */

function pauseGame(){

    Game.paused = !Game.paused;

}


/* =====================================================
   GAME OVER
===================================================== */

function gameOver(){

    Game.playing = false;

    stopMusic();

    stopEngine();

    playCrash();

    if(Game.ui.gameOver){

        Game.ui.gameOver.classList.remove("hidden");

    }

}
/* =====================================================
   BUTTON CONTROL
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
   INITIAL RIDER
===================================================== */

Game.rider = Game.ui.rider;

resetRider();
