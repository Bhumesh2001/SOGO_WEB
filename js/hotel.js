// soaprequest credential
const AGENCY_ID = 148535;
const USER_NAME = "REISENBOOKINGXMLTEST";
const PASSWORD = "JHJDO58X0EV";
const BASE_URL = 'https://reisenbooking.xml.goglobal.travel/xmlwebservice.asmx';

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
            childrenAges[key] = value;  // e.g., { age1: '5', age2: '7' }
        }
    }

    return { location, checkIn, checkOut, adults, children, childrenAges };
};

// log the query params data
document.addEventListener('DOMContentLoaded', function () {
    const { location, checkIn, checkOut, adults, children, childrenAges } = getQueryParams();

    // Example: Displaying the search details
    console.log('Search Details:');
    console.log(`Location: ${location}`);
    console.log(`Check-In Date: ${checkIn}`);
    console.log(`Check-Out Date: ${checkOut}`);
    console.log(`Adults: ${adults}`);
    console.log(`Children: ${children}`);

    const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const ArrivalDate = checkIn;

    // Display children ages
    console.log('Children Ages:');
    for (const [key, age] of Object.entries(childrenAges)) {
        console.log(`${key}: ${age}`);
    }

});

// go to the searched hotels section
window.addEventListener('load', function () {
    const element = document.querySelector('#searched_hotel');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
});

// find cityid by city name
function findCityIdByCityName() {
    try {

    } catch (error) {
        console.error(error);
    }
};

// search hotels
async function searchHotels() {
    try {
        const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                 xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                 xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
        <MakeRequest xmlns="http://www.goglobal.travel/">
            <requestType>11</requestType>
            <xmlRequest><![CDATA[
                <Root>
                    <Header>
                        <Agency>${AGENCY_ID}</Agency>
                        <User>${USER_NAME}</User>
                        <Password>${PASSWORD}</Password>
                        <Operation>HOTEL_SEARCH_REQUEST</Operation>
                        <OperationType>Request</OperationType>
                    </Header>
                    <Main Version="2.3" ResponseFormat="JSON" IncludeGeo="false" Currency="USD">
                        <MaximumWaitTime>15</MaximumWaitTime>
                        <Nationality>GB</Nationality>
                        <Hotels>
                            <HotelId>13844</HotelId>
                        </Hotels>
                        <ArrivalDate>2024-11-05</ArrivalDate>
                        <Nights>3</Nights>
                        <Rooms>
                            <Room Adults="2" RoomCount="1" ChildCount="0"/>
                            <Room Adults="1" RoomCount="1" ChildCount="2">
                                <ChildAge>9</ChildAge>
                                <ChildAge>5</ChildAge>
                            </Room>
                        </Rooms>
                    </Main>
                </Root>
            ]]></xmlRequest>
        </MakeRequest>
    </soap12:Body>
</soap12:Envelope>`;

        const headers = {
            'Content-Type': 'application/soap+xml; charset=utf-8',
            'API-Operation': 'HOTEL_SEARCH_REQUEST',
            'API-AgencyID': AGENCY_ID,
        };

        // send soup request
        const response = await axios.post(BASE_URL, soapRequest, { headers });

        // Parse XML into a DOM Document
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");

        // Convert XML to JSON
        const result = xmlToJson(xmlDoc);
        console.log('SOAP request successful:', result);

        // Display JSON in the browser console
        console.log(JSON.stringify(result, null, 4));

    } catch (error) {
        console.error(error);
    }
};
searchHotels();

// show hotels on frontend
function showHotels() {
    try {

    } catch (error) {
        console.error(error);
    }
};

// Helper function to convert XML to JSON
function xmlToJson(xml) {
    let obj = {};
    if (xml.nodeType === 1) { // element
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                const attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // text
        obj = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            const nodeName = item.nodeName;
            if (typeof obj[nodeName] === "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof obj[nodeName].push === "undefined") {
                    const old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};
