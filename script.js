/* =====================================================
   ROMANTIC BIRTHDAY WEBSITE
   MUSIC CONTROLLER
===================================================== */


/* =====================================================
   YOUTUBE VIDEO IDs
===================================================== */

/*
    PAGE 2 — BIRTHDAY MUSIC
    https://www.youtube.com/watch?v=4ef9WeON_8g
*/

const BIRTHDAY_VIDEO_ID = "4ef9WeON_8g";


/*
    PAGE 3 — FEELING MUSIC
    https://www.youtube.com/watch?v=VCfrL292Gmk
*/

const FEELING_VIDEO_ID = "VCfrL292Gmk";


/*
    PAGE 4 — FINAL MUSIC
    https://www.youtube.com/shorts/0UaRkKc_wk8
*/

const FINAL_VIDEO_ID = "0UaRkKc_wk8";



/* =====================================================
   GLOBAL MUSIC PLAYER
===================================================== */

let musicPlayer = null;

let youtubeReady = false;

let currentMusic = null;



/* =====================================================
   LOAD YOUTUBE IFRAME API
===================================================== */

function loadYouTubeAPI() {

    /*
        Prevent loading the API twice.
    */

    if (
        document.getElementById(
            "youtube-api-script"
        )
    ) {

        return;

    }


    const script =
        document.createElement("script");


    script.id =
        "youtube-api-script";


    script.src =
        "https://www.youtube.com/iframe_api";


    document.head.appendChild(script);

}


loadYouTubeAPI();



/* =====================================================
   YOUTUBE API READY
===================================================== */

function onYouTubeIframeAPIReady() {

    youtubeReady = true;


    /*
        ONLY ONE PLAYER.

        This is important.

        We do NOT create separate players for
        birthday, feelings and final page.
    */

    musicPlayer = new YT.Player(
        "birthdayPlayer",
        {

            height: "1",

            width: "1",

            videoId: BIRTHDAY_VIDEO_ID,

            playerVars: {

                autoplay: 0,

                controls: 0,

                disablekb: 1,

                fs: 0,

                modestbranding: 1,

                rel: 0,

                playsinline: 1,

                loop: 1,

                playlist: BIRTHDAY_VIDEO_ID

            },


            events: {

                onReady:
                    function () {

                        /*
                            Set volume.
                        */

                        musicPlayer.setVolume(
                            70
                        );


                        /*
                            Website starts on
                            opening page.

                            Therefore DON'T play
                            anything automatically here.
                        */

                    },


                onStateChange:
                    function (event) {

                        /*
                            Keep current music looping.

                            YouTube's loop parameter is also
                            enabled above, but this provides
                            an additional safeguard.
                        */

                        if (
                            event.data ===
                            YT.PlayerState.ENDED
                        ) {

                            musicPlayer.playVideo();

                        }

                    }

            }

        }
    );

}



/* =====================================================
   PLAY BIRTHDAY MUSIC
===================================================== */

function playBirthdayMusic() {

    currentMusic =
        "birthday";


    /*
        Make sure the player exists.
    */

    if (
        !musicPlayer ||
        typeof musicPlayer.loadVideoById !==
            "function"
    ) {

        return;

    }


    /*
        Stop whatever is currently playing.

        This guarantees that feeling/final music
        cannot continue underneath birthday music.
    */

    musicPlayer.stopVideo();


    /*
        Load birthday music.
    */

    musicPlayer.loadVideoById(
        BIRTHDAY_VIDEO_ID
    );


    /*
        Set volume.
    */

    musicPlayer.setVolume(
        70
    );

}



/* =====================================================
   PLAY FEELING MUSIC
===================================================== */

function playFeelingMusic() {

    currentMusic =
        "feelings";


    if (
        !musicPlayer ||
        typeof musicPlayer.loadVideoById !==
            "function"
    ) {

        return;

    }


    /*
        Stop current music first.
    */

    musicPlayer.stopVideo();


    /*
        Load feeling music.
    */

    musicPlayer.loadVideoById(
        FEELING_VIDEO_ID
    );


    /*
        Set volume.
    */

    musicPlayer.setVolume(
        70
    );

}



/* =====================================================
   PLAY FINAL MUSIC
===================================================== */

function playFinalMusic() {

    currentMusic =
        "final";


    if (
        !musicPlayer ||
        typeof musicPlayer.loadVideoById !==
            "function"
    ) {

        return;

    }


    /*
        Stop current music first.
    */

    musicPlayer.stopVideo();


    /*
        Load FINAL PAGE music.

        YouTube Short ID:
        0UaRkKc_wk8
    */

    musicPlayer.loadVideoById(
        FINAL_VIDEO_ID
    );


    /*
        Set volume.
    */

    musicPlayer.setVolume(
        70
    );

}



/* =====================================================
   STOP ALL MUSIC
===================================================== */

function stopAllMusic() {

    currentMusic =
        null;


    if (
        musicPlayer &&
        typeof musicPlayer.stopVideo ===
            "function"
    ) {

        musicPlayer.stopVideo();

    }

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

    /*
        Change page.
    */

    switchPage(
        "opening",
        "birthday"
    );


    /*
        Start BIRTHDAY music.

        4ef9WeON_8g
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


    /*
        Change page.
    */

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

    /*
        Change page.
    */

    switchPage(
        "birthday",
        "feelings"
    );


    /*
        Start FEELING music.

        VCfrL292Gmk
    */

    playFeelingMusic();

}



/* =====================================================
   PAGE 3 → PAGE 2
   BACK TO BIRTHDAY
===================================================== */

function goToBirthday() {

    /*
        Change page.
    */

    switchPage(
        "feelings",
        "birthday"
    );


    /*
        IMPORTANT:

        Stop feeling music and replace it
        with birthday music.

        4ef9WeON_8g
    */

    playBirthdayMusic();

}



/* =====================================================
   PAGE 3 → PAGE 4
   FINAL PAGE
===================================================== */

function showFinal() {

    /*
        Change page.
    */

    switchPage(
        "feelings",
        "final"
    );


    /*
        Start FINAL music.

        0UaRkKc_wk8
    */

    playFinalMusic();

}



/* =====================================================
   PAGE 4 → PAGE 3
   BACK TO FEELINGS
===================================================== */

function goToFeelings() {

    /*
        Change page.
    */

    switchPage(
        "final",
        "feelings"
    );


    /*
        Return to FEELING music.

        VCfrL292Gmk
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

            No music should play here.
        */

        currentMusic =
            null;

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