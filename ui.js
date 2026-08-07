/* =====================================================
   MISI RIDER V3.1
   UI.JS
===================================================== */

/* =====================================================
   GAME OBJECT
===================================================== */

const Game = {

    /* ---------- ELEMENT ---------- */

    ui: {

        road: document.getElementById("road"),
        rider: document.getElementById("rider"),

        score: document.getElementById("score"),
        highScore: document.getElementById("highScore"),
        lives: document.getElementById("lives"),
        coins: document.getElementById("coinCount"),

        pauseBtn: document.getElementById("pauseBtn"),

        startScreen: document.getElementById("startScreen"),
        gameOver: document.getElementById("gameOver"),

        startBtn: document.getElementById("startBtn"),
        restartBtn: document.getElementById("restartBtn"),

        leftBtn: document.getElementById("leftBtn"),
        rightBtn: document.getElementById("rightBtn")

    },

    /* ---------- AUDIO ---------- */

    audio: {

        bgMusic: document.getElementById("bgMusic"),
        engine: document.getElementById("engineSound"),
        crash: document.getElementById("crashSound"),
        coin: document.getElementById("coinSound")

    },

    /* ---------- GAME DATA ---------- */

    score: 0,

    highScore: 0,

    coins: 0,

    lives: 3,

    level: 1,

    speed: 6,

    playing: false,

    paused: false,

    lane: 1,

    lanePositions: [

        20,
        50,
        80

    ],

    cars: [],

    coinsList: [],

    buildings: [],

    animationId: null

};


/* =====================================================
   HUD
===================================================== */

function updateHUD(){

    Game.ui.score.textContent = Game.score;

    Game.ui.highScore.textContent = Game.highScore;

    Game.ui.coins.textContent = Game.coins;

    Game.ui.lives.textContent = Game.lives;

}


/* =====================================================
   RESET
===================================================== */

function resetGame(){

    Game.score = 0;

    Game.coins = 0;

    Game.lives = 3;

    Game.level = 1;

    Game.speed = 6;

    updateHUD();

}
