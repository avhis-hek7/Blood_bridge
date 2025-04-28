// src/components/AdminSidebar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUsers, FaHospital, FaClipboardList, 
  FaCog, FaSignOutAlt, FaTachometerAlt, FaFirstAid 
} from 'react-icons/fa';

const AdminSidebar = () => {
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
};

export default AdminSidebar;
