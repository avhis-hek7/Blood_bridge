import { useState } from "react";

export default function BloodDonationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="d-flex flex-column min-vh-100 mt-4">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            {/* Left Section with Logo */}
            <div className="col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center mb-4 mb-lg-0">
              <img
                src="logo1.jpg"
                alt="Blood-Bridge"
                className="mb-4 img-fluid"
                style={{ maxWidth: "300px" }}
              />
            </div>

            {/* Right Section with Form */}
            <div className="col-lg-6 col-md-12">
              <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-white mb-2">
      <h2>Please Send Us Your Detail</h2>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="form-control mb-3"
                  required
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="form-control mb-3"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="form-control mb-3"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="form-control mb-3"
                  required
                />

                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  className="form-control mb-3"
                  required
                />

                <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="form-control mb-3"
                  required
                />

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="form-check-input"
                    id="terms"
                    required
                  />
                  <label htmlFor="terms" className="form-check-label">
                    I agree to <em>Blood-Bridge</em> terms and conditions
                  </label>
                </div>

                <button type="submit" className="btn btn-danger w-100 mb-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        </div>
        </div>
  );
}
