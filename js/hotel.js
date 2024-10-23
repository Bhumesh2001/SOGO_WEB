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
  const { location, checkIn, checkOut, adults, children, childrenAges } = getQueryParams();

  const nights = Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

  let agesArr = [];
  for (const [key, age] of Object.entries(childrenAges)) {
    agesArr.push(parseInt(age));
  }
  const data = await searchHotels(
    'https://sogo-backend.onrender.com/api/hotel',
    { location, checkIn, checkOut, adults, children, nights, childrenAges: agesArr },
  );
  generateHotelCards(data);

});

// search hotels
async function searchHotels(url, searchData) {
  try {
    const response = await axios.post(url, searchData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return JSON.parse(response.data);
  } catch (error) {
    console.error('Error during hotel search:', error.message);
    throw error;
  }
};

// Function to generate hotel cards dynamically
function generateHotelCards(jsonResponse) {
  const hotelCardsContainer = document.getElementById("hotel-cards");
  hotelCardsContainer.innerHTML = '';

  const removeHtmlTags = str => str.replace(/<\/?[^>]+(>|$)/g, "");

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
      <div class="hotel-card p-3 mb-0">
        <div class="row">
          <div class="col-12 col-sm-4">
            <img class="img-fluid rounded" src="${hotel.HotelImage}" alt="${capitalizeWords(hotel.HotelName)}" />
          </div>
          <div class="col-12 col-sm-8">
            <div class="hotel-details">
              <h4 class="mt-lg-0 mt-md-0 mt-3 fw-bold">${capitalizeWords(hotel.HotelName)}</h4>
              <p><strong><i class="fas fa-map-marker-alt"></i></strong> ${capitalizeWords(hotel.Location)}</p>
              <p><strong>Facilities:</strong> ${hotel.HotelFacilities.slice(0, 4).join(", ")}</p>
              <div class="rating">Star: ${hotel.Star}</div>
              <p class="price text-bold">$${hotel.TotalPrice} 
                ${hotel.oldPrice ? `<span class="old-price">₹${hotel.oldPrice}</span>` : ""}
              </p>
              <p>Total: ₹${hotel.TotalPrice} (includes taxes & fees)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
};

// capitalize every word
function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};