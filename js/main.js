const overlay = document.getElementById('overlay');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const signup_Form = document.getElementById('signup-form_');
const verify_Form = document.getElementById('verify-form_');

let email;

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

// checkIn checkout date

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Set the min attribute for both Check In and Check Out dates
document.getElementById('checkin_date').setAttribute('min', today);
document.getElementById('checkout_date').setAttribute('min', today);

// Ensure that Check Out date is always after Check In date
document.getElementById('checkin_date').addEventListener('change', function () {
  const checkinDate = this.value;
  document.getElementById('checkout_date').setAttribute('min', checkinDate);
});

// adults and children increment decrement option
document.getElementById('adults-increment').onclick = function () {
  const adultsInput = document.getElementById('adults');
  adultsInput.value = parseInt(adultsInput.value) + 1;
};

document.getElementById('adults-decrement').onclick = function () {
  const adultsInput = document.getElementById('adults');
  if (parseInt(adultsInput.value) > 1) {
    adultsInput.value = parseInt(adultsInput.value) - 1;
  }
};

// Children increment and decrement with max age 17
document.getElementById('children-increment').onclick = function () {
  const childrenInput = document.getElementById('children');
  childrenInput.value = parseInt(childrenInput.value) + 1;
  updateChildrenAges();
};

// Prevent manual typing of values above 17 for children
document.getElementById('children').oninput = function () {
  updateChildrenAges();
};

document.getElementById('children-decrement').onclick = function () {
  const childrenInput = document.getElementById('children');
  if (parseInt(childrenInput.value) > 0) {
    childrenInput.value = parseInt(childrenInput.value) - 1;
  }
  updateChildrenAges();
};

// fucntion to update children ages
function updateChildrenAges() {
  const childrenCount = parseInt(document.getElementById('children').value);
  const childrenAgesContainer = document.getElementById('children-ages');

  // Clear existing age inputs
  childrenAgesContainer.innerHTML = '';

  for (let i = 1; i <= childrenCount; i++) {
    const ageSelect = document.createElement('div');
    ageSelect.classList.add('mt-2');

    // Create the label and the select dropdown
    ageSelect.innerHTML = `
      <label for="child-age-${i}" class="font-weight-bold text-black">Child ${i} Age</label>
      <select id="child-age-${i}" class="form-control">
        ${generateAgeOptions()}
      </select>
    `;

    childrenAgesContainer.appendChild(ageSelect);
  }
};

// Function to generate dropdown options for ages (0 to 17)
function generateAgeOptions() {
  let options = '';
  for (let age = 0; age <= 17; age++) {
    options += `<option value="${age}">${age}</option>`;
  }
  return options;
};

// collect the children data
function getChildrenData() {
  const childrenData = [];
  const selectElements = document.querySelectorAll('[id^="child-age-"]');

  selectElements.forEach((select, index) => {
    const age = select.value;
    childrenData.push({ child: index + 1, age: age });
  });

  return childrenData;
};

// location suggestion
$("#location").on("input", function () {
  const query = $(this).val();
  if (query.length > 2) {
    $.getJSON(
      `https://photon.komoot.io/api/?q=${query}&limit=5`,
      function (data) {
        let suggestions = "";
        data.features.forEach(function (place) {
          const placeName =
            place.properties.name + ", " + place.properties.country;
          suggestions += `<li class="list-group-item" onclick="selectLocation('${placeName}')">${placeName}</li>`;
        });
        $("#location-suggestions").html(suggestions).show();
      }
    );
  } else {
    $("#location-suggestions").hide();
  }
});

function selectLocation(location) {
  $("#location").val(location);
  $("#location-suggestions").hide();
};

$(document).click(function () {
  $("#location-suggestions").hide();
});

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
    } else {
      console.log(response);

    }

    const data = await response.json();
    console.log('Success:', data);
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

// singup btn
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
    console.log(data, '=====');

    alert(data.message);
  }
});

// login btn
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
    console.log(data, '===');

    alert(data.message);
  }
});

// check this user is loggedin or not
async function isLoggedIn() {
  try {
    const response = await fetch('https://sogo-backend.onrender.com/api/user/check-login', {
      method: 'GET',
      credentials: 'include'
    });
    return response;
  } catch (error) {
    console.error(error);
    console.log('Error occurred while chcking the user is loggedin or not!');
  }
};

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

// popup login/signup form
// window.onload = async function () {
//   const response = isLoggedIn();

//   if (response.ok) {
//     return;
//   }

//   setTimeout(function () {
//     overlay.style.display = 'block';
//     loginForm.classList.remove('d-none');
//     loginForm.classList.add('d-block');
//     document.body.style.overflow = 'hidden';
//   }, 3000);
// };

// check element is exist or not of particular html page
function checkElement(selector) {
  const element = document.querySelector(selector);

  if (element) {
    console.log(`Element matching '${selector}' exists.`);
    return true;
  } else {
    console.log(`Element matching '${selector}' does not exist.`);
    return false;
  }
};

// search availability
let previousSearch = {
  location: null,
  checkIn: null,
  checkOut: null
};

if (checkElement("#search-availability")) {
  document.getElementById('search-availability').addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
      const location = document.getElementById('location').value;
      const checkIn = document.getElementById('checkin_date').value;
      const checkOut = document.getElementById('checkout_date').value;
      const adults = document.getElementById('adults').value;
      const children = document.getElementById('children').value;
      const childrenAges = getChildrenData();

      // Flatten childrenAges to a query string format
      const childrenAgesParam = childrenAges.map(child => `age${child.child}=${child.age}`).join('&');

      // Check if values have changed
      if (location === previousSearch.location && checkIn === previousSearch.checkIn && checkOut === previousSearch.checkOut) {
        console.warn('Search values have not changed.'); // Feedback for unchanged values
        return;
      }

      // Validate form inputs
      if (!location || !checkIn || !checkOut || new Date(checkIn) >= new Date(checkOut)) {
        console.warn('Please fill out all fields and ensure the check-out date is after the check-in date.');
        return;
      }

      // Update previous search values
      previousSearch = { location, checkIn, checkOut };

      // Construct URL and redirect
      window.location.href = `hotels.html?location=${encodeURIComponent(location)}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}&${childrenAgesParam}#searched_hotel`;

    } catch (error) {
      console.error('Error:', error);
    }
  });
};

// Clear the hash on page load (after refresh)
window.addEventListener('load', function () {
  if (window.location.hash) {
    window.location.hash = '';
  }
});
