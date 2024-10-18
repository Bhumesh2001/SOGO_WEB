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

// checking user
if (checkElement('#book-now')) {
  document.getElementById('book-now').addEventListener('click', () => {
    const response = isLoggedIn();
    if (!response.ok) {
      overlay.style.display = 'block';
      loginForm.classList.remove('d-none');
      loginForm.classList.add('d-block');
      document.body.style.overflow = 'hidden';
    }
  });
}

// popup login/signup form
window.onload = async function () {
  const response = isLoggedIn();

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

// search availability
let previousSearch = {
  location: null,
  checkIn: null,
  checkOut: null
};

// check element is exist or not of particular html page
function checkElement(selector) {
  const element = document.querySelector(selector);

  if (element) {
    console.log(`Element matching '${selector}' exists.`);
    return true; // Element exists
  } else {
    console.log(`Element matching '${selector}' does not exist.`);
    return false; // Element does not exist
  }
};

if (checkElement("#search-availability")) {
  document.getElementById('search-availability').addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
      const location = document.getElementById('location').value;
      const checkIn = document.getElementById('checkin_date').value;
      const checkOut = document.getElementById('checkout_date').value;

      // Check if values have changed or not
      if (location === previousSearch.location && checkIn === previousSearch.checkIn && checkOut === previousSearch.checkOut) {
        return;
      }

      // Update previous search values
      previousSearch = { location, checkIn, checkOut };

      // Validate form inputs
      if (!location || !checkIn || !checkOut) {
        console.warn('Please fill out all fields.');
        return;
      }

      // Fetch available rooms
      const response = await fetch('https://sogo-backend.onrender.com/api/room');
      const result = await response.json();

      if (response.ok) {
        console.log('Available rooms:', result);
        generateRoomCards(result);

        // Scroll to room section and reset the hash after 3 seconds
        window.location.hash = 'rooms_';
        setTimeout(() => {
          history.replaceState(null, null, ' ');
        }, 3000);
      } else {
        console.error('Error fetching availability:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
};

// Function to generate room cards dynamically
function generateRoomCards(rooms) {
  const roomContainer = document.getElementById('room-container');
  roomContainer.innerHTML = ''; // Clear previous room cards

  // Check if rooms array is empty
  if (rooms.length === 0) {
    roomContainer.innerHTML = '<p>No rooms available.</p>'; // Display a message if no rooms found
    return;
  }

  // Use DocumentFragment to improve performance when appending multiple elements
  const fragment = document.createDocumentFragment();

  rooms.forEach(room => {
    const roomCard = document.createElement('div');
    roomCard.className = 'col-md-6 col-lg-4 mb-5';
    roomCard.setAttribute('data-aos', 'fade-up');

    roomCard.innerHTML = `
      <a href="detail.html?id=${room._id}" class="room_">
        <figure class="img-wrap">
          <img src="${room.images[0]}" alt="${room.roomType} Room" class="img-fluid mb-3" />
        </figure>
        <div class="p-3 text-center room-info">
          <h2>${room.roomType} Room</h2>
          <span class="text-uppercase letter-spacing-1">${room.price}$ / per night</span>
        </div>
      </a>
    `;

    fragment.appendChild(roomCard); // Append the room card to the DocumentFragment
  });

  roomContainer.appendChild(fragment); // Append the entire fragment at once
};

// Clear the hash on page load (after refresh)
window.addEventListener('load', function () {
  if (window.location.hash) {
    window.location.hash = '';
  }
});

// Function to populate room details on the page
function showRoomDetails(data) {
  // Populate room details
  document.getElementById('room-name').textContent = data.roomName;
  document.getElementById('room-description').textContent = data.description;
  document.getElementById('room-number').textContent = data.roomNumber;
  document.getElementById('room-type').textContent = data.roomType;
  document.getElementById('room-price').textContent = data.price;
  document.getElementById('room-image').src = data.images[0];

  // Populate hotel details
  const hotel = data.hotelId;
  document.getElementById('hotel-name').textContent = hotel.name;
  document.getElementById('hotel-description').textContent = hotel.description;
  document.getElementById('hotel-address').textContent = `${hotel.address.city}, ${hotel.address.state}, ${hotel.address.country}, ${hotel.address.zipcode}`;
  document.getElementById('hotel-phone').textContent = hotel.contact.phone;
  document.getElementById('hotel-email').textContent = hotel.contact.email;
  document.getElementById('hotel-image').src = hotel.images[0]; // You can change to show the first image

  // Populate amenities
  const amenitiesList = document.getElementById('hotel-amenities');
  amenitiesList.innerHTML = ''; // Clear existing amenities
  hotel.amenities.forEach(amenity => {
    const listItem = document.createElement('li');
    listItem.textContent = amenity;
    amenitiesList.appendChild(listItem);
  });
};

// get room data from server and display it
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id');

if (roomId) {
  getRoomData(roomId);
};

// get room details
async function getRoomData(roomId) {
  try {
    const response = await fetch(`https://sogo-backend.onrender.com/api/room/${roomId}`);
    const result = await response.json();
    if (response.ok) {
      console.log('Room fetched successful:', result);
      showRoomDetails(result);
    } else {
      console.error('Room fetched failed:', result);
      alert('Error fetching the detail of room!');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please check your connection and try again.');
  }
};
