import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTint, FaHospital, FaUser } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const isAdminLoggedIn =
    localStorage.getItem("authToken") && localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

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
            {["/", "/about", "/events", "/contact", "/blog"].map((path, index) => {
              const labels = ["Home", "About", "Events", "Contact", "Blog"];
              return (
                <li className="nav-item" key={index}>
                  <Link
                    className={`nav-link ${
                      location.pathname === path ? "active" : ""
                    } text-white fs-7 fw-semibold mx-3`}
                    to={path}
                  >
                    {labels[index]}
                  </Link>
                </li>
              );
            })}

            {isAdminLoggedIn && (
              <>
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
                <li className="nav-item">
                  <button
                    className="nav-link text-white fs-7 fw-semibold mx-3 bg-transparent border-0"
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      localStorage.removeItem("isAdmin");
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          <form className="d-flex" role="search">
            <Link
              className="btn btn-outline-light rounded-pill me-3 bg-secondary"
              to="/profile"
            >
              Profile
              <FaUser className="pb-1 ms-2" style={{ color: "#c20f33" }} />
            </Link>
            <Link
              className="btn btn-outline-light me-2 pe-1 rounded-pill btndonate bg-secondary"
              to="/donate"
            >
              Donate Blood
              <FaTint className="pb-1 ms-2" style={{ color: "#c20f33" }} />
            </Link>
            <Link
              className="btn btn-outline-light rounded-pill ms-2 bg-secondary"
              to="/bloodbank"
            >
              Blood Bank
              <FaHospital className="pb-1 ms-2" style={{ color: "#c20f33" }} />
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
