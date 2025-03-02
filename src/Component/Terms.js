import React, { useState } from "react";
const TermsAndConditions = () => {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    alert("Thank you for agreeing to the Terms and Conditions.");
  };

  return (
    <div className=" container terms-container">
      <h1 className="text-center my-4">Terms and Conditions</h1>
      <p className="text-muted text-center">Last Updated: March 2025</p>
        <p style={{textAlign: 'center'}}>
          By using this website, you acknowledge and agree to abide by the terms and conditions set forth herein. 
          Our blood donation platform operates to facilitate the process of voluntary blood donation by connecting 
          donors with recipients in need. Users must be at least 18 years old to register as donors, and all donations 
          must comply with legal and medical eligibility criteria. We do not guarantee the availability of donors or the 
          safety of transfusions, as this is managed by certified medical professionals. Users are responsible for 
          providing accurate and truthful information when registering, and any false or misleading information may 
          result in suspension or removal from the platform. We are committed to protecting your personal data, 
          ensuring that all collected information is securely stored and only shared with authorized health organizations. 
          We do not sell or distribute personal data to third parties without user consent. By registering and using this 
          platform, you agree that any health complications arising from donation are not the responsibility of the website 
          operators. The terms and conditions outlined here are subject to change, and it is the responsibility of users 
          to stay informed about updates. For any concerns regarding these terms, please contact us at the provided 
          email address.
        </p>

      <div className="text-center my-4">
        <input 
          type="checkbox" 
          id="agree" 
          checked={agreed} 
          onChange={() => setAgreed(!agreed)} 
        />
        <label htmlFor="agree" className="mx-2">I agree to the Terms and Conditions</label>
        <br />
        <button 
          className="btn btn-danger mt-3" 
          disabled={!agreed} 
          onClick={handleAgree}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
