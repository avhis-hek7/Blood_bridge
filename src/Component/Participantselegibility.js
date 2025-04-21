import React, { useState } from 'react';

const Participantselegibility = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    isHealthy: false,
    hasDisease: false,
    lastDonationDate: ''
  });

  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateDaysSinceDonation = (lastDate) => {
    const lastDonation = new Date(lastDate);
    const today = new Date();
    const diffTime = Math.abs(today - lastDonation);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { age, weight, isHealthy, hasDisease, lastDonationDate } = formData;

    if (
      Number(age) > 17 &&
      Number(weight) > 50 &&
      isHealthy &&
      !hasDisease &&
      calculateDaysSinceDonation(lastDonationDate) > 53
    ) {
      setResult('✅ You are eligible to donate blood!');
    } else {
      setResult('❌ You are NOT eligible to donate blood.');
    }
  };

  return (
    <div className="bdc-container">
      <h2 className="bdc-title">Blood Donation Eligibility Checker</h2>
      <form onSubmit={handleSubmit} className="bdc-form">
        <div className="bdc-field">
          <label className="bdc-label">Age:</label>
          <input className="bdc-input" type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="bdc-field">
          <label className="bdc-label">Weight (kg):</label>
          <input className="bdc-input" type="number" name="weight" value={formData.weight} onChange={handleChange} required />
        </div>
        <div className="bdc-field">
        <label className="bdc-label">Current health status:</label>
          <label className="bdc-checkbox-label">
            <input className="bdc-checkbox" type="checkbox" name="isHealthy" checked={formData.isHealthy} onChange={handleChange} />
            Medically Fit
          </label>
        </div>
        <div className="bdc-field">
          <label className="bdc-checkbox-label">
            <input className="bdc-checkbox" type="checkbox" name="hasDisease" checked={formData.hasDisease} onChange={handleChange} />
            Under Treatment
          </label>
        </div>
        <div className="bdc-field">
          <label className="bdc-label">Last Donation Date:</label>
          <input className="bdc-input" type="date" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} required />
        </div>
        <button className="bdc-button" type="submit">Check Eligibility</button>
      </form>
      {result && <p className="bdc-result">{result}</p>}
    </div>
  );
};

export default Participantselegibility;
