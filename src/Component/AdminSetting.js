import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserPlus, FaUserEdit, FaUserTimes, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSidebar from './AdminSidebar';

const AdminSettings = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/auth/admins', {
        headers: {
          'auth-token': token
        }
      });
      
      // Transform the data to ensure we have proper IDs
      const transformedAdmins = response.data.admins.map(admin => ({
        ...admin,
        id: admin._id?.$oid || admin._id || admin.id
      }));
      
      setAdmins(transformedAdmins || []);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch admins');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      
      if (isEditing) {
        toast.error('Edit functionality not available');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/auth/create-admin',
        formData,
        {
          headers: {
            'auth-token': token
          }
        }
      );

      toast.success(response.data.message || 'Admin created successfully!');
      fetchAdmins();
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed');
    }
  };

  const handleEdit = (admin) => {
    setFormData({
      username: admin.username,
      email: admin.email,
      password: '',
    });
    setEditingId(admin.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error('Invalid admin ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(
          `http://localhost:5000/api/auth/delete-admin/${id}`,
          {
            headers: {
              'auth-token': token
            }
          }
        );
        
        toast.success(response.data.message || 'Admin deleted successfully!');
        fetchAdmins();
      } catch (err) {
        // Handle specific error cases
        if (err.response) {
          if (err.response.status === 403) {
            toast.error(err.response.data.error || 'Permission denied');
          } else if (err.response.status === 400) {
            toast.error(err.response.data.error || 'Invalid request');
          } else if (err.response.status === 404) {
            toast.error(err.response.data.error || 'Admin not found');
          } else {
            toast.error(err.response.data.error || 'Delete failed');
          }
        } else {
          toast.error('Network error or server unavailable');
        }
        console.error('Delete error:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredAdmins = admins.filter(admin => {
    const search = searchTerm.toLowerCase();
    return (
      admin.username.toLowerCase().includes(search) ||
      admin.email.toLowerCase().includes(search)
    );
  });

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="content" style={{ marginLeft: '250px', padding: '20px' }}>
        <h2 className="mb-4">Admin Management</h2>
        
        {/* Admin Form */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            {isEditing ? 'Edit Admin' : 'Create New Admin'}
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!isEditing}
                    placeholder={isEditing ? 'Leave blank to keep unchanged' : ''}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2">
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update Admin' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Admin List */}
        <div className="card">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <span>Admin List</span>
            <div className="input-group" style={{ width: '300px' }}>
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center">Loading admins...</div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.length > 0 ? (
                      filteredAdmins.map((admin) => (
                        <tr key={admin.id}>
                          <td>{admin.username}</td>
                          <td>{admin.email}</td>
                          <td>
                            <span className="badge bg-primary">
                              {admin.role}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => handleEdit(admin)}
                              >
                                <FaUserEdit /> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(admin.id)}
                                disabled={admin.role === 'superadmin'}
                                title={admin.role === 'superadmin' ? 'Superadmins cannot be deleted' : ''}
                              >
                                <FaUserTimes /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No admins found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;