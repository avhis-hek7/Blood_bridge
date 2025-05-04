import React, { useState } from 'react';

const bloodBanksData = {
  Bhojpur: [
    { name: 'Bhojpur District Hospital Blood Bank', address: 'Bhojpur Municipality' },
  ],
  Dhankuta: [
    { name: 'Dhankuta District Hospital Blood Bank', address: 'Dhankuta Municipality' },
  ],
  Ilam: [
    { name: 'Ilam District Hospital Blood Bank', address: 'Ilam Municipality' },
  ],
  Jhapa: [
    { name: 'Mechi Zonal Hospital Blood Bank', address: 'Bhadrapur, Jhapa' },
    { name: 'Koshi Zonal Hospital Blood Bank', address: 'Biratnagar' },
  ],
  Khotang: [
    { name: 'Khotang District Hospital Blood Bank', address: 'Diktel' },
  ],
  Morang: [
    { name: 'Koshi Zonal Hospital Blood Bank', address: 'Biratnagar' },
    { name: 'Nobel Medical College Blood Bank', address: 'Biratnagar' },
  ],
  Okhaldhunga: [
    { name: 'Okhaldhunga District Hospital Blood Bank', address: 'Okhaldhunga Municipality' },
  ],
  Panchthar: [
    { name: 'Panchthar District Hospital Blood Bank', address: 'Phidim' },
  ],
  Sankhuwasabha: [
    { name: 'Sankhuwasabha District Hospital Blood Bank', address: 'Khandbari' },
  ],
  Solukhumbu: [
    { name: 'Solukhumbu District Hospital Blood Bank', address: 'Salleri' },
  ],
  Sunsari: [
    { name: 'BP Koirala Institute of Health Sciences (BPKIHS) Blood Bank', address: 'Dharan' },
    { name: 'Sunsari District Hospital Blood Bank', address: 'Inaruwa' },
  ],
  Taplejung: [
    { name: 'Taplejung District Hospital Blood Bank', address: 'Taplejung Municipality' },
  ],
  Terhathum: [
    { name: 'Terhathum District Hospital Blood Bank', address: 'Myanglung' },
  ],
  Udayapur: [
    { name: 'Udayapur District Hospital Blood Bank', address: 'Gaighat' },
  ],
  Bara: [
    { name: 'Bara District Hospital Blood Bank', address: 'Kalaiya' },
  ],
  Dhanusha: [
    { name: 'Janakpur Provincial Hospital Blood Bank', address: 'Janakpur' },
  ],
  Mahottari: [
    { name: 'Mahottari District Hospital Blood Bank', address: 'Jaleshwar' },
  ],
  Parsa: [
    { name: 'Narayani Hospital Blood Bank', address: 'Birgunj' },
  ],
  Rautahat: [
    { name: 'Rautahat District Hospital Blood Bank', address: 'Gaur' },
  ],
  Saptari: [
    { name: 'Saptari District Hospital Blood Bank', address: 'Rajbiraj' },
  ],
  Sarlahi: [
    { name: 'Sarlahi District Hospital Blood Bank', address: 'Malangwa' },
  ],
  Siraha: [
    { name: 'Siraha District Hospital Blood Bank', address: 'Siraha' },
  ],
  Bhaktapur: [
    { name: 'Bhaktapur Hospital Blood Bank', address: 'Bhaktapur' },
  ],
  Chitwan: [
    { name: 'Bharatpur Hospital Blood Bank', address: 'Bharatpur' },
    { name: 'Chitwan Medical College Blood Bank', address: 'Bharatpur' },
  ],
  Dhading: [
    { name: 'Dhading District Hospital Blood Bank', address: 'Dhading Besi' },
  ],
  Dolakha: [
    { name: 'Dolakha District Hospital Blood Bank', address: 'Charikot' },
  ],
  Kathmandu: [
    { name: 'Central Blood Transfusion Service (Red Cross)', address: 'Teku, Kathmandu' },
    { name: 'Tribhuvan University Teaching Hospital (TUTH) Blood Bank', address: 'Maharajgunj' },
    { name: 'Patan Hospital Blood Bank', address: 'Lagankhel' },
  ],
  Kavrepalanchok: [
    { name: 'Dhulikhel Hospital Blood Bank', address: 'Dhulikhel' },
  ],
  Lalitpur: [
    { name: 'Patan Hospital Blood Bank', address: 'Lagankhel' },
  ],
  Makwanpur: [
    { name: 'Hetauda Hospital Blood Bank', address: 'Hetauda' },
  ],
  Nuwakot: [
    { name: 'Nuwakot District Hospital Blood Bank', address: 'Bidur' },
  ],
  Ramechhap: [
    { name: 'Ramechhap District Hospital Blood Bank', address: 'Manthali' },
  ],
  Rasuwa: [
    { name: 'Rasuwa District Hospital Blood Bank', address: 'Dhunche' },
  ],
  Sindhuli: [
    { name: 'Sindhuli District Hospital Blood Bank', address: 'Sindhuli Madhi' },
  ],
  Sindhupalchok: [
    { name: 'Sindhupalchok District Hospital Blood Bank', address: 'Chautara' },
  ],
  Baglung: [
    { name: 'Baglung District Hospital Blood Bank', address: 'Baglung' },
  ],
  Gorkha: [
    { name: 'Gorkha District Hospital Blood Bank', address: 'Gorkha' },
  ],
  Kaski: [
    { name: 'Western Regional Hospital Blood Bank', address: 'Pokhara' },
    { name: 'Manipal Teaching Hospital Blood Bank', address: 'Pokhara' },
  ],
  Lamjung: [
    { name: 'Lamjung District Hospital Blood Bank', address: 'Besisahar' },
  ],
  Manang: [
    { name: 'Manang District Hospital Blood Bank', address: 'Chame' },
  ],
  Mustang: [
    { name: 'Mustang District Hospital Blood Bank', address: 'Jomsom' },
  ],
  Myagdi: [
    { name: 'Myagdi District Hospital Blood Bank', address: 'Beni' },
  ],
  Nawalpur: [
    { name: 'Nawalpur District Hospital Blood Bank', address: 'Kawasoti' },
  ],
  Parbat: [
    { name: 'Parbat District Hospital Blood Bank', address: 'Kusma' },
  ],
  Syangja: [
    { name: 'Syangja District Hospital Blood Bank', address: 'Putalibazar' },
  ],
  Tanahun: [
    { name: 'Tanahun District Hospital Blood Bank', address: 'Damauli' },
  ],
  Arghakhanchi: [
    { name: 'Arghakhanchi District Hospital Blood Bank', address: 'Sandhikharka' },
  ],
  Banke: [
    { name: 'Bheri Hospital Blood Bank', address: 'Nepalgunj' },
  ],
  Bardiya: [
    { name: 'Bardiya District Hospital Blood Bank', address: 'Gulariya' },
  ],
  Dang: [
    { name: 'Rapti Provincial Hospital Blood Bank', address: 'Tulsipur' },
  ],
  Gulmi: [
    { name: 'Gulmi District Hospital Blood Bank', address: 'Tamghas' },
  ],
  Kapilvastu: [
    { name: 'Kapilvastu District Hospital Blood Bank', address: 'Taulihawa' },
  ],
  Palpa: [
    { name: 'Palpa District Hospital Blood Bank', address: 'Tansen' },
  ],
  Pyuthan: [
    { name: 'Pyuthan District Hospital Blood Bank', address: 'Pyuthan' },
  ],
  Rolpa: [
    { name: 'Rolpa District Hospital Blood Bank', address: 'Liwang' },
  ],
  Rukum: [
    { name: 'Rukum District Hospital Blood Bank', address: 'Rukumkot' },
  ],
  Rupandehi: [
    { name: 'Lumbini Provincial Hospital Blood Bank', address: 'Butwal' },
    { name: 'Bhim Hospital Blood Bank', address: 'Bhairahawa' },
  ],
  Dailekh: [
    { name: 'Dailekh District Hospital Blood Bank', address: 'Dailekh' },
  ],
  Dolpa: [
    { name: 'Dolpa District Hospital Blood Bank', address: 'Dunai' },
  ],
  Humla: [
    { name: 'Humla District Hospital Blood Bank', address: 'Simikot' },
  ],
  Jajarkot: [
    { name: 'Jajarkot District Hospital Blood Bank', address: 'Khalanga' },
  ],
  Jumla: [
    { name: 'Karnali Academy of Health Sciences Blood Bank', address: 'Jumla' },
  ],
  Kalikot: [
    { name: 'Kalikot District Hospital Blood Bank', address: 'Manma' },
  ],
  Mugu: [
    { name: 'Mugu District Hospital Blood Bank', address: 'Gamgadhi' },
  ],
  RukumWest: [
    { name: 'Rukum West District Hospital Blood Bank', address: 'Musikot' },
  ],
  Salyan: [
    { name: 'Salyan District Hospital Blood Bank', address: 'Salyan' },
  ],
  Surkhet: [
    { name: 'Surkhet District Hospital Blood Bank', address: 'Birendranagar' },
  ],
  Achham: [
    { name: 'Achham District Hospital Blood Bank', address: 'Mangalsen' },
  ],
  Baitadi: [
    { name: 'Baitadi District Hospital Blood Bank', address: 'Dasharathchand' },
  ],
  Bajhang: [
    { name: 'Bajhang District Hospital Blood Bank', address: 'Chainpur' },
  ],
  Bajura: [
    { name: 'Bajura District Hospital Blood Bank', address: 'Martadi' },
  ],
  Dadeldhura: [
    { name: 'Dadeldhura District Hospital Blood Bank', address: 'Dadeldhura' },
  ],
  Darchula: [
    { name: 'Darchula District Hospital Blood Bank', address: 'Darchula' },
  ],
  Doti: [
    { name: 'Doti District Hospital Blood Bank', address: 'Dipayal' },
  ],
  Kailali: [
    { name: 'Seti Provincial Hospital Blood Bank', address: 'Dhangadhi' },
  ],
  Kanchanpur: [
    { name: 'Mahakali Hospital Blood Bank', address: 'Mahendranagar' },
  ],
};

