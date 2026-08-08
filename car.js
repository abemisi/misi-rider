/* =====================================================
   MISI RIDER V3.1
   CAR.JS
===================================================== */


/* =====================================================
   CAR IMAGE
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

function createCar(){

    const car = document.createElement("div");

    car.className = "car";

    const lane = Math.floor(Math.random() * 3);

    car.dataset.lane = lane;
    car.dataset.y = -160;

    car.style.left = Game.lanePositions[lane] + "%";
    car.style.top = "-160px";
    car.style.transform = "translateX(-50%)";

    const img = carImages[
        Math.floor(Math.random() * carImages.length)
    ];

    car.style.backgroundImage = `url("${img}")`;

    Game.ui.road.appendChild(car);

    Game.cars.push(car);

}


/* =====================================================
   UPDATE CAR
===================================================== */

function updateCars(delta){

    for(let i = Game.cars.length - 1; i >= 0; i--){

        const car = Game.cars[i];

        let y = Number(car.dataset.y);

        y += Game.speed * (delta / 16);

        car.dataset.y = y;

        car.style.top = y + "px";


        /* =============================================
           COLLISION RIDER
        ============================================= */

        if(checkCarCollision(car)){

            car.remove();

            Game.cars.splice(i,1);

            handleCarCrash();

            continue;

        }


        /* =============================================
           REMOVE CAR
        ============================================= */

        if(y > Game.ui.road.clientHeight + 200){

            car.remove();

            Game.cars.splice(i,1);

        }

    }

}


/* =====================================================
   CHECK CAR COLLISION
===================================================== */

function checkCarCollision(car){

    if(!Game.rider){

        return false;

    }

    const riderRect =
        Game.rider.getBoundingClientRect();

    const carRect =
        car.getBoundingClientRect();


    const paddingX = 8;
    const paddingY = 10;


    return (

        riderRect.left + paddingX <
        carRect.right - paddingX &&

        riderRect.right - paddingX >
        carRect.left + paddingX &&

        riderRect.top + paddingY <
        carRect.bottom - paddingY &&

        riderRect.bottom - paddingY >
        carRect.top + paddingY

    );

}


/* =====================================================
   HANDLE CAR CRASH
===================================================== */

function handleCarCrash(){

    if(Game.crashed){

        return;

    }

    Game.crashed = true;


    /* =========================
       KURANGKAN NYAWA
    ========================= */

    Game.lives--;

    if(Game.lives < 0){

        Game.lives = 0;

    }


    /* =========================
       UPDATE HUD
    ========================= */

    if(typeof updateHUD === "function"){

        updateHUD();

    }


    /* =========================
       CRASH SOUND
    ========================= */

    if(typeof playCrash === "function"){

        playCrash();

    }


    /* =========================
       GAME OVER HANYA BILA
       NYAWA HABIS
    ========================= */

    if(Game.lives <= 0){

        if(typeof gameOver === "function"){

            gameOver();

        }

    }


    /* =========================
       RESET CRASH LOCK
    ========================= */

    setTimeout(function(){

        Game.crashed = false;

    }, 700);

}

    /* =============================================
       CRASH SOUND
    ============================================= */

    if(typeof playCrash === "function"){

        playCrash();

    }


    /* =============================================
       STOP ENGINE
    ============================================= */

    if(typeof stopEngine === "function"){

        stopEngine();

    }


    /* =============================================
       GAME OVER
    ============================================= */

    if(typeof gameOver === "function"){

        gameOver();

    }


    setTimeout(()=>{

        Game.crashed = false;

    }, 500);

}


/* =====================================================
   REMOVE ALL CAR
===================================================== */

function clearCars(){

    Game.cars.forEach(car => car.remove());

    Game.cars = [];

}
