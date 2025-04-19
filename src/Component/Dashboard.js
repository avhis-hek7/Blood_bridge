import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCog, FaBars, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

function Sidebar() {
  return (
    <nav className="d-flex flex-column p-3 bg-dark text-white vh-100" style={{ width: "250px" }}>
      <h3 className="text-center">BloodBridge</h3>
      <hr />
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/donors" className="nav-link text-white">
            <FaUsers /> Donors
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className="nav-link text-white">
            <FaCog /> Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

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
        // Redirect to login if unauthorized
        navigate('/admin-login');
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/admin-login');
      return;
    }
    fetchUsers();
  }, [navigate]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
      setError(null);
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
        user._id === editingUser._id ? {
          _id: response.data._id,
          name: response.data.name,
          phone: response.data.phone,
          email: response.data.email,
          address: response.data.address
        } : user
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

  if (loading) return <div className="p-4 w-100"><h3>Loading...</h3></div>;

  return (
    <div className="p-4 w-100">
      <h2>User Management</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Edit User Form */}
      {editingUser && (
        <div className="card mb-4">
          <div className="card-body">
            <h4>Edit User</h4>
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
        </div>
      )}

      {/* Users Table */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
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
  );
}

function App() {
  return (
      <div className="d-flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
  );
}

export default App;
