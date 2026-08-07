/* =====================================================
   MISI RIDER V3.1
   LEVEL.JS
===================================================== */

/* =====================================================
   CHECK LEVEL
===================================================== */

function checkLevel(){

    /* LEVEL 2 */

    if(Game.score >= 500){

        Game.level = 2;

        Game.speed = 7;

        Game.carSpawnDelay = 1000;

    }

    /* LEVEL 3 */

    if(Game.score >= 1000){

        Game.level = 3;

        Game.speed = 8;

        Game.carSpawnDelay = 850;

    }

    /* LEVEL 4 */

    if(Game.score >= 1500){

        Game.level = 4;

        Game.speed = 9;

        Game.carSpawnDelay = 700;

    }

}
