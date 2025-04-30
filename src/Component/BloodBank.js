import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BloodBank.module.css";
import blood from "../Background_image/Donation.jpeg";


const Bloodbank = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bloodbank")
      .then(res => setBanks(res.data))
      .catch(err => console.error("Error fetching blood banks:", err));
  }, []);

  return (
    <div className={styles.bloodbankContainer}>
      <h2 className={styles.sectionTitle}>Available Blood Banks</h2>
      <div className={styles.bankList}>
        {banks.map(bank => (
          <div className={styles.bankCard} key={bank._id}>
            <div className={styles.imageContainer}>
              <img
                src={blood || "/placeholder-bloodbank.jpg"}
                alt={`${bank.name}`}
                className={styles.bankImage}
              />
            </div>
            <div className={styles.bankDetails}>
              <p><strong>Name:</strong> {bank.name}</p>
              <p><strong>Address:</strong> {bank.address}, {bank.city}</p>
              <p><strong>Phone:</strong> 📞 {bank.mobile}</p>
              <p><strong>Website:</strong></p>
              <a href={bank.website} target="_blank" rel="noreferrer">
                Visit Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bloodbank;
