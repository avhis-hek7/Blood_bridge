// import React, { useState } from 'react';

// const BloodBank = () => {
//     const [bloodBanks, setBloodBanks] = useState([]);
//     const [error, setError] = useState('');

//     const fetchBloodBanks = async (lat, lng) => {
//       const apiKey = 'AIzaSyCV-im_l-AEXmGhpSytEhqMOf2Gy6dB80g';
//       try {
//           const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&keyword=blood+bank&key=${apiKey}`);
          
//           if (!response.ok) {
//               throw new Error(`HTTP error! status: ${response.status}`);
//           }
          
//           const data = await response.json();
//           setBloodBanks(data.results);
//       } catch (err) {
//           console.error(err);
//           setError('Failed to fetch blood banks. Please check the console for more details.');
//       }
//   };
//     const getLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const lat = position.coords.latitude;
//                 const lng = position.coords.longitude;
//                 fetchBloodBanks(lat, lng);
//             }, () => {
//                 setError('Unable to retrieve your location.');
//             });
//         } else {
//             setError('Geolocation is not supported by this browser.');
//         }
//     };

//     return (
//         <div>
//             <h1>Find Nearest Blood Bank</h1>
//             <button onClick={getLocation}>Get My Location</button>
//             {error && <p>{error}</p>}
//             <div id='results'>
//                 {bloodBanks.map((bank, index) => (
//                     <div key={index}>{bank.name}</div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BloodBank;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [locationInput, setLocationInput] = useState('');
//   const [coords, setCoords] = useState(null);
//   const [places, setPlaces] = useState([]);

//   const GOOGLE_API_KEY = "AIzaSyCV-im_l-AEXmGhpSytEhqMOf2Gy6dB80g";

//   const handleSearch = async () => {
//     if (!locationInput) return;

//     try {
//       const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//         locationInput
//       )}&key=${GOOGLE_API_KEY}`;
//       const geoResponse = await axios.get(geoUrl);
//       const location = geoResponse.data.results[0]?.geometry.location;
//       if (location) {
//         setCoords(location);
//       } else {
//         alert('Location not found');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Error fetching location');
//     }
//   };

//   useEffect(() => {
//     const fetchBloodBanks = async () => {
//       if (!coords) return;
//       try {
//         const { lat, lng } = coords;
//         const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&keyword=blood%20bank&key=${GOOGLE_API_KEY}`;
//         const proxy = 'https://cors-anywhere.herokuapp.com/';
//         const response = await axios.get(proxy + placesUrl);
//         setPlaces(response.data.results || []);
//       } catch (err) {
//         console.error(err);
//         alert('Error fetching blood banks');
//       }
//     };

//     fetchBloodBanks();
//   }, [coords]);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h1>Blood Bank Locator</h1>

//       <input
//         type="text"
//         placeholder="Enter your city or address"
//         value={locationInput}
//         onChange={(e) => setLocationInput(e.target.value)}
//         style={{ padding: '10px', width: '300px' }}
//       />
//       <button onClick={handleSearch} style={{ padding: '10px 15px', marginLeft: '10px' }}>
//         Find Blood Banks
//       </button>

//       {places.length > 0 && (
//         <div style={{ marginTop: '30px' }}>
//           <h2>Nearby Blood Banks</h2>
//           <ul>
//             {places.map((place) => (
//               <li key={place.place_id}>
//                 <strong>{place.name}</strong>
//                 <br />
//                 {place.vicinity}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;



// main Code:::


import React from "react";

