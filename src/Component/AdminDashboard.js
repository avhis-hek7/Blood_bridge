import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUsers, FaTint, FaHospital, FaCalendarCheck } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    totalHospitals: 0,
    successfulDonations: 0,
    bloodTypeStats: [],
    monthlyDonations: [],
    recentDonations: [],
    users: [],
    pendingRequests: []
  });
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF0000', '#00FF00', '#0000FF'];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!token || !isAdmin) {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('isAdmin');
          navigate('/');
        }
      }
    };

    fetchStats();
  }, [navigate]);

  const renderOverview = () => (
    <>
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Total Donors</h6>
                  <h2 className="mb-0">{stats.totalDonors}</h2>
                </div>
                <FaUsers size={30} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Successful Donations</h6>
                  <h2 className="mb-0">{stats.successfulDonations}</h2>
                </div>
                <FaTint size={30} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Pending Requests</h6>
                  <h2 className="mb-0">{stats.totalRequests}</h2>
                </div>
                <FaCalendarCheck size={30} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Partner Hospitals</h6>
                  <h2 className="mb-0">{stats.totalHospitals}</h2>
                </div>
                <FaHospital size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Monthly Donations</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.monthlyDonations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="donations" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Blood Type Distribution</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.bloodTypeStats}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {stats.bloodTypeStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderUsers = () => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Registered Users</h5>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Blood Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.bloodType}</td>
                  <td>{user.location}</td>
                  <td>
                    <span className={`badge bg-${user.isActive ? 'success' : 'danger'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Blood Requests</h5>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Requester</th>
                <th>Blood Type</th>
                <th>Units</th>
                <th>Hospital</th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.pendingRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.requesterName}</td>
                  <td>{request.bloodType}</td>
                  <td>{request.units}</td>
                  <td>{request.hospital}</td>
                  <td>
                    <span className={`badge bg-${request.urgency === 'High' ? 'danger' : request.urgency === 'Medium' ? 'warning' : 'info'}`}>
                      {request.urgency}
                    </span>
                  </td>
                  <td>{request.status}</td>
                  <td>
                    <button className="btn btn-sm btn-success me-2">Approve</button>
                    <button className="btn btn-sm btn-danger">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admin Dashboard</h2>
        <div className="btn-group">
          <button
            className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`btn ${activeTab === 'requests' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('requests')}
          >
            Requests
          </button>
        </div>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'requests' && renderRequests()}
    </div>
  );
}

export default AdminDashboard;