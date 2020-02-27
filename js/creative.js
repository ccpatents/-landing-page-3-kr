let scroll_1000_event = false;
let share_event = false;
let enlarge_event = false;
let store_event = false;
let semi_download_event = false;

let win_10 = false;

let scroll_timer;

let bg_video = document.getElementById("bg_video");

(function ($) {
  "use strict"; // Start of use strict

  let ua = navigator.userAgent.toLowerCase();
  win_10 = (ua.indexOf("windows nt 10.0") != -1 || ua.indexOf("windows nt 6.4") != -1) ? true : false;

  let filter = "win32|win64|mac";
  if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
      // // 사용할 앱의 JavaScript 키를 설정해 주세요.
      Kakao.init('5e27a7316193f718575986dcfa86666f');
      // // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
      Kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: 'CCPatents',
          description: '#특허 검색식 #완성 도우미',
          imageUrl: 'https://kr.ccpatents.net/icon_kakao.png',
          link: {
            mobileWebUrl: 'https://kr.ccpatents.net',
            webUrl: 'https://kr.ccpatents.net'
          }
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845
        },
        buttons: [{
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'https://kr.ccpatents.net',
            webUrl: 'https://kr.ccpatents.net'
          }
        }, ]
      });

      //mobile
      document.getElementById("share").style.display = "inline-block";
      document.getElementById("store-area2").style.display = "none";
      document.getElementById("win10_warn").style.display = "block";
    } else {
      //pc 
      document.getElementById("store-area1").style.display = "block";
      document.getElementById("win_10_ads").style.display = "block";
    }
  }

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 75)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if (!scroll_timer) {
      scroll_timer = setTimeout(function () {
        scroll_timer = null;
        let scrolled = $("#mainNav").offset().top;
        let width = window.innerWidth;
        if (scrolled > 100) {
          $("#mainNav").addClass("navbar-scrolled");
        } else {
          $("#mainNav").removeClass("navbar-scrolled");
        }

        if (scrolled > 2500 && scroll_1000_event === false) {
          gtag('event', 'scroll_2000', {
            'event_category': 'scroll'
          });
          scroll_1000_event = true;
        }

        if (win_10) {
          if (scrolled > 470 && scrolled < 3200) {
            // 표시
            $('#store-area3').fadeIn('slow')
          } else {
            // 제거
            $('#store-area3').fadeOut('slow')
          }
        }
        if (scrolled > 1500 && scrolled < 3300 && width > 1000) {
          // 표시
          $('#addon-area').fadeIn('slow');
        } else {
          // 제거
          $('#addon-area').fadeOut('slow');
        }
      }, 250)
    }
  };

  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  /*$('.owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: false,
    animateOut: 'fadeOut',
    autoplay: true,
    autoplayTimeout: 1750,
    autoplayHoverPause: false,
    mouseDrag: false,
    touchDrag: false,
  })*/

  $('.popup-img').popupimg();
  $(".img-container").popupLightbox({
    width: 1000,
    height: 525
  });

  //document.querySelector('#share').addEventListener('click', WebShare);
  /*document.getElementById('share').onclick = function () {
    if (!share_event) {
      gtag('event', 'share', {
        'event_category': 'button'
      });
      share_event = true;
    }

    WebShare();
  }*/

  /*document.getElementById('socials').onclick = function () {
    if (!share_event) {
      gtag('event', 'share', {
        'event_category': 'button'
      });
      share_event = true;
    }
  }*/

  document.getElementById('kakao-link-btn').onclick = function () {
    if (!share_event) {
      gtag('event', 'share', {
        'event_category': 'button'
      });
    }
    share_event = true;
  }

  document.getElementById('store-button1').onclick = function () {
    let gtag_ignore = true;

    if (win_10) {
      gtag_ignore = false;
    } else {
      alert("윈도우10에서만 지원됩니다.");
    }

    if (!store_event && !gtag_ignore) {
      gtag('event', 'store', {
        'event_category': 'button'
      });
    }
    store_event = true;
  }

  document.getElementById('store-button2').onclick = function () {
    let gtag_ignore = true;

    if (win_10) {
      gtag_ignore = false;
    } else {
      alert("윈도우10에서만 지원됩니다.");
    }

    if (!store_event && !gtag_ignore) {
      gtag('event', 'store', {
        'event_category': 'button'
      });
    }
    store_event = true;
  }

  document.getElementById('store-button3').onclick = function () {
    if (!store_event) {
      gtag('event', 'store', {
        'event_category': 'button'
      });
    }
    store_event = true;
  }

  document.getElementById('download').onclick = function (ev) {
    document.getElementById('install-video').src += "&autoplay=1";
    ev.preventDefault();

    if (!semi_download_event) {
      gtag('event', 'install', {
        'event_category': 'button'
      });
    }
    semi_download_event = true;
  }

  setTimeout(function () {
    if (win_10) {
      gtag('event', 'timeout_10s_pc', {
        'event_category': 'timeout'
      });
    }
  }, 10000);

  setTimeout(function () {
    if (win_10) {
      gtag('event', 'timeout_25s_pc', {
        'event_category': 'timeout'
      });
    }
  }, 25000);

  setTimeout(function () {
    gtag('event', 'timeout_45s', {
      'event_category': 'timeout'
    });
  }, 45000);
})(jQuery); // End of use strict

/*async function WebShare() {
  if (navigator.share === undefined) {
    return;
  }

  const title = "CCPatents";
  const text = "특허·상표 검색의 혁명. 클릭 몇 번으로 키프리스 검색식이 뚝.딱.";
  const url = "https://kr.ccpatents.net";
  try {
    await navigator.share({
      title,
      text,
      url
    });
  } catch (error) {
    return;
  }
}*/