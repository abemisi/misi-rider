/* =====================================================
   UI.JS
   Version 3.1
===================================================== */

/* =========================
   GAME AREA
========================= */

const road = document.getElementById("road");
const rider = document.getElementById("rider");


/* =========================
   HUD
========================= */

const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const livesText = document.getElementById("lives");
const coinText = document.getElementById("coinCount");


/* =========================
   SCREEN
========================= */

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");


/* =========================
   BUTTON
========================= */

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const pauseBtn = document.getElementById("pauseBtn");
const pauseText = document.getElementById("pauseText");


/* =========================
   GAME OVER
========================= */

const finalScoreText = document.getElementById("finalScore");


/* =========================
   AUDIO
========================= */

const bgMusic = document.getElementById("bgMusic");
const engineSound = document.getElementById("engineSound");
const crashSound = document.getElementById("crashSound");
const coinSound = document.getElementById("coinSound");


/* =========================
   AUDIO SETTING
========================= */

if(bgMusic){

    bgMusic.preload="auto";
    bgMusic.loop=true;
    bgMusic.volume=0.35;

}

if(engineSound){

    engineSound.preload="auto";
    engineSound.loop=true;
    engineSound.volume=0.25;

}

if(crashSound){

    crashSound.volume=0.80;

}

if(coinSound){

    coinSound.volume=0.60;

}


/* =========================
   HUD UPDATE
========================= */

function updateScore(score){

    scoreText.textContent=score;

}

function updateHighScore(score){

    highScoreText.textContent=score;

}

function updateLives(lives){

    livesText.textContent=lives;

}

function updateCoins(totalCoins){

    coinText.textContent=totalCoins;

}
