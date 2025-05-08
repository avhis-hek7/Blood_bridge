
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTint, FaHospital, FaBell,FaVials } from "react-icons/fa";
import axios from "axios";

function Navbar() {
  const location = useLocation();
  const isUserLoggedIn =
    localStorage.getItem("authToken") &&
    localStorage.getItem("isAdmin") !== "true";
  const isAdminLoggedIn =
    localStorage.getItem("authToken") &&
    localStorage.getItem("isAdmin") === "true";

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("http://localhost:5000/api/notifications", {
          headers: { "auth-token": token },
        });
        setNotifications(res.data || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isUserLoggedIn) {
      fetchNotifications();
    }
  }, [isUserLoggedIn]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleDropdownToggle = () => {
    const userId = localStorage.getItem("userId");

    if (unreadCount > 0 && userId) {
      axios
        .post(
          "http://localhost:5000/api/notifications/mark-read",
          { user_id: userId },
          {
            headers: {
              "auth-token": localStorage.getItem("authToken"),
            },
          }
        )
        .then(() => {
          setNotifications((prev) =>
            prev.map((n) => (!n.isRead ? { ...n, isRead: true } : n))
          );
        })
        .catch((err) =>
          console.error("Error marking notifications as read:", err)
        );
    }

    setShowDropdown((prev) => !prev);
  };

  const handleClearNotifications = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token found in localStorage");
        return;
      }

      // Clear notifications on the server
      await axios.post(
        "http://localhost:5000/api/notifications/clear",
        {},
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );

      // Then re-fetch notifications to sync frontend state
      const res = await axios.get("http://localhost:5000/api/notifications", {
        headers: {
          "auth-token": authToken,
        },
      });

      setNotifications(res.data.notifications || []); // Update state with latest (likely empty)
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-secondary sticky-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/logo1.jpg"
            alt="Blood-Bridge Logo"
            style={{ height: "40px" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                } text-white fs-7 fw-semibold mx-3`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                } text-white fs-7 fw-semibold mx-3`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/events" ? "active" : ""
                } text-white fs-7 fw-semibold mx-3`}
                to="/events"
              >
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/contact" ? "active" : ""
                } text-white fs-7 fw-semibold mx-3`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/blog" ? "active" : ""
                } text-white fs-7 fw-semibold mx-3`}
                to="/blog"
              >
                Blog
              </Link>
            </li>

            {isAdminLoggedIn && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/admin/dashboard" ? "active" : ""
                  } text-white fs-7 fw-semibold mx-3`}
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <div className="nav-item dropdown">
              <span
                className="btn btn-outline-light rounded-pill dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </span>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2"
                    to="/donate"
                  >
                    <FaTint style={{ color: "#c20f33" }} />
                    Donate Blood
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2"
                    to="/bloodbank"
                  >
                    <FaHospital style={{ color: "#c20f33" }} />
                    Blood Bank
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2"
                    to="/bloodinventory"
                  >
                    <FaVials style={{ color: "#c20f33" }} />
                    Blood Inventory
                  </Link>
                </li>
              </ul>
            </div>

            {isUserLoggedIn && (
              <div className="nav-item position-relative">
                <button
                  className="btn btn-outline-light position-relative"
                  onClick={handleDropdownToggle}
                >
                  <FaBell />
                  {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showDropdown && (
                  <div
                    className="position-absolute bg-white p-3 shadow rounded"
                    style={{
                      top: "40px",
                      right: "0",
                      zIndex: 999,
                      width: "300px",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">Notifications</h6>
                      {notifications.length > 0 && (
                        <button
                          className="btn btn-sm btn-link text-danger p-0"
                          onClick={handleClearNotifications}
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {loading ? (
                      <p className="text-muted">Loading...</p>
                    ) : notifications.length === 0 ? (
                      <p className="text-muted">No notifications</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n._id} className="border-bottom mb-2 pb-1">
                          <small className="text-muted">
                            {new Date(n.timestamp).toLocaleString()}
                          </small>
                          <br />
                          <span>{n.message}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {(isUserLoggedIn || isAdminLoggedIn) && (
              <button
                className="btn btn-outline-light rounded-pill"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("isAdmin");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
