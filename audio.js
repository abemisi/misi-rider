/* =====================================================
   MISI RIDER V3.1
   AUDIO.JS
===================================================== */

/* =====================================================
   SET AUDIO
===================================================== */

function setupAudio() {

    if (Game.audio.bgMusic) {

        Game.audio.bgMusic.loop = true;
        Game.audio.bgMusic.volume = 0.35;

    }

    if (Game.audio.engine) {

        Game.audio.engine.loop = true;
        Game.audio.engine.volume = 0.25;

    }

    if (Game.audio.coin) {

        Game.audio.coin.volume = 0.60;

    }

    if (Game.audio.crash) {

        Game.audio.crash.volume = 0.80;

    }

}


/* =====================================================
   PLAY
===================================================== */

function playMusic() {

    if (Game.audio.bgMusic) {

        Game.audio.bgMusic.play().catch(()=>{});

    }

}

function stopMusic() {

    if (Game.audio.bgMusic) {

        Game.audio.bgMusic.pause();
        Game.audio.bgMusic.currentTime = 0;

    }

}

function playEngine() {

    if (Game.audio.engine) {

        Game.audio.engine.play().catch(()=>{});

    }

}

function stopEngine() {

    if (Game.audio.engine) {

        Game.audio.engine.pause();
        Game.audio.engine.currentTime = 0;

    }

}

function playCoin() {

    if (Game.audio.coin) {

        Game.audio.coin.currentTime = 0;
        Game.audio.coin.play().catch(()=>{});

    }

}

function playCrash() {

    if (Game.audio.crash) {

        Game.audio.crash.currentTime = 0;
        Game.audio.crash.play().catch(()=>{});

    }

}
