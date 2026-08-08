/* =====================================================
   MISI RIDER V3.1
   CAR.JS
   CLEAN VERSION
===================================================== */


/* =====================================================
   CAR ASSETS
===================================================== */

const carImages = [
    "assets/cars/car-black.png",
    "assets/cars/car-blue.png",
    "assets/cars/car-green.png",
    "assets/cars/car-red.png",
    "assets/cars/car-white.png",
    "assets/cars/car-yellow.png"
];


/* =====================================================
   CREATE CAR
===================================================== */

function createCar() {

    if (!Game.ui || !Game.ui.road) {
        return;
    }

    const car = document.createElement("div");

    car.className = "car";

    const lane = Math.floor(
        Math.random() * Game.lanePositions.length
    );

    car.dataset.lane = lane;
    car.dataset.y = -160;

    car.style.left =
        Game.lanePositions[lane] + "%";

    car.style.top = "-160px";

    car.style.transform =
        "translateX(-50%)";


    const image =
        carImages[
            Math.floor(
                Math.random() * carImages.length
            )
        ];

    car.style.backgroundImage =
        `url("${image}")`;


    Game.ui.road.appendChild(car);

    Game.cars.push(car);
}


/* =====================================================
   UPDATE CARS
===================================================== */

function updateCars(delta) {

    if (!Game.cars) {
        Game.cars = [];
    }

    for (
        let i = Game.cars.length - 1;
        i >= 0;
        i--
    ) {

        const car = Game.cars[i];

        if (!car) {
            Game.cars.splice(i, 1);
            continue;
        }


        let y =
            Number(car.dataset.y || -160);


        y +=
            Game.speed *
            (delta / 16);


        car.dataset.y = y;

        car.style.top =
            y + "px";


        /* =========================
           COLLISION
        ========================= */

        if (checkCarCollision(car)) {

            car.remove();

            Game.cars.splice(i, 1);

            handleCarCrash();

            continue;
        }


        /* =========================
           REMOVE CAR
        ========================= */

        if (
            y >
            Game.ui.road.clientHeight + 200
        ) {

            car.remove();

            Game.cars.splice(i, 1);
        }
    }
}


/* =====================================================
   CHECK COLLISION
===================================================== */

function checkCarCollision(car) {

    if (!Game.rider) {
        return false;
    }

    const riderRect =
        Game.rider.getBoundingClientRect();

    const carRect =
        car.getBoundingClientRect();


    const padding = 10;


    return (
        riderRect.left + padding <
        carRect.right - padding &&

        riderRect.right - padding >
        carRect.left + padding &&

        riderRect.top + padding <
        carRect.bottom - padding &&

        riderRect.bottom - padding >
        carRect.top + padding
    );
}


/* =====================================================
   HANDLE CRASH
===================================================== */

function handleCarCrash() {

    /* Prevent multiple crashes at once */

    if (Game.crashed) {
        return;
    }

    Game.crashed = true;


    /* =========================
       INITIAL LIVES
    ========================= */

    if (
        typeof Game.lives !== "number"
    ) {

        Game.lives = 3;
    }


    /* =========================
       REMOVE ONE LIFE
    ========================= */

    Game.lives--;


    if (Game.lives < 0) {
        Game.lives = 0;
    }


    /* =========================
       UPDATE HUD
    ========================= */

    if (
        typeof updateHUD === "function"
    ) {

        updateHUD();
    }


    /* =========================
       CRASH SOUND
    ========================= */

    if (
        typeof playCrash === "function"
    ) {

        playCrash();
    }


    /* =========================
       GAME OVER
       ONLY WHEN LIVES = 0
    ========================= */

    if (Game.lives <= 0) {

        if (
            typeof gameOver === "function"
        ) {

            gameOver();
        }

    }


    /* =========================
       CRASH COOLDOWN
    ========================= */

    setTimeout(function () {

        Game.crashed = false;

    }, 800);
}


/* =====================================================
   CLEAR ALL CARS
===================================================== */

function clearCars() {

    if (!Game.cars) {
        Game.cars = [];
        return;
    }


    Game.cars.forEach(function (car) {

        if (car) {
            car.remove();
        }

    });


    Game.cars = [];
}


/* =====================================================
   END CAR.JS
===================================================== */
