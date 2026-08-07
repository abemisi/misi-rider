/* =====================================================
   MISI RIDER
   VERSION 3.0
===================================================== */


/* =========================
   AUDIO
========================= */

const bgMusic = document.getElementById("bgMusic");
const engineSound = document.getElementById("engineSound");
const crashSound = document.getElementById("crashSound");
const coinSound = document.getElementById("coinSound");


/* =========================
   ELEMENT
========================= */

const road = document.getElementById("road");
const rider = document.getElementById("rider");

const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const finalScoreText = document.getElementById("finalScore");

const coinCount = document.getElementById("coinCount");
const livesText = document.getElementById("lives");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const pauseBtn = document.getElementById("pauseBtn");
const pauseText = document.getElementById("pauseText");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");


/* =========================
   GAME DATA
========================= */

let playing = false;
let paused = false;

let animationId = null;
let lastTime = 0;

let score = 0;
let highScore =
Number(localStorage.getItem("misiRiderTopScore")) || 0;

let totalCoins = 0;

let lives = 3;
let fuel = 100;
let speed = 5;

let cars = [];
let coins = [];
let roadLines = [];

let lane = 1;

let spawnTimer = 0;
let coinTimer = 0;

let nextCoinTime = 2000 + Math.random() * 3000;


/* =========================
   LANE
========================= */

const lanePositions = [
    20,
    50,
    80
];


/* =========================
   AUDIO SETTING
========================= */

bgMusic.preload = "auto";

engineSound.preload = "auto";
engineSound.loop = true;
engineSound.volume = 0.25;

crashSound.volume = 0.8;

if (coinSound) {
    coinSound.volume = 0.6;
}


/* =========================
   INITIAL HUD
========================= */

highScoreText.textContent = highScore;
scoreText.textContent = 0;
coinCount.textContent = 0;
livesText.textContent = 3;
/* =====================================================
   ROAD LINE
===================================================== */

function createRoadLines() {

    for (let y = -100; y < 800; y += 150) {

        const line1 = document.createElement("div");
        line1.className = "roadLine line1";
        line1.dataset.y = y;

        road.appendChild(line1);
        roadLines.push(line1);

        const line2 = document.createElement("div");
        line2.className = "roadLine line2";
        line2.dataset.y = y;

        road.appendChild(line2);
        roadLines.push(line2);

    }

}

function updateRoadLines(delta) {

    roadLines.forEach(line => {

        let y = Number(line.dataset.y);

        y += speed * (delta / 16);

        if (y > road.clientHeight) {
            y = -100;
        }

        line.dataset.y = y;
        line.style.top = y + "px";

    });

}


/* =====================================================
   RIDER
===================================================== */

function updateRider() {

    rider.style.left = lanePositions[lane] + "%";
    rider.style.transform = "translateX(-50%)";

}

function moveLeft() {

    if (!playing) return;

    if (lane > 0) {

        lane--;
        updateRider();

    }

}

function moveRight() {

    if (!playing) return;

    if (lane < 2) {

        lane++;
        updateRider();

    }

}


/* =====================================================
   CREATE CAR
===================================================== */

function createCar() {

    const car = document.createElement("div");

    const colours = [
        "carRed",
        "carBlue",
        "carYellow",
        "carWhite"
    ];

    car.className =
        "car " +
        colours[Math.floor(Math.random() * colours.length)];

    const laneCar = Math.floor(Math.random() * 3);

    car.dataset.lane = laneCar;
    car.dataset.y = -120;

    car.style.left = lanePositions[laneCar] + "%";
    car.style.top = "-120px";
    car.style.transform = "translateX(-50%)";

    road.appendChild(car);

    cars.push(car);

}


/* =====================================================
   CREATE COIN
===================================================== */

function createCoin() {

    const coin = document.createElement("div");

    coin.className = "coin";

    const laneCoin = Math.floor(Math.random() * 3);

    coin.dataset.lane = laneCoin;
    coin.dataset.y = -80;

    coin.style.left = lanePositions[laneCoin] + "%";
    coin.style.top = "-80px";
    coin.style.transform = "translateX(-50%)";

    road.appendChild(coin);

    coins.push(coin);

}
/* =====================================================
   COLLISION
===================================================== */

function collision(a, b) {

    const A = a.getBoundingClientRect();
    const B = b.getBoundingClientRect();

    return !(

        A.right < B.left ||
        A.left > B.right ||
        A.bottom < B.top ||
        A.top > B.bottom

    );

}


/* =====================================================
   UPDATE HUD
===================================================== */

function updateLives() {

    livesText.textContent = lives;

}

function updateCoins() {

    coinCount.textContent = totalCoins;

}

function updateScore() {

    scoreText.textContent = score;

}


/* =====================================================
   START GAME
===================================================== */

