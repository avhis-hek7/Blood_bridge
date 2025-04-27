import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaUsers, FaTint, FaHospital, FaCalendarCheck, FaEdit, FaTrash, FaTachometerAlt, FaClipboardList, FaCog, FaSignOutAlt, FaFirstAid } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
  };

  return (
    <nav className="d-flex flex-column p-3 bg-dark text-white vh-100" style={{ width: "250px", position: "fixed" }}>
    <h3 className="text-center mb-4">Admin Panel</h3>
    <hr />
    <ul className="nav flex-column mb-auto">
      <li className="nav-item mb-2">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className={`btn w-100 text-start d-flex align-items-center ${location.pathname === '/admin/dashboard' ? 'bg-primary text-white' : 'btn-dark text-white'}`}
          style={{ border: 'none' }}
        >
          <FaTachometerAlt className="me-2" /> Dashboard
        </button>
      </li>
      <li className="nav-item mb-2">
        <button
          onClick={() => navigate('/admin/users')}
          className={`btn w-100 text-start d-flex align-items-center ${location.pathname === '/admin/users' ? 'bg-primary text-white' : 'btn-dark text-white'}`}
          style={{ border: 'none' }}
        >
          <FaUsers className="me-2" /> Users
        </button>
      </li>
      <li className="nav-item mb-2">
        <button
          onClick={() => navigate('/admin/events')}
          className={`btn w-100 text-start d-flex align-items-center ${location.pathname === '/admin/events' ? 'bg-primary text-white' : 'btn-dark text-white'}`}
          style={{ border: 'none' }}
        >
          <FaFirstAid className="me-2" /> Add Events
        </button>
      </li>
      <li className="nav-item mb-2">
        <button
          onClick={() => navigate('/admin/hospitals')}
          className={`btn w-100 text-start d-flex align-items-center ${location.pathname === '/admin/hospitals' ? 'bg-primary text-white' : 'btn-dark text-white'}`}
          style={{ border: 'none' }}
        >
          <FaHospital className="me-2" /> Bloodbanks
        </button>
      </li>
      <li className="nav-item mb-2">
        <button
          onClick={() => navigate('/admin/requests')}
          className={`btn w-100 text-start d-flex align-items-center ${location.pathname === '/admin/requests' ? 'bg-primary text-white' : 'btn-dark text-white'}`}
          style={{ border: 'none' }}
        >
          <FaClipboardList className="me-2" /> Notifications
        </button>
      </li>
      <li className="nav-item mb-2">
        <button
          onClick={() => navigate('/admin/settings')}
          className={`btn w-100 text-start d-flex align-items-center ${location.pathname === '/admin/settings' ? 'bg-primary text-white' : 'btn-dark text-white'}`}
          style={{ border: 'none' }}
        >
          <FaCog className="me-2" /> Settings
        </button>
      </li>
    </ul>
    <hr />
    <button 
      onClick={handleLogout}
      className="btn btn-outline-light d-flex align-items-center justify-content-center w-100"
    >
      <FaSignOutAlt className="me-2" /> Logout
    </button>
  </nav>
  
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    totalHospitals: 0,
    successfulDonations: 0,
    bloodTypeStats: [],
    monthlyDonations: [],
    recentDonations: [],
    pendingRequests: []
  });
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  
  const navigate = useNavigate();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF0000', '#00FF00', '#0000FF'];

  // Get auth token
  const getAuthToken = () => localStorage.getItem('authToken');

  // Create axios instance with auth header
  const api = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Add auth token to every request
  api.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers['auth-token'] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Handle unauthorized responses
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
  // eslint-disable-next-line
const fetchUsers = async () => {
  try {
    setLoading(true);
    const response = await api.get('/users');
    const fetchedUsers = response.data.users || response.data;

    if (Array.isArray(fetchedUsers)) {
      setUsers(fetchedUsers);
      setError(null); // Clear error only if data is valid
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

// eslint-disable-next-line
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

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await api.put(`/user/${editingUser._id}`, formData);
      setUsers(users.map(user => 
        user._id === editingUser._id ? response.data : user
      ));
      setEditingUser(null);
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: ''
      });
      setError(null);
    } catch (err) {
      setError('Failed to update user: ' + (err.response?.data?.error || err.message));
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setError(null);
    } catch (err) {
      setError('Failed to delete user: ' + (err.response?.data?.error || err.message));
    }
  };

  // Set up user for editing
  const startEditing = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address
    });
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
                  <h2 className="mb-0">{users.length}</h2>
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
        <div className="col-md-6">
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

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Management</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          
          {editingUser && (
            <div className="mb-4">
              <h6>Edit User</h6>
              <form onSubmit={handleUpdateUser}>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="Phone (10 digits)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      pattern="9[0-9]{9}"
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary me-2">
                  Update User
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingUser(null);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      address: ''
                    });
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Blood Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.bloodGroup}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => startEditing(user)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  if (loading) return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
        <h3>Loading...</h3>
      </div>
    </div>
  );

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Admin Dashboard</h2>
          <div className="btn-group">
            <button
              className={`btn btn-${activeTab === 'overview' ? 'primary' : 'outline-primary'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            {/* Add more tabs if needed */}
          </div>
        </div>
        {activeTab === 'overview' && renderOverview()}
      </div>
    </div>
  );
}

export default AdminDashboard;