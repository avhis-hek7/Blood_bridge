import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminBloodBank.module.css"; // <- Updated CSS module
import AdminSidebar from "./AdminSidebar";
import AdminTimeout from "./AdminTimeout";

const AdminBloodBank = () => {
  const [banks, setBanks] = useState([]);
  const [form, setForm] = useState({
    name: "", address: "", landmark: "", city: "",
    email: "", mobile: "", image: "", website: ""
  });

  const BASE_URL = "http://localhost:5000/api/bloodbank";

  const fetchBanks = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setBanks(res.data);
    } catch (err) {
      console.error("Error fetching blood banks:", err.message);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL, form);
      setForm({
        name: "", address: "", landmark: "", city: "",
        email: "", mobile: "", image: "", website: ""
      });
      fetchBanks();
    } catch (err) {
      console.error("Error adding blood bank:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchBanks();
    } catch (err) {
      console.error("Error deleting blood bank:", err.message);
    }
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>

      <div className={styles.adminContainer}>
        <AdminTimeout />
        <h2 className={styles.title}>Admin - Manage Blood Banks</h2>

        <form className={styles.form} onSubmit={handleAdd}>
          {Object.keys(form).map((key) => (
            <input
              className={styles.input}
              key={key}
              placeholder={key}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              required={["name", "address", "city", "email", "mobile"].includes(key)}
            />
          ))}
          <button type="submit" className={styles.btn}>Add Blood Bank</button>
        </form>

        <ul className={styles.bankList}>
          {banks.map((bank) => (
            <li key={bank._id} className={styles.bankItem}>
              <h3>{bank.name}</h3>
              <p>{bank.address}, {bank.city}</p>
              <p>{bank.mobile}</p>
              <a href={bank.website} target="_blank" rel="noreferrer">{bank.website}</a>
              <button className={styles.deleteBtn} onClick={() => handleDelete(bank._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminBloodBank;
