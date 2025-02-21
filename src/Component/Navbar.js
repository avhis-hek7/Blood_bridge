import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTint, FaHospital } from "react-icons/fa";

function Navbar() {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg bg-secondary" >
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
              <Link className={`nav-link ${
                  location.pathname === "/blog" ? "active" : ""
                } text-white fs-7 fw-semibold mx-3`}
                to="/blog" >
                Blog
              </Link>
            </li>
          </ul>
          
          <form className="d-flex" role="search">
            <Link
              className="btn btn-outline-light me-2 pe-1 rounded-pill btndonate bg-secondary"
              type="submit"
              to="/donate"
            >
              Donate Blood
              <FaTint className="pb-1" style={{ color: "#c20f33" }} />
            </Link>
            <Link
              className="btn btn-outline-light rounded-pill ms-2 bg-secondary"
              type="submit"
              to="/bloodbank"
            >
              Blood Bank
              <FaHospital className="pb-1" style={{ color: "#c20f33" }} />
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
