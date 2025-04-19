import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCog, FaBars } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";

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
  return (
    <div className="p-4 w-100">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card p-3 bg-primary text-white">
            <h4>Users</h4>
            <p>26K (-1.2%)</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 bg-success text-white">
            <h4>Income</h4>
            <p>$6,200 (40.9%)</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 bg-warning text-white">
            <h4>Conversion Rate</h4>
            <p>2.49% (84.7%)</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 bg-danger text-white">
            <h4>Sessions</h4>
            <p>44K (-23.6%)</p>
          </div>
        </div>
      </div>
      <h4 className="mt-4">Traffic & Sales</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Country</th>
            <th>Usage</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Yorgos Avram</td>
            <td>USA</td>
            <td>50%</td>
            <td>10 sec ago</td>
          </tr>
          <tr>
            <td>Avram Tasarios</td>
            <td>Brazil</td>
            <td>10%</td>
            <td>5 min ago</td>
          </tr>
        </tbody>
      </table>
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
