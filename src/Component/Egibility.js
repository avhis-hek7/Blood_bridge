import { useState } from "react";


const Button = ({ children, ...props }) => (
  <button className="btn btn-primary w-100" {...props}>{children}</button>
);

export default function BloodDonationForm() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    lastDonation: "",
    medicalConditions: false,
    medications: false,
  });

  const [eligibility, setEligibility] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const checkEligibility = (e) => {
    e.preventDefault();
    const { age, weight, lastDonation, medicalConditions, medications } = formData;

    if (age < 18 || age > 65) {
      alert("Ineligible: Age must be between 18 and 65.")
      setEligibility("Ineligible: Age must be between 18 and 65.");
      return;
    }

    if (weight < 50) {
      setEligibility("Ineligible: Weight must be at least 50kg.");
      return;
    }

    const lastDonationDays = Math.floor((new Date() - new Date(lastDonation)) / (1000 * 60 * 60 * 24));
    if (isNaN(lastDonationDays) || lastDonationDays < 56) {
      setEligibility("Ineligible: Last blood donation must be at least 56 days ago.");
      return;
    }

    if (medicalConditions || medications) {
      setEligibility("Ineligible: Must not have chronic medical conditions or be on medication.");
      return;
    }

    setEligibility("Eligible: You can donate blood!");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Blood Donation Eligibility Form</h2>
          <form onSubmit={checkEligibility} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="age" className="form-label">Age:</label>
              <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required className="form-control" />
            </div>

            <div className="col-md-6">
              <label htmlFor="weight" className="form-label">Weight (kg):</label>
              <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} required className="form-control" />
            </div>

            <div className="col-md-6">
              <label htmlFor="lastDonation" className="form-label">Date of Last Donation:</label>
              <input type="date" id="lastDonation" name="lastDonation" value={formData.lastDonation} onChange={handleChange} required className="form-control" />
            </div>

            <div className="col-12">
              <div className="form-check">
                <input type="checkbox" id="medicalConditions" name="medicalConditions" checked={formData.medicalConditions} onChange={handleChange} className="form-check-input" />
                <label htmlFor="medicalConditions" className="form-check-label">Do you have any chronic medical conditions?</label>
              </div>

              <div className="form-check mt-2">
                <input type="checkbox" id="medications" name="medications" checked={formData.medications} onChange={handleChange} className="form-check-input" />
                <label htmlFor="medications" className="form-check-label">Are you currently on any medications?</label>
              </div>
            </div>

            <div className="col-12">
              <Button type="submit">Check Eligibility</Button>
            </div>
          </form>

          {eligibility && <p className="mt-4 text-center fw-bold">{eligibility}</p>}
        </div>
      </div>
    </div>
  );
}