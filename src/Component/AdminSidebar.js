// src/components/AdminSidebar.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaHospital,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaFirstAid,
  FaEnvelopeOpenText,
  FaTint,
} from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSuperadmin = localStorage.getItem("isSuperadmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isSuperadmin");
    navigate("/");
  };

  return (
    <nav
      className="d-flex flex-column p-3 bg-dark text-white vh-100"
      style={{ width: "250px", position: "fixed", backgroundColor: "#343a40" }}
    >
      <h3 className="text-center mb-4" style={{ color: "#f8f9fa" }}>
        {isSuperadmin ? "Superadmin Panel" : "Admin Panel"}
      </h3>
      <hr />
      <ul className="nav flex-column mb-auto">
        <li className="nav-item mb-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className={`btn w-100 text-start d-flex align-items-center ${
              location.pathname === "/admin/dashboard"
                ? "bg-secondary text-white"
                : "btn-dark text-white"
            }`}
            style={{ border: "none" }}
          >
            <FaTachometerAlt className="me-2" /> Dashboard
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => navigate("/admin/users")}
            className={`btn w-100 text-start d-flex align-items-center ${
              location.pathname === "/admin/users"
                ? "bg-secondary text-white"
                : "btn-dark text-white"
            }`}
            style={{ border: "none" }}
          >
            <FaUsers className="me-2" /> Users
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => navigate("/admin/events")}
            className={`btn w-100 text-start d-flex align-items-center ${
              location.pathname === "/admin/events"
                ? "bg-secondary text-white"
                : "btn-dark text-white"
            }`}
            style={{ border: "none" }}
          >
            <FaFirstAid className="me-2" /> Add Events
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => navigate("/admin/bloodbank")}
            className={`btn w-100 text-start d-flex align-items-center ${
              location.pathname === "/admin/bloodbank"
                ? "bg-secondary text-white"
                : "btn-dark text-white"
            }`}
            style={{ border: "none" }}
          >
            <FaHospital className="me-2" /> BloodBanks
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => navigate("/admin/inventory")}
            className={`btn w-100 text-start d-flex align-items-center ${
              location.pathname === "/admin/inventory"
                ? "bg-secondary text-white"
                : "btn-dark text-white"
            }`}
            style={{ border: "none" }}
          >
            <FaTint className="me-2" /> AdminInventory
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => navigate("/admin/emergency")}
            className={`btn w-100 text-start d-flex align-items-center ${
              location.pathname === "/admin/emergency"
                ? "bg-secondary text-white"
                : "btn-dark text-white"
            }`}
            style={{ border: "none" }}
          >
            <FaTint className="me-2" /> Emergency request
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => navigate("/admin/contact")}
            className={`btn w-100 text-start d-flex align-items-center ${
              location.pathname === "/admin/contact"
                ? "bg-secondary text-white"
                : "btn-dark text-white"
            }`}
            style={{ border: "none" }}
          >
            <FaEnvelopeOpenText className="me-2" /> Inquiry
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => navigate("/admin/notification")}
            className={`btn w-100 text-start d-flex align-items-center ${
              location.pathname === "/admin/notification"
                ? "bg-secondary text-white"
                : "btn-dark text-white"
            }`}
            style={{ border: "none" }}
          >
            <FaClipboardList className="me-2" /> Notifications
          </button>
        </li>
        {isSuperadmin && (
          <li className="nav-item mb-2">
            <button
              onClick={() => navigate("/admin/settings")}
              className={`btn w-100 text-start d-flex align-items-center ${
                location.pathname === "/admin/settings"
                  ? "bg-secondary text-white"
                  : "btn-dark text-white"
              }`}
              style={{ border: "none" }}
            >
              <FaCog className="me-2" /> Settings
            </button>
          </li>
        )}
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
