import React from "react";
import styles from "./About.module.css"; // Import the CSS Module

function About() {
  return (
    <div className={styles["about-container"]}>
      <div className={`container ${styles["b-container"]} p-4 ${styles["animated-content"]}`}>
        <h1 className={`display-4 mb-4 ${styles["title-animation"]}`}>About Us</h1>
        <p className={`mb-4 ${styles["fade-in"]}`}>
          Welcome to <strong className={styles.highlight}>Blood-Bridge</strong>, a
          dedicated platform committed to saving lives through voluntary blood
          donation. Our mission is to connect generous donors with those in
          urgent need, ensuring that no one suffers due to a shortage of blood.
        </p>

        <div className={`${styles["mission-card"]} ${styles["card-animation"]}`}>
          <h2 className={`h2 mt-4 ${styles["section-title"]}`}>Our Mission</h2>
          <p className="mb-4">
            We strive to bridge the gap between blood donors and recipients by
            providing a seamless, accessible, and efficient system for blood
            donation. Our goal is to make life-saving blood available to
            hospitals, blood banks, and individuals in need at the right time.
          </p>
        </div>

        <div className={`${styles.card} ${styles["card-animation"]} ${styles["delay-1"]}`}>
          <h2 className={`h2 mt-4 ${styles["section-title"]}`}>Why Donate Blood?</h2>
          <p className="mb-4">
            Every second, someone in the world needs blood. A single donation
            can save up to three lives. Blood donation is a simple yet powerful
            act of kindness that helps accident victims, surgical patients,
            cancer patients, and those with chronic illnesses.
          </p>
        </div>

        <div className={`${styles.card} ${styles["card-animation"]} ${styles["delay-2"]}`}>
          <h2 className={`h2 mt-4 ${styles["section-title"]}`}>How It Works</h2>
          <ul className={`list-group mb-4 ${styles.ListName}`}>
            <li className={`list-group-item ${styles["fade-in-list"]}`}>
              <strong>Register:</strong> Sign up as a donor or request blood
              through our user-friendly platform.
            </li>
            <li className={`list-group-item ${styles["fade-in-list"]} ${styles["delay-1"]}`}>
              <strong>Find a Match:</strong> Our advanced system helps connect
              donors with nearby blood banks and patients in need.
            </li>
            <li className={`list-group-item ${styles["fade-in-list"]} ${styles["delay-2"]}`}>
              <strong>Donate:</strong> Visit the nearest blood donation center
              or participate in a donation drive.
            </li>
            <li className={`list-group-item ${styles["fade-in-list"]} ${styles["delay-3"]}`}>
              <strong>Save Lives:</strong> Your contribution can make a
              difference and bring hope to those in distress.
            </li>
          </ul>
        </div>

        <div className={`${styles.card} ${styles["card-animation"]} ${styles["delay-3"]}`}>
          <h2 className={`h2 mt-4 ${styles["section-title"]}`}>Who We Are</h2>
          <p className="mb-4">
            We are a team of healthcare professionals, volunteers, and
            technology experts dedicated to making blood donation easy,
            transparent, and effective. By leveraging technology, we ensure
            quick and hassle-free blood donation services.
          </p>
        </div>

        <div className={`${styles.card} ${styles["card-animation"]} ${styles["delay-4"]}`}>
          <h2 className={`h2 mt-4 ${styles["section-title"]}`}>Get Involved</h2>
          <p className="mb-4">
            Join us in our mission to save lives. Whether as a donor, volunteer,
            or supporter, your participation makes a significant impact.
            Together, we can create a healthier and stronger community.
          </p>
        </div>

        <div className={`${styles["contact-card"]} ${styles["card-animation"]} ${styles["delay-5"]}`}>
          <h2 className={`h2 mt-4 ${styles["section-title"]}`}>Contact Us</h2>
          <p>
            Have questions or need assistance? Get in touch with us at{" "}
            <strong className={styles.highlight}>contact@bloodbridge.org</strong> or
            call <strong className={styles.highlight}>+1 (800) 555-BLOOD</strong>.
            We're here to help!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;