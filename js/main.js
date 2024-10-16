(function ($) {

  'use strict';

  $('.site-menu-toggle').click(function () {
    var $this = $(this);
    if ($('body').hasClass('menu-open')) {
      $this.removeClass('open');
      $('.js-site-navbar').fadeOut(400);
      $('body').removeClass('menu-open');
    } else {
      $this.addClass('open');
      $('.js-site-navbar').fadeIn(400);
      $('body').addClass('menu-open');
    }
  });


  $('nav .dropdown').hover(function () {
    var $this = $(this);
    $this.addClass('show');
    $this.find('> a').attr('aria-expanded', true);
    $this.find('.dropdown-menu').addClass('show');
  }, function () {
    var $this = $(this);
    $this.removeClass('show');
    $this.find('> a').attr('aria-expanded', false);
    $this.find('.dropdown-menu').removeClass('show');
  });



  $('#dropdown04').on('show.bs.dropdown', function () {
    console.log('show');
  });

  // aos
  AOS.init({
    duration: 1000
  });

  // home slider
  $('.home-slider').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 10,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 1,
    autoheight: true,
    navText: ["<span class='ion-chevron-left'></span>", "<span class='ion-chevron-right'></span>"],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 1,
        nav: false
      },
      1000: {
        items: 1,
        nav: true
      }
    }
  });

  // owl carousel
  var majorCarousel = $('.js-carousel-1');
  majorCarousel.owlCarousel({
    loop: true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 3,
    navText: ["<span class='ion-chevron-left'></span>", "<span class='ion-chevron-right'></span>"],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 3,
        nav: true,
        loop: false
      }
    }
  });

  // owl carousel
  var major2Carousel = $('.js-carousel-2');
  major2Carousel.owlCarousel({
    loop: true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    // animateOut: 'fadeOut',
    // animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    autoHeight: true,
    items: 3,
    navText: ["<span class='ion-chevron-left'></span>", "<span class='ion-chevron-right'></span>"],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 3,
        dots: true,
        nav: true,
        loop: false
      }
    }
  });

  var siteStellar = function () {
    $(window).stellar({
      responsive: false,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: 'scroll'
    });
  }
  siteStellar();

  var smoothScroll = function () {
    var $root = $('html, body');

    $('a.smoothscroll[href^="#"]').click(function () {
      $root.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);
      return false;
    });
  }
  smoothScroll();

  // var dateAndTime = function() {
  //   $('#m_date').datepicker({
  //     'format': 'm/d/yyyy',
  //     'autoclose': true
  //   });
  //   $('#checkin_date, #checkout_date').datepicker({
  //     'format': 'd MM, yyyy',
  //     'autoclose': true
  //   });
  //   $('#m_time').timepicker();
  // };
  // dateAndTime();


  var windowScroll = function () {

    $(window).scroll(function () {
      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $('.js-site-header').addClass('scrolled');
      } else {
        $('.js-site-header').removeClass('scrolled');
      }
    });

  };
  windowScroll();


  var goToTop = function () {

    $('.js-gotop').on('click', function (event) {

      event.preventDefault();

      $('html, body').animate({
        scrollTop: $('html').offset().top
      }, 500, 'easeInOutExpo');

      return false;
    });

    $(window).scroll(function () {

      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $('.js-top').addClass('active');
      } else {
        $('.js-top').removeClass('active');
      }

    });

  };

})(jQuery);


const overlay = document.getElementById('overlay');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');


document.getElementById('login-signup-btn').addEventListener('click', function () {
  overlay.style.display = 'block';
  loginForm.classList.remove('d-none');
  loginForm.classList.add('d-block');

  // Disable scroll
  document.body.style.overflow = 'hidden';
});

// Add functionality to hide the form and re-enable scrolling when the overlay is clicked
overlay.addEventListener('click', function () {
  overlay.style.display = 'none';
  loginForm.classList.remove('d-block');
  loginForm.classList.add('d-none');

  // Re-enable scroll
  document.body.style.overflow = 'auto';
});


function closeForm() {
  overlay.style.display = 'none';
  loginForm.classList.remove('d-block');
  loginForm.classList.add('d-none');

  signupForm.classList.remove('d-block');
  signupForm.classList.add('d-none');
};

window.addEventListener('click', function (event) {
  if (event.target === overlay) {
    closeForm();
  }
});

document.getElementById('toSignup').addEventListener('click', () => {
  loginForm.classList.remove('d-block');
  loginForm.classList.add('d-none');

  signupForm.classList.remove('d-none');
  signupForm.classList.add('d-block');
});

document.getElementById('toLogin').addEventListener('click', () => {
  signupForm.classList.remove('d-block');
  signupForm.classList.add('d-none');

  loginForm.classList.remove('d-none');
  loginForm.classList.add('d-block');

});

// calling api

// Optimized function to send form data as JSON
async function sendFormDataAsJSON(formId, url, message) {
  try {
    const form = document.getElementById(formId);
    const formData = new FormData(form);

    // Convert FormData to JSON
    const formDataJSON = Object.fromEntries(formData.entries());

    // Send the JSON data using fetch
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataJSON)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data);
    closeForm();
    form.reset();
    document.body.style.overflow = 'auto';
    alert(data.message || message);

  } catch (error) {
    console.error('Submission error:', error);
    alert(error.message || 'Internal server error!');
  }
};

// singup
document.getElementById('signup-form_').addEventListener('submit', async function (event) {
  event.preventDefault();
  await sendFormDataAsJSON(
    'signup-form_',
    'https://sogo-backend.onrender.com/api/user/signup',
    'Account created successful..!'
  );
});

// login
document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  await sendFormDataAsJSON(
    'login-form',
    'https://sogo-backend.onrender.com/api/user/login',
    'Logged in successful...!'
  );
});
