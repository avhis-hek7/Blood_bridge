import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BloodInventoryView = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/inventory')
      .then(res => setInventory(res.data))
      .catch(err => console.error('Error fetching inventory:', err));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center text-danger mb-4">Available Blood Inventory</h1>
      
      <table className="table table-striped table-bordered table-hover table-responsive">
        <thead className="thead-dark">
          <tr>
            <th>Blood Type</th>
            <th>Quantity</th>
            <th>Hospital</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item._id} className="transition-all duration-300 hover:bg-light">
              <td>{item.bloodType}</td>
              <td>{item.quantity} units</td>
              <td>{item.hospitalName}</td>
              <td>{item.hospitalLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodInventoryView;
