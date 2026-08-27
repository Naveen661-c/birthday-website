/* =====================================================
   ROMANTIC BIRTHDAY WEBSITE
   LOCAL MUSIC CONTROLLER
===================================================== */


/* =====================================================
   LOCAL MUSIC FILES
===================================================== */

const BIRTHDAY_MUSIC = "music/2_birthday.mp3";

const FEELING_MUSIC = "music/3_feelings.mp3";

const FINAL_MUSIC = "music/4_final.mp3";


/* =====================================================
   GLOBAL MUSIC PLAYER
===================================================== */

let musicPlayer = null;

let currentMusic = null;


/* =====================================================
   INITIALIZE AUDIO PLAYER
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        musicPlayer =
            document.getElementById(
                "musicPlayer"
            );


        /*
            No music on opening page.
        */

        currentMusic = null;

    }
);


/* =====================================================
   PLAY MUSIC
===================================================== */

function playMusic(
    file,
    musicName
) {

    /*
        Make sure audio player exists.
    */

    if (!musicPlayer) {

        musicPlayer =
            document.getElementById(
                "musicPlayer"
            );

    }


    if (!musicPlayer) {

        console.error(
            "Music player not found."
        );

        return;

    }


    /*
        If same music is already playing,
        don't restart it.
    */

    if (
        currentMusic === musicName &&
        !musicPlayer.paused
    ) {

        return;

    }


    /*
        Stop current music.
    */

    musicPlayer.pause();

    musicPlayer.currentTime = 0;


    /*
        Load local MP3.
    */

    musicPlayer.src = file;


    /*
        Keep music looping.
    */

    musicPlayer.loop = true;


    /*
        Volume = 70%.
    */

    musicPlayer.volume = 0.7;


    /*
        Remember current music.
    */

    currentMusic = musicName;


    /*
        Start playback.

        This is allowed because this function
        is called after the user clicks a button.
    */

    const playPromise =
        musicPlayer.play();


    if (playPromise !== undefined) {

        playPromise.catch(
            function (error) {

                console.error(
                    "Unable to play music:",
                    error
                );

            }
        );

    }

}


/* =====================================================
   PAGE 2 — BIRTHDAY MUSIC
===================================================== */

function playBirthdayMusic() {

    playMusic(
        BIRTHDAY_MUSIC,
        "birthday"
    );

}


/* =====================================================
   PAGE 3 — FEELING MUSIC
===================================================== */

function playFeelingMusic() {

    playMusic(
        FEELING_MUSIC,
        "feelings"
    );

}


/* =====================================================
   PAGE 4 — FINAL MUSIC
===================================================== */

function playFinalMusic() {

    playMusic(
        FINAL_MUSIC,
        "final"
    );

}


/* =====================================================
   STOP ALL MUSIC
===================================================== */

function stopAllMusic() {

    if (!musicPlayer) {

        return;

    }


    musicPlayer.pause();

    musicPlayer.currentTime = 0;

    musicPlayer.removeAttribute(
        "src"
    );

    musicPlayer.load();

    currentMusic = null;

}


/* =====================================================
   PAGE SWITCH
===================================================== */

function switchPage(
    fromId,
    toId
) {

    const fromPage =
        document.getElementById(
            fromId
        );


    const toPage =
        document.getElementById(
            toId
        );


    /*
        Make sure destination page exists.
    */

    if (!toPage) {

        return;

    }


    /*
        Hide old page.
    */

    if (fromPage) {

        fromPage.classList.remove(
            "active"
        );

    }


    /*
        Show new page.
    */

    toPage.classList.add(
        "active"
    );


    /*
        Reset scroll position.
    */

    toPage.scrollTop = 0;


    requestAnimationFrame(
        function () {

            toPage.scrollTop = 0;

        }
    );

}


/* =====================================================
   PAGE 1 → PAGE 2
===================================================== */

function openBirthday() {

    switchPage(
        "opening",
        "birthday"
    );


    /*
        Start:

        music/2_birthday.mp3
    */

    playBirthdayMusic();

}


/* =====================================================
   PAGE 2 → PAGE 1
===================================================== */

function goToOpening() {

    /*
        Stop music.
    */

    stopAllMusic();


    switchPage(
        "birthday",
        "opening"
    );

}


/* =====================================================
   PAGE 2 → PAGE 3
===================================================== */

function showFeelings() {

    switchPage(
        "birthday",
        "feelings"
    );


    /*
        Start:

        music/3_feelings.mp3
    */

    playFeelingMusic();

}


/* =====================================================
   PAGE 3 → PAGE 2
===================================================== */

function goToBirthday() {

    switchPage(
        "feelings",
        "birthday"
    );


    /*
        Return to:

        music/2_birthday.mp3
    */

    playBirthdayMusic();

}


/* =====================================================
   PAGE 3 → PAGE 4
===================================================== */

function showFinal() {

    switchPage(
        "feelings",
        "final"
    );


    /*
        Start:

        music/4_final.mp3
    */

    playFinalMusic();

}


/* =====================================================
   PAGE 4 → PAGE 3
===================================================== */

function goToFeelings() {

    switchPage(
        "final",
        "feelings"
    );


    /*
        Return to:

        music/3_feelings.mp3
    */

    playFeelingMusic();

}


/* =====================================================
   INITIAL WEBSITE STATE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        currentMusic = null;

    }
);


/* =====================================================
   RESET SCROLL POSITION
===================================================== */

window.addEventListener(
    "pageshow",
    function () {

        const pages = [

            "opening",
            "birthday",
            "feelings",
            "final"

        ];


        pages.forEach(
            function (id) {

                const page =
                    document.getElementById(
                        id
                    );


                if (page) {

                    page.scrollTop = 0;

                }

            }
        );

    }
);