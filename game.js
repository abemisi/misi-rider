/* =====================================================
   MISI RIDER
   VERSION 2.1
===================================================== */


/* =========================
   AUDIO
========================= */

const bgMusic = document.getElementById("bgMusic");
const engineSound = document.getElementById("engineSound");
const crashSound = document.getElementById("crashSound");
const coinSound = document.getElementById("coinSound");

bgMusic.preload = "auto";

engineSound.preload = "auto";
engineSound.loop = true;
engineSound.volume = 0.25;

crashSound.volume = 0.8;

if (coinSound) {
    coinSound.volume = 0.6;
}


/* =========================
   ELEMENT
========================= */

const road = document.getElementById("road");
const rider = document.getElementById("rider");

const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const finalScoreText = document.getElementById("finalScore");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const pauseBtn = document.getElementById("pauseBtn");
const pauseText = document.getElementById("pauseText");
const livesText = document.getElementById("lives");


/* =========================
   GAME DATA
========================= */

let playing = false;
let paused = false;

let score = 0;
let speed = 5;

let cars = [];
let coins = [];

let lines = [];

let lane = 1;

let animationId = null;
let lastTime = 0;

let spawnTimer = 0;

let coinTimer = 0;
let nextCoinTime = 2000 + Math.random() * 3000;


/* =========================
   PLAYER
========================= */

let lives = 3;
let fuel = 100;


/* =========================
   LANE
========================= */

const lanePositions = [

    20,
    50,
    80

];


/* =========================
   HIGH SCORE
========================= */

let highScore =
Number(localStorage.getItem("misiRiderTopScore")) || 0;

highScoreText.textContent = highScore;
/* =====================================================
   ROAD LINE
===================================================== */

function createRoadLines() {

    for (let y = -100; y < 800; y += 150) {

        const line1 = document.createElement("div");
        line1.className = "roadLine line1";
        line1.dataset.y = y;

        road.appendChild(line1);

        lines.push(line1);

        const line2 = document.createElement("div");
        line2.className = "roadLine line2";
        line2.dataset.y = y;

        road.appendChild(line2);

        lines.push(line2);

    }

}

function updateRoadLines(delta) {

    lines.forEach(line => {

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
    speed = 5;

    lives = 3;
    fuel = 100;

    spawnTimer = 0;
    coinTimer = 0;
    nextCoinTime = 2000 + Math.random() * 3000;

    lane = 1;

    updateRider();

    scoreText.textContent = score;

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

    engineSound.pause();
    engineSound.currentTime = 0;

    bgMusic.pause();
    bgMusic.currentTime = 0;

    crashSound.currentTime = 0;
    crashSound.play().catch(() => {});

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

    if (spawnTimer >= 1200) {

        createCar();

        spawnTimer = 0;

    }

    if (coinTimer >= nextCoinTime) {

        createCoin();

        coinTimer = 0;

        nextCoinTime = 2000 + Math.random() * 3000;

    }
       /* =========================
       CAR
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

            scoreText.textContent = score;

            speed = Math.min(10, 5 + score / 250);

        }

    }


    /* =========================
       COIN
    ========================= */

    for (let i = coins.length - 1; i >= 0; i--) {

        const coin = coins[i];

        let y = Number(coin.dataset.y);

        y += speed * (delta / 16);

        coin.dataset.y = y;
        coin.style.top = y + "px";

        if (collision(rider, coin)) {

            score += 10;

            fuel = Math.min(100, fuel + 10);

            scoreText.textContent = score;

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


// Start & Restart
startBtn.addEventListener("click", startGame);
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
