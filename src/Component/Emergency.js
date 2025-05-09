import React, { useState } from 'react';
import axios from 'axios';
import styles from './Emergency.module.css'; // Import the CSS module

const UserEmergencyRequestForm = () => {
  const [formData, setFormData] = useState({
    bloodType: '',
    unitsRequired: '',
    reason: '',
    contactNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    try {
      // Step 1: Check availability
      const availabilityRes = await axios.post(
        'http://localhost:5000/api/emergency/check-availability',
        {
          bloodType: formData.bloodType,
          unitsRequired: formData.unitsRequired
        },
        {
          headers: { 'auth-token': token }
        }
      );

      const hospitals = availabilityRes.data.hospitals;

      const confirmProceed = window.confirm(
        `Blood is available at:\n\n${hospitals
          .map(
            (h) =>
              `- ${h.hospitalName} (${h.hospitalLocation}) - ${h.quantity} units`
          )
          .join('\n')}\n\nDo you want to proceed with the request?`
      );

      if (!confirmProceed) return;

      // Step 2: Submit emergency request
      await axios.post('http://localhost:5000/api/emergency', formData, {
        headers: { 'auth-token': token }
      });

      alert('Request submitted successfully');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg);
      } else {
        alert('Submission failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <h2 className="text-center mb-4 fw-bold text-danger">Emergency Blood Request</h2>
      <input type="text" name="bloodType" placeholder="Blood Type" className="form-control mb-3" onChange={handleChange} required />
      <input type="number" name="unitsRequired" placeholder="Units Required" className="form-control mb-3" onChange={handleChange} required />
      <input type="text" name="reason" placeholder="Reason (optional)" className="form-control mb-3" onChange={handleChange} />
      <input type="text" name="contactNumber" placeholder="Contact Number" className="form-control mb-3" onChange={handleChange} required />
      <button type="submit" className="btn btn-danger w-100">Submit Request</button>
    </form>
  );
};

export default UserEmergencyRequestForm;
