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

const signup_Form = document.getElementById('signup-form_');
const verify_Form = document.getElementById('verify-form_');

let form;
let email;

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

// Optimized function to send form data as JSON
async function sendFormDataAsJSON(formId, url) {
  try {
    form = document.getElementById(formId);
    const formData = new FormData(form);

    // Convert FormData to JSON
    const formDataJSON = Object.fromEntries(formData.entries());
    email = formDataJSON.email;

    // Send the JSON data using fetch
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formDataJSON)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log('Success:', data);
    return data;

  } catch (error) {
    console.error('Submission error:', error);
    alert(error.message || 'Internal server error!');
  }
};

// function to verify otp
async function verifyOTP(data_, url) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data_)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log('Success:', data);
    return data;
  } catch (error) {
    console.log('Error verifying OTP!', error);
  }
};

// singup
document.getElementById('signup-form_').addEventListener('submit', async function (event) {
  event.preventDefault();
  const data = await sendFormDataAsJSON(
    'signup-form_',
    'https://sogo-backend.onrender.com/api/user/signup',
  );
  if (data) {
    signup_Form.classList.add('d-none');
    verify_Form.classList.remove('d-none');
    verify_Form.classList.add('d-block');
    alert(data.message);
  }
});

// login
document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const data = await sendFormDataAsJSON(
    'login-form',
    'https://sogo-backend.onrender.com/api/user/login',
  );
  if (data) {
    closeForm();
    form.reset();
    document.body.style.overflow = 'auto';
    alert(data.message);
  }
});

// verify button
document.getElementById('verify-btn').addEventListener('click', async (e) => {
  e.preventDefault();
  const otp = document.getElementById('otp').value;

  const data = await verifyOTP({ email, otp }, 'https://sogo-backend.onrender.com/api/user/verify-otp');
  if (data) {
    closeForm();
    form.reset();
    document.body.style.overflow = 'auto';
    alert(data.message);
  }
});

// popup signup form
window.onload = async function () {
  const response = await fetch('https://sogo-backend.onrender.com/api/user/check-login', {
    method: 'GET',
    credentials: 'include'
  });

  if (response.ok) {
    return;
  }

  setTimeout(function () {
    overlay.style.display = 'block';
    loginForm.classList.remove('d-none');
    loginForm.classList.add('d-block');
    document.body.style.overflow = 'hidden';
  }, 3000);
};

// search availability rooms
document.getElementById('search-availability').addEventListener('submit', async function (e) {
  e.preventDefault();
  try {

    const location = document.getElementById('location').value;
    const checkIn = document.getElementById('checkin_date').value;
    const checkOut = document.getElementById('checkout_date').value;

    if (!location || !checkIn || !checkOut) {
      return;
    }

    const response = await fetch('https://sogo-backend.onrender.com/api/room');
    const result = await response.json();

    if (response.ok) {
      console.log('Available rooms:', result);
      generateRoomCards(result);
      window.location.hash = 'rooms_';
    } else {
      console.error('Error fetching availability:', result);
    }

  } catch (error) {
    console.error('Error:', error);
  }
});

// Function to generate room cards dynamically
function generateRoomCards(rooms) {
  const roomContainer = document.getElementById('room-container');
  roomContainer.innerHTML = ''; // Clear previous room cards

  rooms.forEach(room => {
    const roomCard = document.createElement('div');
    roomCard.className = 'col-md-6 col-lg-4 mb-5';
    roomCard.setAttribute('data-aos', 'fade-up');

    roomCard.innerHTML = `
      <a href="#" class="room">
        <figure class="img-wrap">
          <img src="${room.images[0]}" alt="${room.roomType}" class="img-fluid mb-3" />
        </figure>
        <div class="p-3 text-center room-info">
          <h2>${room.roomType} Room</h2>
          <span class="text-uppercase letter-spacing-1">${room.price}$ / per night</span>
        </div>
      </a>
    `;

    roomContainer.appendChild(roomCard);
  });
}