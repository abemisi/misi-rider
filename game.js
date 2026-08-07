/* =====================================================
   MISI RIDER V3.1
   GAME.JS
===================================================== */

/* =====================================================
   TIME
===================================================== */

Game.lastTime = 0;

Game.carTimer = 0;
Game.carSpawnDelay = 1200;

Game.coinTimer = 0;
Game.coinSpawnDelay = 1800;

Game.buildingTimer = 0;
Game.buildingSpawnDelay = 2500;


/* =====================================================
   START GAME
===================================================== */

function startGame(){

    Game.playing = true;
    Game.paused = false;

    resetGame();
    resetRoad();
    resetRider();
    clearCars();
    clearCoins();
    clearBuildings();

    Game.lastTime = performance.now();

  Game.animationId = requestAnimationFrame(gameLoop);

}


/* =====================================================
   GAME LOOP
===================================================== */

function gameLoop(time){

    if(!Game.playing) return;

    if(Game.paused){

        requestAnimationFrame(gameLoop);
        return;

    }

    const delta = time - Game.lastTime;

    Game.lastTime = time;

    updateRoad(delta);

updateCars(delta);

updateCoins(delta);

updateBuildings(delta);


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


Game.animationId = requestAnimationFrame(gameLoop);


/* =====================================================
   PAUSE
===================================================== */

function pauseGame(){

    Game.paused = !Game.paused;

}


/* =====================================================
   GAME OVER
===================================================== */

function gameOver(){

    Game.playing = false;

    cancelAnimationFrame(Game.animationId);

}


/* =====================================================
   BUTTON
===================================================== */

if(Game.ui.startBtn){

    Game.ui.startBtn.addEventListener("click",startGame);

}

if(Game.ui.restartBtn){

    Game.ui.restartBtn.addEventListener("click",startGame);

}

if(Game.ui.pauseBtn){

    Game.ui.pauseBtn.addEventListener("click",pauseGame);

}
