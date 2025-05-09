import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import AdminSidebar from "./AdminSidebar";

const AdminEmergencyManager = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('authToken'); // admin's JWT
        const res = await axios.get('http://localhost:5000/api/emergency', {
          headers: { 'auth-token': token }
        });
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching emergency requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md fixed h-full">
        {/* <AdminSidebar /> */}
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Emergency Requests</h2>
        {requests.length === 0 ? (
          <p>No emergency requests found.</p>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="bg-white border p-4 rounded shadow mb-4">
              <p><strong>User:</strong> {req.userId?.name} ({req.userId?.email})</p>
              <p><strong>Blood Type:</strong> {req.bloodType}</p>
              <p><strong>Units Required:</strong> {req.unitsRequired}</p>
              <p><strong>Reason:</strong> {req.reason || 'N/A'}</p>
              <p><strong>Contact:</strong> {req.contactNumber}</p>
              <p><strong>Status:</strong> {req.status}</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default AdminEmergencyManager;
