import React, { useState } from 'react';
import styles from './BloodBankLocator.module.css';

const bloodBanksData = {
  Bhojpur: [
    { name: 'Bhojpur District Hospital Blood Bank', address: 'Bhojpur Municipality' },
  ],
  Dhanusa: [
    { name: 'Dhanusa District Hospital Blood Bank', address: 'Janakpur Sub-Metropolitan City' },
  ],
  Dhading: [
    { name: 'Dhading District Hospital Blood Bank', address: 'Dhading Besi Municipality' },
  ],
  Dolakha: [
    { name: 'Dolakha District Hospital Blood Bank', address: 'Charikot Municipality' },
  ],
  Gorkha: [
    { name: 'Gorkha District Hospital Blood Bank', address: 'Gorkha Municipality' },
  ],
  Jhapa: [
    { name: 'Jhapa District Hospital Blood Bank', address: 'Birtamode Municipality' },
  ],
  Kanchanpur: [
    { name: 'Kanchanpur District Hospital Blood Bank', address: 'Mahendranagar Municipality' },
  ],
  Kavrepalanchok: [
    { name: 'Kavrepalanchok District Hospital Blood Bank', address: 'Dhulikhel Municipality' },
  ],
  Kailali: [
    { name: 'Kailali District Hospital Blood Bank', address: 'Dhangadhi Sub-Metropolitan City' },
  ],
  Kathmandu: [
    { name: 'Shree Harsha Hospital Blood Bank', address: 'Kathmandu Metropolitan City' },
    { name: 'Swasthya Hospital Blood Bank', address: 'Kathmandu Metropolitan City' },
    { name: 'Shree Harsha Hospital Blood Bank', address: 'Maharajgunj' },
    { name: 'Swasthya Hospital Blood Bank', address: 'Putalisadak' },
  ],
  Lalitpur: [
    { name: 'Lalitpur District Hospital Blood Bank', address: 'Lalitpur Metropolitan City' },
  ],
  Makwanpur: [
    { name: 'Makwanpur District Hospital Blood Bank', address: 'Hetauda Sub-Metropolitan City' },
  ],
  Morang: [
    { name: 'Morang District Hospital Blood Bank', address: 'Biratnagar Metropolitan City' },
  ],
  Nuwakot: [
    { name: 'Nuwakot District Hospital Blood Bank', address: 'Bidur Municipality' },
  ],
  Parsa: [
    { name: 'Parsa District Hospital Blood Bank', address: 'Birgunj Metropolitan City' },
  ],
  Rupandehi: [
    { name: 'Rupandehi District Hospital Blood Bank', address: 'Butwal Sub-Metropolitan City' },
  ],
  Saptari: [
    { name: 'Saptari District Hospital Blood Bank', address: 'Rajbiraj Municipality' },
  ],
  Sindhupalchok: [
    { name: 'Sindhupalchok District Hospital Blood Bank', address: 'Chautara Municipality' },
  ],
  Surkhet: [
    { name: 'Surkhet District Hospital Blood Bank', address: 'Birendranagar Municipality' },
  ],
  Tanahu: [
    { name: 'Tanahu District Hospital Blood Bank', address: 'Damauli Municipality' },
  ],
  Udayapur: [
    { name: 'Udayapur District Hospital Blood Bank', address: 'Gaighat Municipality' },
  ],
  Sindhuli: [
    { name: 'Sindhuli District Hospital Blood Bank', address: 'Sindhuli Bazaar Municipality' },
  ],
  Rautahat: [
    { name: 'Rautahat District Hospital Blood Bank', address: 'Gaur Municipality' },
  ],
  Bara: [
    { name: 'Bara District Hospital Blood Bank', address: 'Kalaiya Municipality' },
  ],
  Chitwan: [
    { name: 'Chitwan District Hospital Blood Bank', address: 'Bharatpur Metropolitan City' },
  ],
  Baglung: [
    { name: 'Baglung District Hospital Blood Bank', address: 'Baglung Municipality' },
  ],
  Baitadi: [
    { name: 'Baitadi District Hospital Blood Bank', address: 'Baitadi Municipality' },
  ],
  Banke: [
    { name: 'Banke District Hospital Blood Bank', address: 'Nepalgunj Sub-Metropolitan City' },
  ],
  Bardiya: [
    { name: 'Bardiya District Hospital Blood Bank', address: 'Gulariya Municipality' },
  ],
  Bhaktapur: [
    { name: 'Bhaktapur District Hospital Blood Bank', address: 'Bhaktapur Municipality' },
  ],
  Chitwan: [
    { name: 'Chitwan District Hospital Blood Bank', address: 'Bharatpur Metropolitan City' },
  ],
  Dhankuta: [
    { name: 'Dhankuta District Hospital Blood Bank', address: 'Dhankuta Municipality' },
  ],
  Ilam: [
    { name: 'Ilam District Hospital Blood Bank', address: 'Ilam Municipality' },
  ],
  Jajarkot: [
    { name: 'Jajarkot District Hospital Blood Bank', address: 'Jajarkot Municipality' },
  ],
  Kaski: [
    { name: 'Kaski District Hospital Blood Bank', address: 'Pokhara Lekhnath Metropolitan City' },
  ],
  Kavrepalanchok: [
    { name: 'Kavrepalanchok District Hospital Blood Bank', address: 'Dhulikhel Municipality' },
  ],
  Lamjung: [
    { name: 'Lamjung District Hospital Blood Bank', address: 'Besisahar Municipality' },
  ],
};