function BloodBankSearch() {
  const [district, setDistrict] = useState('');
  const [results, setResults] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);

  const handleSearch = () => {
    const matchedDistrict = Object.keys(bloodBanksData).find(
      key => key.toLowerCase() === district.trim().toLowerCase()
    );
    setResults(bloodBanksData[matchedDistrict] || []);
    setSelectedBank(null); // Reset selected bank when new search is performed
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  // Prepare map source based on selected bank or default address
  const mapAddress = selectedBank 
    ? `${selectedBank.name}, ${selectedBank.address}`
    : "9 Goldberry, Brampton, Ontario, Canada, l6x4p5";
  const encodedAddress = encodeURIComponent(mapAddress);
  const mapSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Nepal Blood Bank Finder</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Search Section */}
        <div>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Search Blood Banks</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Enter district name"
                className="border p-2 flex-grow rounded"
              />
              <button 
                onClick={handleSearch} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-4">
            {results.length === 0 ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4">
                {district ? 
                  `No blood banks found for "${district}". Please check the spelling or try another district.` : 
                  "Please enter a district name to search for blood banks."}
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {results.map((bank, index) => (
                  <div 
                    key={index} 
                    className={`border p-4 rounded shadow cursor-pointer hover:bg-blue-50 ${selectedBank?.name === bank.name ? 'bg-blue-100 border-blue-400' : ''}`}
                    onClick={() => handleBankSelect(bank)}
                  >
                    <p className="font-semibold">{bank.name}</p>
                    <p className="text-sm text-gray-600">Address: {bank.address}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedBank ? `${selectedBank.name} Location` : "Blood Bank Locations"}
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <iframe
              className="w-full h-[400px] rounded-[20px]"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapSrc}
              title="Blood Bank Location Map"
            />
            {selectedBank && (
              <div className="mt-4 p-3 bg-white rounded">
                <h3 className="font-semibold">{selectedBank.name}</h3>
                <p className="text-sm">{selectedBank.address}</p>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedBank.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 text-blue-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How to Use This Blood Bank Finder</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold">🔍 Search Functionality</h3>
            <ul className="list-disc list-inside pl-4 text-sm">
              <li>Enter a district name to find blood banks in that area</li>
              <li>Click on any blood bank to see its location on the map</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">🗺️ Using the Map</h3>
            <ul className="list-disc list-inside pl-4 text-sm">
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

export default BloodBankSearch;