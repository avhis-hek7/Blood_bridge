import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="sb_footer section_padding">
          <div className="sb_footer-links">
            <div className="sb_footer-links-div">
              <h4>For Donation</h4>
              <Link to="/donate">
                <p>Blood Donate</p>
              </Link>
              <Link to="/contact">
                <p>Map</p>
              </Link>
            </div>

            <div className="sb_footer-links-div">
              <h4>Resources</h4>
              <Link to="/bloodbank">
                <p>Blood Bank</p>
              </Link>
              <Link to="/egibility">
                <p>Health Check</p>
              </Link>
              <Link to="/events">
                <p>New Campaign</p>
              </Link>
            </div>

            <div className="sb_footer-links-div">
              <h4>Partners</h4>
              <a href="https://nrcs.org/" target="_blank">
                <p>Red Cross</p>
              </a>
            </div>

            <div className="sb_footer-links-div">
              <h4>Company</h4>
              <Link to="/about">
                <p>About</p>
              </Link>
              <Link to="/blog">
                <p>Blogs</p>
              </Link>
              <Link to="/contact">
                <p>Contact</p>
              </Link>
            </div>

            <div className="sb_footer-links-div">
              <h4>Follow us</h4>
              <div className="socialmedia">
                <a
                  href="https://www.facebook.com/BDHNepal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook style={{ fontSize: "1.6rem" }} />
                </a>
                <a
                  href="https://x.com/givebloodnhs?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter style={{ fontSize: "1.6rem" }} />
                </a>
                <a
                  href="https://www.instagram.com/givebloodnhs/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram style={{ fontSize: "1.6rem" }} />
                </a>
                <a
                  href="https://chat.whatsapp.com/EPbdI3vGVLrIlsRxlsjpfY"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp style={{ fontSize: "1.6rem" }} />
                </a>
              </div>
            </div>
          </div>

          <hr />

          <div className="sb_footer-below">
            <div className="sb_footer-copyright">
              <p>
                © {new Date().getFullYear()} Blood Portal. All rights reserved.
              </p>
            </div>
            <div className="sb_footer-below-links">
              <Link to="/termscondition">
                <p>Terms & Conditions</p>
              </Link>
             
              <Link to="/security">
                <p>Security</p>
              </Link>
              <Link to="/">
                <p>Cookie Declaration</p>
              </Link>
            </div>
          </div>

          <footer className="foot">
            <div className="footercontent">
            <img
            className="footer-logo"
            src="blood.png"
            alt="Blood-Bridge Logo"
            style={{ height: "40px" }}
          />
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
