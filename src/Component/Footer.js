import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="sb_footer section_padding">
          <div className="sb_footer-links">
            <div className="sb_footer-links-div">
              <h4>For Donation</h4>
              <a href="/">
                <p>Registration</p>
              </a>
              <a href="/">
                <p>Blood Donate</p>
              </a>
              <a href="/">
                <p>Map</p>
              </a>
            </div>
            <div className="sb_footer-links-div">
              <h4>Resources</h4>
              <a href="/">
                <p>Blood bank</p>
              </a>
              <a href="/">
                <p>Age</p>
              </a>
              <a href="/">
                <p>STV</p>
              </a>
            </div>
            <div className="sb_footer-links-div">
              <h4>Patners</h4>
              <a href="/">
                <p>Red Cross</p>
              </a>
            </div>
            <div className="sb_footer-links-div">
              <h4>Company</h4>
              <a href="/">
                <p>About</p>
              </a>
              <a href="/">
                <p>Press</p>
              </a>
              <a href="/">
                <p>Q&A</p>
              </a>
              <a href="/">
                <p>Contact</p>
              </a>
            </div>
            <div className="sb_footer-links-div">
              <h4>Comming Soon</h4>
              <div className="socialmedia">
              <a href="/"><p><FaFacebook style={{fontSize:"1.6rem"}}/></p></a>
                <a href="/"><p><FaTwitter style={{fontSize:"1.6rem"}}/></p></a>
                <a href="/"><p><FaInstagram style={{fontSize:"1.6rem"}}/></p></a>
                <a href="/"><p><FaWhatsapp style={{fontSize:"1.6rem"}}/></p></a>
                
              </div>
            </div>
          </div>
          <hr/>
          <div className="sb_footer-below">
            <div className="sb_footer-copyright">
              <p>
                @{new Date().getFullYear()} Blood Portal. All right reserved
              </p>
            </div>
            <div className="sb_footer-below-links">
              <a href="/"><div><p>Terms & COnditions</p></div></a>
              <a href="/"><div><p>Privacy</p></div></a>
              <a href="/"><div><p>Security</p></div></a>
              <a href="/"><div><p>Cookie Declaration</p></div></a>
            </div>
          </div>
          </div>
          </div>
          
    </>
  );
}