function BloodBankLocator() {
  const [district, setDistrict] = useState('');
  const [results, setResults] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);

  const handleSearch = () => {
    const matchedDistrict = Object.keys(bloodBanksData).find(
      key => key.toLowerCase() === district.trim().toLowerCase()
    );
    setResults(bloodBanksData[matchedDistrict] || []);
    setSelectedBank(null);
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  const mapAddress = selectedBank 
    ? `${selectedBank.name}, ${selectedBank.address}` 
    : "9 Goldberry, Brampton, Ontario, Canada, l6x4p5";

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nepal Blood Bank Finder</h1>

      <div className={styles.grid}>
        {/* Search Panel */}
        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <h2 className={styles.sectionTitle}>Search Blood Banks</h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Enter district name"
                className={styles.input}
              />
              <button onClick={handleSearch} className={styles.searchButton}>
                Search
              </button>
            </div>
          </div>

          {/* Results */}
          <div className={styles.results}>
            {results.length === 0 ? (
              <div className={styles.alert}>
                {district
                  ? `No blood banks found for "${district}". Please check the spelling or try another district.`
                  : "Please enter a district name to search for blood banks."}
              </div>
            ) : (
              <div className={styles.bankList}>
                {results.map((bank, index) => (
                  <div
                    key={index}
                    className={`${styles.bankCard} ${selectedBank?.name === bank.name ? styles.selectedCard : ''}`}
                    onClick={() => handleBankSelect(bank)}
                  >
                    <p className={styles.bankName}>{bank.name}</p>
                    <p className={styles.bankAddress}>Address: {bank.address}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Panel */}
        <div className={styles.mapSection}>
          <h2 className={styles.sectionTitle}>
            {selectedBank ? `${selectedBank.name} Location` : "Blood Bank Locations"}
          </h2>
          <div className={styles.mapBox}>
            <iframe
              className={styles.mapFrame}
              src={mapSrc}
              title="Blood Bank Location Map"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {selectedBank && (
              <div className={styles.infoBox}>
                <h3>{selectedBank.name}</h3>
                <p>{selectedBank.address}</p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedBank.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsLink}
                >
                  Get Directions →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instruction Panel */}
      <div className={styles.instructions}>
        <h2>How to Use This Blood Bank Finder</h2>
        <div className={styles.instructionGrid}>
          <div>
            <h3>🔍 Search Functionality</h3>
            <ul>
              <li>Enter a district name to find blood banks in that area</li>
              <li>Click on any blood bank to see its location on the map</li>
            </ul>
          </div>
          <div>
            <h3>🗺️ Using the Map</h3>
            <ul>
              <li>The map shows the location of the selected blood bank</li>
              <li>Click "Get Directions" to open Google Maps for navigation</li>
              <li>Zoom in or drag to explore the area around the blood bank</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BloodBankLocator;
