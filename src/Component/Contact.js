import React, { useState, useEffect } from "react";
import { FaAddressBook, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "danger"

  // Auto-dismiss alert after 5 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 5000);
      return () => clearTimeout(timer); // Clean up
    }
  }, [alertMessage]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setAlertMessage("Please fix the errors in the form.");
      setAlertType("danger");
      return;
    }

    setLoading(true);
    setAlertMessage(""); // Clear old alerts

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAlertMessage("Your message has been sent successfully. We will contact you shortly.");
      setAlertType("success");

      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (err) {
      let errorMessage = "Failed to send message.";
      if (err.response?.data?.errors) {
        errorMessage = err.response.data.errors.map((e) => e.msg).join(", ");
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.request) {
        errorMessage = "Network error - please check your connection.";
      }

      setAlertMessage(errorMessage);
      setAlertType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container b-container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto contact-section">
            <h2 className="text-center mb-4">Contact Us</h2>

            {alertMessage && (
              <div className={`alert alert-${alertType}`} role="alert">
                {alertMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here"
                  required
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback">{errors.message}</div>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-custom w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Contact information */}
        <div className="row mt-4 text-center contact-info">
          <div className="col-md-4 bt">
            <FaAddressBook className="contact-icon" />
            <h5>Address</h5>
            <p>Pokhara-8 Srijanachok, Kaski</p>
          </div>
          <div className="col-md-4 bt">
            <CgMail className="contact-icon" />
            <h5>Email</h5>
            <p>nrcskaski@gmail.com</p>
          </div>
          <div className="col-md-4 bt">
            <FaPhoneAlt className="contact-icon" />
            <h5>Phone</h5>
            <p>+061-520811</p>
          </div>
        </div>

        <div className="row mt-4 location-section">
          <div className="col-md-12 text-center">
            <FaMapMarkerAlt className="location-icon" />
            <h5>Location</h5>
          </div>
          <div className="col-md-12">
            <iframe
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9559283159046!3d-37.8172097420215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5770d0b4c0b451b!2sMelbourne%2C%20Victoria%2C%20Australia!5e0!3m2!1sen!2s!4v1611812190123!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
