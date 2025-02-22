import React, { useState } from "react";

const BloodBankSearch = () => {
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [bloodBankName, setBloodBankName] = useState("");
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const query = `district=${district}&city=${city}${
        bloodBankName ? `&name=${bloodBankName}` : ""
      }`;
      const apiKey = "2cc22390140a40cead3a2799f4fd9fce"; // Store API key separately
      const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&${query}`;

      const response = await fetch(apiUrl);
      // Replace with real API
      const data = await response.json();
      setBloodBanks(data);
    } catch (err) {
      setError("Failed to fetch blood banks.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Search for Blood Banks</h2>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="mb-3">
          <label className="form-label">District</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Blood Bank Name (Optional)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Blood Bank Name"
            value={bloodBankName}
            onChange={(e) => setBloodBankName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row">
        {bloodBanks.map((bank, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{bank.name}</h5>
                <p className="card-text">Address: {bank.address}</p>
                <a
                  href={`https://www.google.com/maps?q=${bank.latitude},${bank.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View on Map
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodBankSearch;
