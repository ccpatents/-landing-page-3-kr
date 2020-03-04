var sound = false;

var ccpatents_player;
var install_player;

var win_10 = false;

var store_event = false;

(function ($) {
    "use strict"; // Start of use strict

    var ua = navigator.userAgent.toLowerCase();
    win_10 = (ua.indexOf("windows nt 10.0") != -1 || ua.indexOf("windows nt 6.4") != -1) ? true : false;

    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });

    $("#sound").click(function () {
        soundTurn(sound);
    });

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var selector = ".section";

    var $slides = $(selector);

    var currentSlide = 0;
    var isAnimating = false;

    var stopAnimation = function () {
        setTimeout(function () {
            isAnimating = false;
        }, 300);
    };

    var bottomIsReached = function ($elem) {
        var rect = $elem[0].getBoundingClientRect();
        return rect.bottom <= $(window).height();
    };

    var topIsReached = function ($elem) {
        var rect = $elem[0].getBoundingClientRect();
        return rect.top >= 0;
    };

    document.addEventListener(
        "wheel",
        function (event) {
            var $currentSlide = $($slides[currentSlide]);

            if (isAnimating) {
                event.preventDefault();
                return;
            }

            var direction = -event.deltaY;

            if (direction < 0) {
                // next
                if (currentSlide + 1 >= $slides.length) return;
                if (!bottomIsReached($currentSlide)) return;
                event.preventDefault();
                currentSlide++;
                var $slide = $($slides[currentSlide]);
                var offsetTop = $slide.offset().top;
                isAnimating = true;
                $("html, body").animate({
                        scrollTop: offsetTop
                    },
                    1000,
                    stopAnimation
                );
            } else {
                // back
                if (currentSlide - 1 < 0) return;
                if (!topIsReached($currentSlide)) return;
                event.preventDefault();
                currentSlide--;
                var $slide = $($slides[currentSlide]);
                var offsetTop = $slide.offset().top;
                isAnimating = true;
                $("html, body").animate({
                        scrollTop: offsetTop
                    },
                    1000,
                    stopAnimation
                );
            }
        }, {
            passive: false
        }
    );
})(jQuery); // End of use strict

function soundTurn(power) {
    if (power) {
        sound = false;
    } else {
        sound = true;
    }

    if (sound) {
        $("#speaker").attr("src", "sound.png");
        ccpatents_player.unMute();
    } else {
        $("#speaker").attr("src", "mute.png");
        ccpatents_player.mute();
    }
}

function onYouTubeIframeAPIReady() {
    ccpatents_player = new YT.Player('ccpatents-video', {
        width: '100%',
        videoId: 'hJuHVgCmoSw',
        events: {
            'onReady': onCCPatentsReady,
            'onStateChange': onPlayerStateChange
        }
    });

    install_player = new YT.Player('install-video', {
        width: '100%',
        videoId: '6GLS2SxLgqI',
        events: {
            'onReady': onInstallReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onCCPatentsReady(event) {
    ccpatents_player = event.target;
    //ccpatents_player.playVideo();
    ccpatents_player.seekTo(27);
    ccpatents_player.mute();
}

function onInstallReady(event) {
    install_player = event.target;
    install_player.mute();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        event.target.stopVideo();
    }
}

function click_download() {
    ccpatents_player.stopVideo();
    install_player.stopVideo();
    install_player.playVideo();

    if (win_10) {
        if (!store_event) {
            gtag('event', 'store', {
                'event_category': 'button'
            });
        }
        store_event = true;

        setTimeout(function () {
            window.location.href = "ms-windows-store://pdp/?productid=9N798V33QDF8";
        }, 3000)
    } else {
        alert("윈도우10에서만 설치할 수 있습니다.");
    }
}