function startGame() {

    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    cars.forEach(car => car.remove());
    cars = [];

    coins.forEach(coin => coin.remove());
    coins = [];

    score = 0;
    totalCoins = 0;

    lives = 3;
    fuel = 100;
    speed = 5;

    spawnTimer = 0;
    coinTimer = 0;
    nextCoinTime = 2000 + Math.random() * 3000;

    lane = 1;

    updateScore();
    updateCoins();
    updateLives();
    updateRider();

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    playing = true;
    paused = false;

    pauseBtn.textContent = "⏸";
    pauseText.classList.add("hidden");

    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {});

    engineSound.currentTime = 0;
    engineSound.play().catch(() => {});

    lastTime = performance.now();

    createCar();

    animationId = requestAnimationFrame(gameLoop);

}


/* =====================================================
   END GAME
===================================================== */

function endGame() {

    if (!playing) return;

    playing = false;

    cancelAnimationFrame(animationId);

    bgMusic.pause();
    engineSound.pause();

    bgMusic.currentTime = 0;
    engineSound.currentTime = 0;

    if (crashSound) {

        crashSound.currentTime = 0;
        crashSound.play().catch(() => {});

    }

    finalScoreText.textContent = score;

    if (score > highScore) {

        highScore = score;

        localStorage.setItem(
            "misiRiderTopScore",
            highScore
        );

        highScoreText.textContent = highScore;

    }

    gameOverScreen.classList.remove("hidden");

}
/* =====================================================
   GAME LOOP
===================================================== */

function gameLoop(time) {

    if (!playing) return;

    let delta = time - lastTime;

    if (delta > 50) delta = 16;

    lastTime = time;

    updateRoadLines(delta);

    spawnTimer += delta;
    coinTimer += delta;

    fuel -= 0.01;

    if (fuel <= 0) {

        endGame();
        return;

    }

    /* =========================
       CREATE CAR
    ========================= */

    if (spawnTimer >= 1200) {

        createCar();
        spawnTimer = 0;

    }

    /* =========================
       CREATE COIN
    ========================= */

    if (coinTimer >= nextCoinTime) {

        createCoin();

        coinTimer = 0;

        nextCoinTime = 2000 + Math.random() * 3000;

    }

    /* =========================
       UPDATE CAR
    ========================= */

    for (let i = cars.length - 1; i >= 0; i--) {

        const car = cars[i];

        let y = Number(car.dataset.y);

        y += speed * (delta / 16);

        car.dataset.y = y;
        car.style.top = y + "px";

        if (collision(rider, car)) {

            car.remove();
            cars.splice(i, 1);

            lives--;
            updateLives();

            if (lives <= 0) {

                endGame();
                return;

            }

            continue;

        }

        if (y > road.clientHeight + 120) {

            car.remove();
            cars.splice(i, 1);

            score += 10;
            updateScore();

            speed = Math.min(10, 5 + score / 250);

        }

    }

    /* =========================
       UPDATE COIN
    ========================= */

    for (let i = coins.length - 1; i >= 0; i--) {

        const coin = coins[i];

        let y = Number(coin.dataset.y);

        y += speed * (delta / 16);

        coin.dataset.y = y;
        coin.style.top = y + "px";

        if (collision(rider, coin)) {

            score += 10;
            totalCoins++;

            fuel = Math.min(100, fuel + 10);

            updateScore();
            updateCoins();

            if (coinSound) {

                coinSound.currentTime = 0;
                coinSound.play().catch(() => {});

            }

            coin.remove();
            coins.splice(i, 1);

            continue;

        }

        if (y > road.clientHeight + 80) {

            coin.remove();
            coins.splice(i, 1);

        }

    }

    animationId = requestAnimationFrame(gameLoop);

}
/* =====================================================
   CONTROL
===================================================== */

// Keyboard
document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowLeft") {

        e.preventDefault();
        moveLeft();

    }

    if (e.key === "ArrowRight") {

        e.preventDefault();
        moveRight();

    }

    if (e.key === "Escape") {

        pauseBtn.click();

    }

});


// Mobile
leftBtn.addEventListener("pointerdown", moveLeft);
rightBtn.addEventListener("pointerdown", moveRight);


// Start
startBtn.addEventListener("click", startGame);


// Restart
restartBtn.addEventListener("click", startGame);


// Pause
pauseBtn.addEventListener("click", () => {

    if (!playing && !paused) return;

    if (!paused) {

        paused = true;
        playing = false;

        cancelAnimationFrame(animationId);

        pauseBtn.textContent = "▶";
        pauseText.classList.remove("hidden");

        bgMusic.pause();
        engineSound.pause();

    } else {

        paused = false;
        playing = true;

        pauseBtn.textContent = "⏸";
        pauseText.classList.add("hidden");

        bgMusic.play().catch(() => {});
        engineSound.play().catch(() => {});

        lastTime = performance.now();

        animationId = requestAnimationFrame(gameLoop);

    }

});


/* =====================================================
   INITIAL
===================================================== */

createRoadLines();
updateRider();
updateScore();
updateCoins();
updateLives();
