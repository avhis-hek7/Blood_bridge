
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { auth, provider } from '../firebase';
// import { signInWithPopup } from 'firebase/auth';

// export default function BloodDonationForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     dob: "",
//     gender: "",
//     bloodGroup: "",
//     address: "",
//     terms: false,
//   });

//   const [emailStatus, setEmailStatus] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (name === "email" && value) {
//       verifyEmail(value);
//     }
//   };

//   const verifyEmail = async (email) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/verify-email", { email });
//       setEmailStatus(response.data);
//     } catch (error) {
//       setEmailStatus({
//         exists: false,
//         message: "Error verifying email"
//       });
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       setFormData((prevData) => ({
//         ...prevData,
//         email: user.email || "",
//       }));

//       verifyEmail(user.email);
//     } catch (error) {
//       console.error("Google Sign-In Error:", error);
//       alert("Failed to authenticate with Google. Please try again.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth", formData);
//       alert(response.data.message);
//       navigate("/");
//     } catch (error) {
//       console.error("Submission Error:", error);
//       alert(error.response?.data?.message || "An error occurred");
//     }
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100 mt-4">
//       <div className="flex-grow-1 d-flex align-items-center justify-content-center">
//         <div className="container">
//           <div className="row">
//             {/* Left Section with Logo */}
//             <div className="col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center mb-4 mb-lg-0">
//               <img src="logo1.jpg" alt="Logo" className="img-fluid" />
//             </div>

//             {/* Right Section with Form */}
//             <div className="col-lg-6 col-md-12">
//               <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-white mb-2">
//                 <h2>Please Send Us Your Details</h2>

//                 <button
//                   type="button"
//                   className="btn btn-outline-danger w-100 mb-3"
//                   onClick={handleGoogleSignIn}
//                 >
//                   Sign in with Google
//                 </button>

//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="form-control mb-3"
//                   required
//                 />

//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="form-control mb-3"
//                   required
//                 />

//                 <div>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`form-control mb-1 ${emailStatus && (emailStatus.exists ? 'is-valid' : 'is-invalid')}`}
//                     required
//                   />
//                   {emailStatus && (
//                     <div className={`small ${emailStatus.exists ? 'text-success' : 'text-danger'}`}>
//                       {emailStatus.message}
//                     </div>
//                   )}
//                 </div>

//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Create Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="form-control mb-3"
//                   required
//                 />

//                 <input
//                   type="date"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   className="form-control mb-3"
//                   required
//                 />

//                 <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="form-select"
//                     required
//                   >
//                     <option value="">Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>

//                   <select
//                     name="bloodGroup"
//                     value={formData.bloodGroup}
//                     onChange={handleChange}
//                     className="form-select"
//                     required
//                   >
//                     <option value="">Blood Group</option>
//                     <option value="A+">A+</option>
//                     <option value="A-">A-</option>
//                     <option value="B+">B+</option>
//                     <option value="B-">B-</option>
//                     <option value="O+">O+</option>
//                     <option value="O-">O-</option>
//                     <option value="AB+">AB+</option>
//                     <option value="AB-">AB-</option>
//                   </select>
//                 </div>

//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Address"
//                   className="form-control mb-3"
//                   required
//                 />

//                 <div className="form-check mb-3">
//                   <input
//                     type="checkbox"
//                     name="terms"
//                     checked={formData.terms}
//                     onChange={handleChange}
//                     className="form-check-input"
//                     id="terms"
//                     required
//                   />
//                   <label htmlFor="terms" className="form-check-label">
//                     I agree to <em>Blood-Bridge</em> terms and conditions
//                   </label>
//                 </div>

//                 <button 
//                   type="submit" 
//                   className="btn btn-danger w-100 mb-2"
//                   disabled={emailStatus && !emailStatus.exists}
//                 >
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

export default function BloodDonationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    terms: false,
  });

  const [emailStatus, setEmailStatus] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "email" && value) {
      verifyEmail(value);
    }
  };

  const verifyEmail = async (email) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-email", { email });
      setEmailStatus(response.data);
    } catch (error) {
      setEmailStatus({
        exists: false,
        message: "Error verifying email"
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setFormData((prevData) => ({
        ...prevData,
        email: user.email || "",
      }));

      verifyEmail(user.email);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Failed to authenticate with Google. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth", formData);
      setUserId(response.data.userId);
      setShowOtpModal(true);
    } catch (error) {
      console.error("Submission Error:", error);
      alert(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/finalize-verification", {
        userId,
        otp
      });
      alert("Registration successful! You can now login.");
      navigate("/");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert(error.response?.data?.error || "Invalid OTP. Please try again.");
      setOtp("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 mt-4">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center mb-4 mb-lg-0">
              <img src="logo1.jpg" alt="Logo" className="img-fluid" />
            </div>

            <div className="col-lg-6 col-md-12">
              <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-white mb-2">
                <h2>Please Send Us Your Details</h2>

                <button
                  type="button"
                  className="btn btn-outline-danger w-100 mb-3"
                  onClick={handleGoogleSignIn}
                >
                  Sign in with Google
                </button>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control mb-3"
                  required
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control mb-3"
                  required
                />

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control mb-1 ${emailStatus && (emailStatus.exists ? 'is-valid' : 'is-invalid')}`}
                    required
                  />
                  {emailStatus && (
                    <div className={`small ${emailStatus.exists ? 'text-success' : 'text-danger'}`}>
                      {emailStatus.message}
                    </div>
                  )}
                </div>

                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control mb-3"
                  required
                />

                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
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
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
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

                <button 
                  type="submit" 
                  className="btn btn-danger w-100 mb-2"
                  disabled={(emailStatus && !emailStatus.exists) || isLoading}
                >
                  {isLoading ? "Processing..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px'
          }}>
            <h4>Verify Your Email</h4>
            <p>We've sent a 6-digit OTP to {formData.email}</p>
            
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength="6"
              className="form-control mb-3"
            />
            
            <div className="d-flex justify-content-between">
              <button 
                onClick={() => setShowOtpModal(false)}
                className="btn btn-outline-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleOtpVerification}
                className="btn btn-danger"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}