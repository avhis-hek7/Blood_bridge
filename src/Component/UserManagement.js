import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import AdminTimeout from './AdminTimeout'; // Import AdminTimeout

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthToken = () => localStorage.getItem('authToken');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    headers: { 'Content-Type': 'application/json' }
  });

  api.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) config.headers['auth-token'] = token;
    return config;
  });

  api.interceptors.response.use(
    res => res,
    err => {
      if (err.response?.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
        navigate('/admin-login');
      }
      return Promise.reject(err);
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
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(Array.isArray(response.data.users) ? response.data.users : response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async e => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      const response = await api.put(`/user/${editingUser._id}`, formData);
      setUsers(users.map(user => (user._id === editingUser._id ? response.data : user)));
      setEditingUser(null);
      setFormData({ name: '', phone: '', email: '', address: '' });
      setError(null);
    } catch (err) {
      setError('Failed to update user: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteUser = async userId => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setError(null);
    } catch (err) {
      setError('Failed to delete user: ' + (err.response?.data?.error || err.message));
    }
  };

  const startEditing = user => {
    setEditingUser(user);
    setFormData({ name: user.name, phone: user.phone, email: user.email, address: user.address });
  };

  if (loading) return <div className="d-flex"><AdminSidebar /><div className="p-4">Loading...</div></div>;

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
        <AdminTimeout /> {/* Add AdminTimeout component here */}
        <h2>User Management</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        {editingUser && (
          <form onSubmit={handleUpdateUser} className="mb-4">
            <div className="row">
              <div className="col-md-3 mb-3">
                <input type="text" name="name" className="form-control" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3 mb-3">
                <input type="tel" name="phone" className="form-control" placeholder="Phone" value={formData.phone} onChange={handleInputChange} pattern="9[0-9]{9}" required />
              </div>
              <div className="col-md-3 mb-3">
                <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3 mb-3">
                <input type="text" name="address" className="form-control" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary me-2">Update User</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
          </form>
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
                    <button className="btn btn-sm btn-info me-2" onClick={() => startEditing(user)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user._id)}>
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
  );
}

export default UserManagement;
