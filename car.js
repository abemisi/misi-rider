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

        if(y > Game.ui.road.clientHeight + 200){

            car.remove();

            Game.cars.splice(i,1);

        }

    }

}


/* =====================================================
   REMOVE ALL CAR
===================================================== */

function clearCars(){

    Game.cars.forEach(car=>car.remove());

    Game.cars=[];

}
