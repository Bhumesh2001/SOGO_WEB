let checkIn_;
let checkOut_;
let adults_;

// go to the searched hotels section
window.addEventListener('load', function () {
  const element = document.querySelector('#searched_hotel');

  if (element) {
    const specifiedHeight = 100;

    // Calculate the scroll position by adding the specified height to the element's position
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

    // Scroll to the position, offset by the specified height
    window.scrollTo({
      top: elementPosition - specifiedHeight, // Adjust to scroll above the element
      behavior: 'smooth'
    });
  }
});

// Function to get query parameters from the URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);

  // Extracting parameters into an object
  const location = params.get('location');
  const checkIn = params.get('checkin');
  const checkOut = params.get('checkout');
  const adults = params.get('adults');
  const children = params.get('children');

  // Collecting children ages
  const childrenAges = {};
  for (const [key, value] of params.entries()) {
    if (key.startsWith('age')) {
      childrenAges[key] = value;
    }
  }

  return { location, checkIn, checkOut, adults, children, childrenAges };
};

// log the query params data
document.addEventListener('DOMContentLoaded', async function () {
  const { location, checkIn, checkOut, adults, childrenAges } = getQueryParams();

  checkIn_ = checkIn;
  checkOut_ = checkOut;
  adults_ = adults;

  try {
    let data = await searchHotels(
      'https://sogo-backend.onrender.com/api/hotel/all',
      { location, checkIn, checkOut, adults, children: childrenAges },
    );
    generateHotelCards(data);
  } catch (error) {
    console.error(error);
  }
});

// search hotels
async function searchHotels(url, searchData) {
  try {
    const response = await axios.post(url, searchData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(response.data, '===');

    return response.data;
  } catch (error) {
    console.error('Error during hotel search:', error.message);
    return error;
  }
};

// Function to generate hotel cards dynamically
function generateHotelCards(jsonResponse) {
  const hotelCardsContainer = document.getElementById("hotel-cards");
  hotelCardsContainer.innerHTML = '';

  const removeHtmlTags = str => str.replace(/<\/?[^>]+(>|$)/g, "");

  if (jsonResponse.status !== 200) {
    hotelCardsContainer.innerHTML = `<h3 class="text-center mb-4">${jsonResponse.message}</h3>`;
  } else {
    const hotel_data = jsonResponse.Hotels.map(hotel => {
      const { HotelName = 'Unknown', Location = 'Unknown', HotelImage = '', Offers = [] } = hotel;

      let minTotalPrice = Infinity;
      let maxStar = 0;
      let bestFacilities = '';

      Offers.forEach(room => {
        minTotalPrice = Math.min(minTotalPrice, room.TotalPrice || Infinity);
        maxStar = Math.max(maxStar, parseInt(room.Category) || 0);

        const roomFacilities = (room.Special ? removeHtmlTags(room.Special).trim().split(',').map(fac => fac.trim()) : [])
          .filter(facility => facility !== "**PACKAGE RATE**");

        if (roomFacilities.length > bestFacilities.split(',').length) {
          bestFacilities = roomFacilities.join(', ');
        }
      });

      return {
        HotelCode: hotel.HotelCode,
        HotelName,
        Location,
        HotelImage,
        HotelFacilities: bestFacilities.split(',').map(fac => fac.trim()),
        TotalPrice: minTotalPrice === Infinity ? 0 : minTotalPrice,
        Star: maxStar
      };
    });

    hotelCardsContainer.innerHTML = hotel_data.map(hotel => `
      <div class="col-12 mb-4">
        <a href="#" 
          data-id="${hotel.HotelCode}" 
          data-checkIn="${checkIn_}" 
          data-checkOut="${checkOut_}" 
          data-adults="${adults_}">
          
          <div class="hotel-card p-3 mb-0">
            <div class="row">
              <div class="col-12 col-sm-4">
                <img 
                  class="img-fluid rounded" 
                  src="${hotel.HotelImage}" 
                  alt="${capitalizeWords(hotel.HotelName)}" 
                />
              </div>
              <div class="col-12 col-sm-8">
                <div class="hotel-details">
                  <h4 class="mt-lg-0 mt-md-0 mt-3 fw-bold">
                    ${capitalizeWords(hotel.HotelName)}
                  </h4>
                  <p>
                    <strong><i class="fas fa-map-marker-alt"></i></strong> 
                    ${capitalizeWords(hotel.Location)}
                  </p>
                  <p>
                    <strong>Facilities:</strong> 
                    ${hotel.HotelFacilities.slice(0, 4).join(", ")}
                  </p>
                  <div class="rating">Star: ${hotel.Star}</div>
                  <p class="price text-bold">
                    $${hotel.TotalPrice} 
                    ${hotel.oldPrice ? `<span class="old-price">₹${hotel.oldPrice}</span>` : ""}
                  </p>
                  <p>Total: $${hotel.TotalPrice} (includes taxes & fees)</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    `).join('');

  }

};

// capitalize every word
function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// redirect to detail page of particular hotel
const hotelCardsContainer = document.getElementById('hotel-cards');
hotelCardsContainer.addEventListener('click', function (event) {
  // Check if the clicked element is an anchor tag
  const clickedAnchor = event.target.closest('a');

  // If the click event happened on an anchor tag
  if (clickedAnchor) {
    // Get the attributes of the clicked anchor tag
    const hotelId = clickedAnchor.getAttribute('data-id');
    const checkIn = clickedAnchor.getAttribute('data-checkIn');
    const checkOut = clickedAnchor.getAttribute('data-checkOut');
    const adults = clickedAnchor.getAttribute('data-adults');

    // Do something with the values
    console.log(`Hotel ID: ${hotelId}`);
    console.log(`Check-In: ${checkIn}`);
    console.log(`Check-Out: ${checkOut}`);
    console.log(`Adults: ${adults}`);

    // Prevent default anchor tag behavior (e.g., navigation)
    event.preventDefault();

    window.location.href = `detail.html?hotelid=${hotelId}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}`
  }
});
