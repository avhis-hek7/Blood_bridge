import React from 'react'
import {Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
    {/*Navbar*/}
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <link className="navbar-brand fs-3 fw-bold" to="#">
            RED LIFE
          </link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <link className="nav-link mx-2 fs-5 fw-semibold" to='/'>
                  Home
                </link>
              </li>
              <li className="nav-item">
                <link className="nav-link mx-2 fs-5 fw-semibold" to="/about">
                  About
                </link>
              </li>
              <li className="nav-item">
                <link className="nav-link mx-2 fs-5 fw-semibold" to='/contact'>
                  Contact
                </link>
              </li>
              <li className="nav-item">
                <link className="nav-link mx-2 fs-5 fw-semibold" to='/event'>
                  Event
                </link>
              </li>
              <li className="nav-item">
                <link className="nav-link mx-2 fs-5 fw-semibold" to='/blog'>
                  Blog
                </link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
              <button className="login-button mx-2" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
    </>
  )
}

export default NavBar
