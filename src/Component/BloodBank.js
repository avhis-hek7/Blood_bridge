import React, { useState } from 'react';

const BloodBank = () => {
    const [bloodBanks, setBloodBanks] = useState([]);
    const [error, setError] = useState('');

    const fetchBloodBanks = async (lat, lng) => {
      const apiKey = '2cc22390140a40cead3a2799f4fd9fce';
      try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&keyword=blood+bank&key=${apiKey}`);
          
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          setBloodBanks(data.results);
      } catch (err) {
          console.error(err);
          setError('Failed to fetch blood banks. Please check the console for more details.');
      }
  };
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                fetchBloodBanks(lat, lng);
            }, () => {
                setError('Unable to retrieve your location.');
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div>
            <h1>Find Nearest Blood Bank</h1>
            <button onClick={getLocation}>Get My Location</button>
            {error && <p>{error}</p>}
            <div id='results'>
                {bloodBanks.map((bank, index) => (
                    <div key={index}>{bank.name}</div>
                ))}
            </div>
        </div>
    );
};

export default BloodBank;