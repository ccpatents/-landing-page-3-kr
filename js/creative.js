let scroll_1000_event = false;
let share_event = false;
let enlarge_event = false;
let store_event = false;
let semi_download_event = false;

let win_10 = false;

let bg_video = document.getElementById("bg_video");

(function ($) {
  "use strict"; // Start of use strict

  let width = window.innerWidth;
  if (width < 768) {
    video_controls_display(true);
  }

  window.addEventListener('resize', function () {
    // 나중에 debounce 적용
    resize_width();
  });

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
          },
        ]
      });

      //mobile
      document.getElementById("share-button").style.display = "inline-block";
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
          scrollTop: (target.offset().top - 72)
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
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }

    if ($("#mainNav").offset().top > 999.9 && scroll_1000_event === false) {
      gtag('event', 'scroll_1000', {
        'event_category': 'scroll'
      });
      scroll_1000_event = true;
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  $('.carousel-posts').owlCarousel({
    autoplay: false,
    autoHeight: true,
    center: false,
    loop: false,
    items: 1,
    margin: 30,
    stagePadding: 0,
    nav: false,
    dots: true,
    navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  });

  //$('.popup-img').popupimg();

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

  document.getElementById('store-button1').onclick = function () {
    let gtag_ignore = true;

    if (win_10) {
      gtag_ignore = false;
    } else {
      alert("윈도우10에서만 지원됩니다.");
    }

    if (!store_event && !gtag_ignore) {
      gtag('event', 'click_store', {
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
      gtag('event', 'click_store', {
        'event_category': 'button'
      });
    }
    store_event = true;
  }

  document.getElementById('download').onclick = function (ev) {
    document.getElementById('install-video').src += "&autoplay=1";
    ev.preventDefault();

    if (!semi_download_event) {
      gtag('event', 'semi_download', {
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

function resize_width() {
  let width = window.innerWidth;
  console.log(width);
  if (width < 768) {
    video_controls_display(true);
  } else {
    video_controls_display(false);
  }
}

function video_controls_display(bool) {
  bg_video.controls = bool;
}