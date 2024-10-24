// get hotels details
async function getHotelDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('hotelid');
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');
    const adults = urlParams.get('adults');

    let data = { HotelCode: hotelId, checkIn, checkOut, adults };
    const apiUrl = 'https://sogo-backend.onrender.com/api/hotel';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Hotel Details:', data);
            filterHotelData(data);
        } else {
            console.error('Error fetching hotel details:', response.statusText);
        }
    } catch (error) {
        console.log(error);
        console.error('API call failed:', error);
    }
};

// call the function
getHotelDetails();

// filterHotelData
function filterHotelData(hotelData) {
    let filteredRoomData = [];

    function cleanSpecialString(specialString) {
        let cleanedString = specialString.replace(/\*\*PACKAGE RATE\*\*/gi, '');
        cleanedString = cleanedString.replace(/<br\s*\/?>/gi, ' ');
        cleanedString = cleanedString.replace(/\s\s+/g, ' ').trim();
        return cleanedString;
    }

    for (const room of hotelData.Hotels[0].Offers) {
        const filterHotelData = {
            image: ['/images/img_1.jpg'],
            category: room.Category,
            facilities: [],
            roomName: room.Rooms[0],
            cancellationDate: room.CxlDeadLine,
            price: room.TotalPrice,
            RoomBasis: room.RoomBasis
        };

        const cleanedSpecial = room.Special ? cleanSpecialString(room.Special) : '';
        cleanedSpecial.split(',').forEach(special => {
            filterHotelData.facilities.push(special.trim());
        });

        filterHotelData.facilities = [...new Set(filterHotelData.facilities)];

        const isDuplicate = filteredRoomData.some(existingRoom => existingRoom.roomName === filterHotelData.roomName);

        if (!isDuplicate) {
            filteredRoomData.push(filterHotelData);
        }
    }
    generateRoomCards(filteredRoomData);
};

// generate room cards
function generateRoomCards(hotelData) {
    const hotelCardsContainer = document.getElementById('hotelCardsContainer').querySelector('.row');

    hotelCardsContainer.innerHTML = '';

    hotelData.forEach(room => {
        const card = `
            <div class="col-4 col-lg-4 col-md-6 col-12 mb-3 px-2">
              <div class="card h-100">
                <img src="${room.image[0]}" class="card-img-top" alt="${room.category}" />
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="fas fa-hotel"></i>  ${room.roomName}
                  </h5>
                  <h5 class="card-title">
                    <i class="fas fa-star"></i> ${room.category}
                  </h5>
                  <p class="card-text mb-2">
                    <i class="fas fa-wifi"></i> ${[...new Set(room.facilities)].join(', ')}
                  </p>
                  <p class="card-text mb-2">
                    <i class="fas fa-concierge-bell"></i> ${room.RoomBasis}
                  </p>
                  <p class="card-text mb-2">
                    <i class="fas fa-calendar-times"></i> ${room.cancellationDate}<br />
                  </p>
                </div>
                <div class="card-body pt-0 d-flex justify-content-between align-items-center">
                  <p class="mb-0"><i class="fas fa-dollar-sign"></i> ${room.price} USD</p>
                  <button type="button" class="btn btn-primary float-end btn-sm">
                    Reserve
                  </button>
                </div>
              </div>
            </div>
        `;

        // Insert the card into the container
        hotelCardsContainer.insertAdjacentHTML('beforeend', card);
    });
};

// scroll the particular section 
window.addEventListener('load', () => {
    const element = document.querySelector('#single-hotel-info');
    if (element) {
        const specifiedHeight = 90;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementPosition - specifiedHeight,
            behavior: 'smooth'
        });
    }
});