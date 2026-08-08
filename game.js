/* =====================================================
   MISI RIDER V3.1
   GAME.JS
   PAUSE + ESC VERSION
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
   PAUSE TEXT
===================================================== */

const pauseText =
    document.getElementById("pauseText");


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

    if(pauseText){

        pauseText.classList.add("hidden");

    }

}


/* =====================================================
   START GAME
===================================================== */

function startGame(){

    resetGame();


    /* =========================
       CLEAR OLD OBJECTS
    ========================= */

    clearCars();
    clearCoins();
    clearBuildings();


    /* =========================
       RESET WORLD
    ========================= */

    resetRoad();
    resetRider();


    /* =========================
       AUDIO
    ========================= */

    setupAudio();

    playMusic();

    playEngine();


    /* =========================
       HIDE START / GAME OVER
    ========================= */

    if(Game.ui.startScreen){

        Game.ui.startScreen.classList.add("hidden");

    }

    if(Game.ui.gameOver){

        Game.ui.gameOver.classList.add("hidden");

    }


    /* =========================
       HIDE PAUSE
    ========================= */

    if(pauseText){

        pauseText.classList.add("hidden");

    }


    /* =========================
       START
    ========================= */

    Game.playing = true;

    Game.paused = false;

    Game.lastTime =
        performance.now();


    requestAnimationFrame(gameLoop);

}


/* =====================================================
   GAME LOOP
===================================================== */

function gameLoop(time){

    if(!Game.playing){

        return;

    }


    /* =========================
       PAUSED
       GAME TIDAK BERGERAK
    ========================= */

    if(Game.paused){

        requestAnimationFrame(gameLoop);

        return;

    }


    const delta =
        time - Game.lastTime;


    Game.lastTime =
        time;


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


    if(
        Game.carTimer >=
        Game.carSpawnDelay
    ){

        createCar();

        Game.carTimer = 0;

    }


    /* =========================
       SPAWN COIN
    ========================= */

    Game.coinTimer += delta;


    if(
        Game.coinTimer >=
        Game.coinSpawnDelay
    ){

        createCoin();

        Game.coinTimer = 0;

    }


    /* =========================
       SPAWN BUILDING
    ========================= */

    Game.buildingTimer += delta;


    if(
        Game.buildingTimer >=
        Game.buildingSpawnDelay
    ){

        createBuilding();

        Game.buildingTimer = 0;

    }


    /* =========================
       NEXT FRAME
    ========================= */

    requestAnimationFrame(gameLoop);

}


/* =====================================================
   PAUSE GAME
===================================================== */

function pauseGame(){

    /* Jangan pause kalau game belum bermula */

    if(!Game.playing){

        return;

    }


    /* =================================================
       PAUSE
    ================================================= */

    if(!Game.paused){

        Game.paused = true;


        /* =========================
           PAPAR MISI PAUSE
        ========================= */

        if(pauseText){

            pauseText.classList.remove("hidden");

        }


        /* =========================
           TUKAR BUTTON
        ========================= */

        if(Game.ui.pauseBtn){

            Game.ui.pauseBtn.textContent = "▶";

        }


        /* =========================
           PAUSE MUSIC
        ========================= */

        if(
            Game.audio &&
            Game.audio.bgMusic
        ){

            Game.audio.bgMusic.pause();

        }


        /* =========================
           PAUSE ENGINE
        ========================= */

        if(
            Game.audio &&
            Game.audio.engine
        ){

            Game.audio.engine.pause();

        }


        return;

    }


    /* =================================================
       RESUME
    ================================================= */

    Game.paused = false;


    /* =========================
       HIDE PAUSE TEXT
    ========================= */

    if(pauseText){

        pauseText.classList.add("hidden");

    }


    /* =========================
       TUKAR BUTTON
    ========================= */

    if(Game.ui.pauseBtn){

        Game.ui.pauseBtn.textContent = "⏸";

    }


    /* =========================
       RESUME MUSIC
    ========================= */

    if(
        Game.audio &&
        Game.audio.bgMusic
    ){

        Game.audio.bgMusic
            .play()
            .catch(function(){});

    }


    /* =========================
       RESUME ENGINE
    ========================= */

    if(
        Game.audio &&
        Game.audio.engine
    ){

        Game.audio.engine
            .play()
            .catch(function(){});

    }


    /* =========================
       RESET TIMER
    ========================= */

    Game.lastTime =
        performance.now();

}


/* =====================================================
   GAME OVER
===================================================== */

function gameOver(){

    Game.playing = false;

    Game.paused = false;


    /* =========================
       HIDE PAUSE
    ========================= */

    if(pauseText){

        pauseText.classList.add("hidden");

    }


    /* =========================
       STOP AUDIO
    ========================= */

    stopMusic();

    stopEngine();

    playCrash();


    /* =========================
       SHOW GAME OVER
    ========================= */

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
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(e){

        if(e.key === "Escape"){

            e.preventDefault();

            pauseGame();

        }

    }
);


/* =====================================================
   INITIAL RIDER
===================================================== */

Game.rider =
    Game.ui.rider;


resetRider();


/* =====================================================
   READY
===================================================== */

console.log(
    "MISI RIDER V3.1 READY"
);
