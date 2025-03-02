import React from "react";
const Security = () => {
  return (
    <div className="container security-container">
      <h1 className="text-center my-4">Security Policy</h1>
      <p className="text-muted text-center">Last Updated: March 2025</p>
      
      <div className="security-content">
        <h3>1. Introduction</h3>
        <p>
          We prioritize the security of your personal information and ensure 
          that appropriate safeguards are in place to protect against unauthorized 
          access, disclosure, or misuse.
        </p>

        <h3>2. Data Protection Measures</h3>
        <ul>
          <li>All sensitive user data is encrypted using industry-standard protocols.</li>
          <li>Secure Socket Layer (SSL) technology is used for data transmission.</li>
          <li>Access to sensitive information is restricted to authorized personnel only.</li>
        </ul>

        <h3>3. User Authentication</h3>
        <p>
          We implement multi-factor authentication (MFA) for secure access to 
          user accounts and enforce strong password policies.
        </p>

        <h3>4. Threat Monitoring</h3>
        <p>
          Continuous monitoring is performed to detect potential threats and 
          respond to security incidents promptly.
        </p>

        <h3>5. Secure Transactions</h3>
        <p>
          Any transactions conducted through our platform are protected using 
          encryption technologies to prevent fraud and data breaches.
        </p>

        <h3>6. Reporting Security Issues</h3>
        <p>
          If you identify a security vulnerability, please report it to our security team 
          at <a href="mailto:security@blooddonation.com">security@blooddonation.com</a>.
        </p>

        <h3>7. Compliance</h3>
        <p>
          We comply with global security regulations and data protection laws 
          to ensure the highest level of security for our users.
        </p>
      </div>
    </div>
  );
};

export default Security;

