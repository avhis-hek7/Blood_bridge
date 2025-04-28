import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUsers, FaHospital } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AdminSidebar from './AdminSidebar';
import AdminTimeout from './AdminTimeout';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    totalHospitals: 0,
    successfulDonations: 0,
    bloodTypeStats: [],
    monthlyDonations: []
  });
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF0000', '#00FF00', '#0000FF'];

  const getAuthToken = () => localStorage.getItem('authToken');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    headers: { 'Content-Type': 'application/json' }
  });

  api.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) config.headers['auth-token'] = token;
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
        navigate('/admin-login');
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const token = getAuthToken();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!token || !isAdmin) {
      navigate('/admin-login');
      return;
    }
    fetchUsers();
    fetchDashboardData();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      const fetchedUsers = response.data.users || response.data;
      if (Array.isArray(fetchedUsers)) {
        setUsers(fetchedUsers);
        setError(null);
      } else {
        throw new Error('Invalid user data format received');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Please login to access this page');
      } else {
        setError('Failed to fetch users: ' + (err.response?.data?.error || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/stats');
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const renderOverview = () => (
    <>
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Total Users</h6>
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
                  <h6 className="mb-0">No of events</h6>
                  <h2 className="mb-0">{stats.successfulDonations}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Total Participants</h6>
                  <h2 className="mb-0">{stats.totalRequests}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Blood Banks</h6>
                  <h2 className="mb-0">{stats.totalHospitals}</h2>
                </div>
                <FaHospital size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Monthly Events</h5>
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
        <div className="col-md-6">
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
                    outerRadius={100}
                    fill="#8884d8"
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

  return (
    <div className="d-flex">
      <AdminTimeout />
      <AdminSidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Admin Dashboard</h2>
              <div className="btn-group">
                <button
                  className={`btn btn-${activeTab === 'overview' ? 'primary' : 'outline-primary'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
              </div>
            </div>
            {activeTab === 'overview' && renderOverview()}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
