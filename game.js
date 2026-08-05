const bgMusic = document.getElementById("bgMusic");
const engineSound = document.getElementById("engineSound");

bgMusic.preload = "auto";
engineSound.preload = "auto";

engineSound.volume = 0.3;
bgMusic.preload = "auto";

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

let playing = false;
let score = 0;
let speed = 5;

let cars = [];
let lines = [];

let lastTime = 0;
let spawnTimer = 0;
let animationId = null;

let lane = 1;

const lanePositions = [20, 50, 80];

let highScore =
  Number(localStorage.getItem("misiRiderTopScore")) || 0;

highScoreText.textContent = highScore;


/* =========================
   GARIS JALAN
========================= */

function createRoadLines() {

  for (let y = -100; y < 800; y += 150) {

    const lineA = document.createElement("div");
    lineA.className = "roadLine line1";
    lineA.dataset.y = y;
    road.appendChild(lineA);

    const lineB = document.createElement("div");
    lineB.className = "roadLine line2";
    lineB.dataset.y = y;
    road.appendChild(lineB);

    lines.push(lineA, lineB);
  }

  updateLines();
}

function updateLines() {

  lines.forEach(line => {
    line.style.top = line.dataset.y + "px";
  });
}


/* =========================
   RIDER
========================= */

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


/* =========================
   CREATE CAR
========================= */

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

  const lightL = document.createElement("div");
  lightL.className = "lightL";

  const lightR = document.createElement("div");
  lightR.className = "lightR";

  car.appendChild(lightL);
  car.appendChild(lightR);

  const carLane = Math.floor(Math.random() * 3);

  car.dataset.lane = carLane;
  car.dataset.y = -110;

  car.style.left = lanePositions[carLane] + "%";
  car.style.transform = "translateX(-50%)";

  road.appendChild(car);

  cars.push(car);
}


/* =========================
   COLLISION
========================= */

function collision(a, b) {

  const A = a.getBoundingClientRect();
  const B = b.getBoundingClientRect();

  const padX = 9;
  const padY = 8;

  return !(
    A.right - padX < B.left + padX ||
    A.left + padX > B.right - padX ||
    A.bottom - padY < B.top + padY ||
    A.top + padY > B.bottom - padY
  );
}


/* =========================
   START GAME
========================= */

function startGame() {

    // Main muzik latar
    if (bgMusic.paused) {
        bgMusic.currentTime = 0;
        bgMusic.play();
    }

    // Main bunyi enjin
    if (engineSound.paused) {
        engineSound.currentTime = 0;
        engineSound.play();
    }

    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    cars.forEach(car => car.remove());
    cars = [];

    score = 0;
    speed = 5;
    spawnTimer = 0;

    lane = 1;

    updateRider();

    scoreText.textContent = "0";

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    playing = true;
    paused = false;

    pauseText.classList.add("hidden");
    pauseBtn.textContent = "⏸";

    lastTime = performance.now();

    createCar();

    animationId = requestAnimationFrame(gameLoop);
}

/* =========================
   GAME LOOP
========================= */

function gameLoop(time) {

  if (!playing) return;

  let delta = time - lastTime;

  if (delta > 50) delta = 16;

  lastTime = time;


  /* JALAN BERGERAK */

  lines.forEach(line => {

    let y = Number(line.dataset.y);

    y += speed * (delta / 16);

    if (y > road.clientHeight) {
      y = -100;
    }

    line.dataset.y = y;
    line.style.top = y + "px";
  });


  /* SPAWN KERETA */

  spawnTimer += delta;

  let spawnDelay = Math.max(
    650,
    1300 - score * 2
  );

  if (spawnTimer >= spawnDelay) {

    createCar();

    spawnTimer = 0;
  }


  /* GERAK KERETA */

  for (let i = cars.length - 1; i >= 0; i--) {

    const car = cars[i];

    let y = Number(car.dataset.y);

    y += speed * (delta / 16);

    car.dataset.y = y;

    car.style.top = y + "px";


    /* LANGGAR */

    if (collision(rider, car)) {

      endGame();paused = false;
pauseBtn.textContent = "⏸";
pauseText.classList.add("hidden");document.addEventListener("keydown", function(e){

    if(e.key==="Escape"){
        pauseBtn.click();
    }

});localStorage.removeItem("misiRiderTopScore");
highScore=0;
highScoreText.textContent=0;

      return;
    }


    /* BERJAYA ELAK */

    if (y > road.clientHeight + 120) {

      car.remove();

      cars.splice(i, 1);

      score += 10;

      scoreText.textContent = score;

      speed = Math.min(
        10,
        5 + score / 250
      );
    }
  }

  animationId = requestAnimationFrame(gameLoop);
}


/* =========================
   GAME OVER
========================= */

function endGame() {

 if (!bgMusic.paused) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
}

  playing = false;

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


/* =========================
   CONTROL
========================= */

document.addEventListener("keydown", e => {

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    moveLeft();
  }

  if (e.key === "ArrowRight") {
    e.preventDefault();
    moveRight();
  }
});

document.getElementById("leftBtn")
  ?.addEventListener("pointerdown", moveLeft);

document.getElementById("rightBtn")
  ?.addEventListener("pointerdown", moveRight);

document.getElementById("startBtn")
  ?.addEventListener("click", startGame);

document.getElementById("restartBtn")
  ?.addEventListener("click", startGame);

/* INITIAL */

createRoadLines();
updateRider();let paused = false;

const pauseBtn = document.getElementById("pauseBtn");
const pauseText = document.getElementById("pauseText");

pauseBtn.addEventListener("click", function () {

  // Kalau game belum mula
  if (!playing && !paused) return;

  // PAUSE
  if (!paused) {

    paused = true;
    playing = false;

    pauseBtn.textContent = "▶";

    pauseText.classList.remove("hidden");

    cancelAnimationFrame(animationId);

  }

  // RESUME
  else {

    paused = false;
    playing = true;

    pauseBtn.textContent = "⏸";

    // <<< INI YANG TIADA SEBELUM INI
    pauseText.classList.add("hidden");

    lastTime = performance.now();

    animationId = requestAnimationFrame(gameLoop);

  }

});
