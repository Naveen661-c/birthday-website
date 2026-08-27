/* =====================================================
   ROMANTIC BIRTHDAY WEBSITE
   LOCAL MUSIC CONTROLLER
===================================================== */


/* =====================================================
   LOCAL MUSIC FILES
===================================================== */

const BIRTHDAY_MUSIC = "music/2_birthday.mp3";
const FEELING_MUSIC  = "music/3_feelings.mp3";
const FINAL_MUSIC    = "music/4_final.mp3";


/* =====================================================
   GLOBAL MUSIC PLAYER
===================================================== */

let musicPlayer = new Audio();

let currentMusic = null;


/*
    Volume: 70%
*/

musicPlayer.volume = 0.7;


/*
    Loop current music forever.
*/

musicPlayer.loop = true;


/* =====================================================
   PLAY MUSIC
===================================================== */

function playMusic(file, musicName) {

    /*
        If the same music is already playing,
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
        Load new music.
    */

    musicPlayer.src = file;

    currentMusic = musicName;


    /*
        Play music.
    */

    musicPlayer.play().catch(
        function (error) {

            console.log(
                "Music playback was blocked:",
                error
            );

        }
    );

}


/* =====================================================
   PLAY BIRTHDAY MUSIC
===================================================== */

function playBirthdayMusic() {

    playMusic(
        BIRTHDAY_MUSIC,
        "birthday"
    );

}


/* =====================================================
   PLAY FEELING MUSIC
===================================================== */

function playFeelingMusic() {

    playMusic(
        FEELING_MUSIC,
        "feelings"
    );

}


/* =====================================================
   PLAY FINAL MUSIC
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

    musicPlayer.pause();

    musicPlayer.currentTime = 0;

    musicPlayer.src = "";

    currentMusic = null;

}


/* =====================================================
   PAGE SWITCH FUNCTION
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
   OPEN BIRTHDAY GIFT
===================================================== */

function openBirthday() {

    switchPage(
        "opening",
        "birthday"
    );


    /*
        Start birthday music.

        music/2_birthday.mp3
    */

    playBirthdayMusic();

}


/* =====================================================
   PAGE 2 → PAGE 1
   BACK TO OPENING
===================================================== */

function goToOpening() {

    /*
        Opening page has no music.
    */

    stopAllMusic();


    switchPage(
        "birthday",
        "opening"
    );

}


/* =====================================================
   PAGE 2 → PAGE 3
   SHOW FEELINGS
===================================================== */

function showFeelings() {

    switchPage(
        "birthday",
        "feelings"
    );


    /*
        Start feelings music.

        music/3_feelings.mp3
    */

    playFeelingMusic();

}


/* =====================================================
   PAGE 3 → PAGE 2
   BACK TO BIRTHDAY
===================================================== */

function goToBirthday() {

    switchPage(
        "feelings",
        "birthday"
    );


    /*
        Return to birthday music.

        music/2_birthday.mp3
    */

    playBirthdayMusic();

}


/* =====================================================
   PAGE 3 → PAGE 4
   FINAL PAGE
===================================================== */

function showFinal() {

    switchPage(
        "feelings",
        "final"
    );


    /*
        Start final music.

        music/4_final.mp3
    */

    playFinalMusic();

}


/* =====================================================
   PAGE 4 → PAGE 3
   BACK TO FEELINGS
===================================================== */

function goToFeelings() {

    switchPage(
        "final",
        "feelings"
    );


    /*
        Return to feelings music.

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

        /*
            Website opens on Page 1.

            No music should play automatically.
        */

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
