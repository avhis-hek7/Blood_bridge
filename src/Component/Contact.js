import React from "react";
import { FaAddressBook } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <>
      <div>
        <div className=" mt-5">
          <div className="row">
            <div className="col-md-6 mx-auto contact-section">
              <h1 className="text-center mb-4">Contact Us</h1>
              <form>
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="4"
                    placeholder="Write your message here"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-custom w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="row mt-4 text-center">
            <div className="col-md-4 bt">
              <FaAddressBook style={{ fontSize: "2rem" }} />
              <h5>Address</h5>
              <p>Pokhara-8 Srijanachok, Kaski</p>
            </div>
            <div className="col-md-4 bt">
              <CgMail style={{ fontSize: "2rem" }} />
              <h5>Email</h5>
              <p>nrcskaski@gmail.com</p>
            </div>
            <div className="col-md-4 bt">
              <FaPhoneAlt style={{ fontSize: "2rem" }} />

              <h5>Phone</h5>
              <p>+061-520811</p>
            </div>
          </div>
          <div className="row mt-4">
            <FaMapMarkerAlt style={{ fontSize: "2rem" }} />
            <h5 style={{ textAlign: "center" }}>Location</h5>
            <div className="col-md-12">
              <iframe
                title="Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4810500846995!2d83.97751917530685!3d28.2120078777347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595e12094ee4d%3A0xa4fd090a5a25377!2sSrijanachowack!5e0!3m2!1sen!2snp!4v1712123456789"
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
    </>
  );
}

export default Contact;
