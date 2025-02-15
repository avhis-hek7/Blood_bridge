import React from "react";
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
                <p><img src="Social-media-icon/whatsapp.png" alt="" /></p>
                <p><img src="Social-media-icon/twitter1.png" alt="" /></p>
                <p><img src="Social-media-icon/instagram.png" alt="" /></p>
                <p><img src="Social-media-icon/facebook.png" alt="" /></p>
                
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