// Blood bank data
const bloodBanks = [
  { name: "NRCS Regional BTSC", location: "Banke, Nepalgunj", phone: "081 – 520174" },
  { name: "NRCS Regional BTSC", location: "Bharatpur, Chitwan", phone: "056 – 520880" },
  { name: "NRCS Regional BTSC", location: "Pokhara, Kaski", phone: "061 – 521091, 061 – 540191" },
  { name: "NRCS Regional BTSC", location: "Rangeli Road, Biratnagar", phone: "021 – 523326" },
  { name: "Dhulikhel Hospital", location: "Dhulikhel", phone: "011 – 490497" },
  { name: "Manipal Teaching Hospital", location: "Pokhara, Kaski", phone: "061-526416" },
  { name: "BP Koirala Memorial Cancer Hospital", location: "Bharatpur", phone: "056-524501" },
  { name: "Janaki Medical College Teaching Hospital", location: "Dhanusha, Janakpur", phone: "01-4435957" },
  { name: "Universal College of Medical Sciences", location: "Bhairahawa, Sidarthnagar", phone: "071-522896" },
  { name: "Tikapur Hospital", location: "Kailali", phone: "091-560406" },
  { name: "Padama Hospital", location: "Kailali", phone: "099-550355" },
  { name: "United Mission Hospital", location: "Palpa", phone: "075 – 520958" },
  { name: "Lamjung Community Hospital", location: "Besisahar, Lamjung", phone: "066 – 520183" },
  { name: "Bhaktapur NRCS Blood Bank", location: "Bhaktapur", phone: "01-6611661, 01-6612266" },
  { name: "Central NRCS Blood Bank", location: "Soaltee-Mode", phone: "01-4288485" },
  { name: "Lalitpur NRCS Blood Bank", location: "Pulchowk", phone: "+977 01-5427033" },
  { name: "Teaching Hospital Blood Bank", location: "Maharajgunj, Kathmandu", phone: "01-44123030, 01-4410911" },
  { name: "Bir Hospital Blood Bank", location: "New Road gate, Kathmandu", phone: "01-4221119, 01-4221988" },
  { name: "Nepal Police Hospital Blood Bank", location: "Maharajgunj, Kathmandu", phone: "01-4412430" },
  { name: "Civil Hospital Blood Bank", location: "Minbhawan, Kathmandu", phone: "01-4107000" },
  { name: "Patan Hospital Blood Bank", location: "Patan, Lalitpur", phone: "01-5522295" },
  { name: "Grande Hospital Blood Bank", location: "Dhapasi", phone: "01-5159266" },
];

// Map embed component
const GoogleMapEmbed = () => {
  const mapQuery = encodeURIComponent(`
    Bhaktapur NRCS Blood Bank, Bhaktapur |
    Central NRCS Blood Bank, Soaltee-Mode |
    Lalitpur NRCS Blood Bank, Pulchowk |
    Frontline Hospital Blood Bank, Old Baneshwor |
    Teaching Hospital, Maharajgunj |
    Gangalal Hospital, Bansbari |
    Himal Hospital, Gyaneshwor |
    Grande Hospital, Dhapasi |
    Prasuti Griha, Thapathali |
    Nepal Mediciti Hospital, Nakhkhu Ukalo |
    Bir Hospital, New road gate |
    Nepal Police Hospital, Maharajgunj |
    Civil Hospital, Minbhawan |
    Patan Hospital, Patan |
    Birendra Army Hospital |
    Nepal Medical College, Gokarneswor |
    Kathmandu Medical College, Sinamangal
  `);

  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <div className="w-full h-[500px] lg:h-[800px] my-6">
      <h2 className="text-xl font-semibold mb-4">Blood Banks</h2>
      <iframe
        title="Blood Banks Map"
        className="w-full h-full rounded-[20px]"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
      />
    </div>
  );
};

// Main component
const BloodBankDirectory = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Blood Bank Directory of Nepal</h1>

      {/* Map Embed */}
      <GoogleMapEmbed />

      {/* Guidelines Section */}
      <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-900 p-6 my-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🗺️ How to Use This Directory and Map</h2>

        <div className="mb-4">
          <h3 className="font-bold">📌 Browse the Blood Bank Table</h3>
          <ul className="list-disc list-inside pl-4 text-sm">
            <li>Scroll through the table to find a list of blood banks across Nepal.</li>
            <li>Each entry includes the <strong>name</strong>, <strong>location</strong>, and <strong>phone number</strong> of the blood bank.</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-bold">🗺️ Locate Blood Banks on the Map</h3>
          <ul className="list-disc list-inside pl-4 text-sm">
            <li>The embedded Google Map above shows major blood bank locations all over Nepal.</li>
            <li>Zoom in or drag the map to explore areas of interest.</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-bold">🧭 Get Directions to a Blood Bank</h3>
          <ul className="list-disc list-inside pl-4 text-sm">
            <li>Find the name and location of your preferred blood bank in the table.</li>
            <li>Open <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Maps</a> in a new tab.</li>
            <li>In the destination/search bar, paste the blood bank’s name and address (e.g., <em>Lalitpur NRCS Blood Bank, Pulchowk</em>).</li>
            <li>Enable your browser's location access or manually enter your current location.</li>
            <li>Click on the “Directions” button in Google Maps to view the route and travel options.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">🌐 Map Not Showing Your Area?</h3>
          <p className="pl-4 text-sm">The embedded map is focused on Kathmandu Valley. For other regions, use the table to find details and search them manually in Google Maps.</p>
        </div>
      </div>

      {/* Directory Table */}
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {bloodBanks.map((bank, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{bank.name}</td>
                <td className="border border-gray-300 px-4 py-2">{bank.location}</td>
                <td className="border border-gray-300 px-4 py-2">{bank.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodBankDirectory;






