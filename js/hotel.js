// go to the searched hotels section
window.addEventListener('load', function () {
    const element = document.querySelector('#searched_hotel');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
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
    showHotels(data);
});

// search hotels
async function searchHotels(url, searchData) {
    try {
        const response = await axios.post(url, searchData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during hotel search:', error.message);
        throw error;
    }
};

// show hotels on frontend
function showHotels(hotel_data) {
    try {
        console.log(hotel_data, 'hotel_data....!');
    } catch (error) {
        console.error(error);
    }
};

// render hotels
function renderHotels() {
    const hotelContainer = document.querySelector('.row');
    hotelContainer.innerHTML = ''; // Clear previous content

    hotels.forEach(hotel => {
        let oldPriceHTML = '';
        if (hotel.oldPrice) {
            oldPriceHTML = `<span class="old-price">₹${hotel.oldPrice}</span>`;
        }

        const hotelCard = `
        <div class="col-md-12 mb-4">
          <div class="hotel-card d-flex p-3">
            <img class="img-fluid" src="${hotel.img}" alt="${hotel.name}" />
            <div class="hotel-details">
              <h4>${hotel.name}</h4>
              <p><strong>Location:</strong> ${hotel.location}</p>
              <p><strong>Facilities:</strong> ${hotel.facilities}</p>
              <div class="rating">Rating: ⭐⭐⭐⭐⭐ ${hotel.rating}/10 (${hotel.reviews} reviews)</div>
              <p class="price">Price: ₹${hotel.price} ${oldPriceHTML}</p>
              <p>Total: ₹${hotel.total} (includes taxes & fees)</p>
            </div>
          </div>
        </div>
      `;

        hotelContainer.innerHTML += hotelCard;
    });
};