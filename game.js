/* =====================================================
   MISI RIDER V3.1
   GAME.JS
   BAHAGIAN 1
===================================================== */

/* =====================================================
   GAME TIMER
===================================================== */

Game.lastTime = 0;

Game.carTimer = 0;
Game.carSpawnDelay = 1200;

Game.buildingTimer = 0;
Game.buildingSpawnDelay = 2500;


/* =====================================================
   RESET GAME
===================================================== */

function resetGame(){

    Game.score = 0;
    Game.level = 1;

    Game.speed = 6;

    Game.playing = false;
    Game.paused = false;

    Game.carTimer = 0;
    Game.coinTimer = 0;
    Game.buildingTimer = 0;

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

    Game.ui.startScreen.classList.add("hidden");

    if(Game.ui.gameOver){

        Game.ui.gameOver.classList.add("hidden");

    }

    setupAudio();

    playMusic();

    playEngine();

    Game.playing = true;

    Game.lastTime = performance.now();

    requestAnimationFrame(gameLoop);

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

    checkLevel();
