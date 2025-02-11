import React from "react";
import logo from "../Background_image/blood.png"
import map from "../Background_image/Blood_map.jpeg"
import donation from "../Background_image/Donation.jpeg"
import reg from "../Background_image/regs.ppm"
import store from "../Background_image/Blood_Storage.jpeg"
// eslint-disable-next-line
export default function Home() {
  return (
    <>
      {/*Navbar */}
      <div>
        <nav className="navbar navbar-expand-lg navbar-danger bg-danger ">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <img
                src="/logo1.jpg"
                alt="Blood-Bridge Logo"
                style={{ height: "40px" }}
              />
            </a>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active text-white -2 fs-5 fw-semibold mx-3"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white -2 fs-5 fw-semibold mx-3"
                    href="/"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white -2 fs-5 fw-semibold mx-3"
                    href="/"
                  >
                    Events
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white -2 fs-5 fw-semibold mx-3"
                    href="/"
                  >
                    Contact
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white -2 fs-5 fw-semibold"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item -2 fs-5 fw-semibold"
                        href="/"
                      >
                        Action
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item -2 fs-5 fw-semibold"
                        href="/"
                      >
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider " />
                    </li>
                    <li>
                      <a
                        className="dropdown-item-2 fs-5 fw-semibold"
                        href="/"
                      >
                        Something else here
                      </a>
                    </li>
                  </ul>
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
              </form>
            </div>
          </div>
        </nav>
      </div>
      {/*Caraousel*/}
      <div>
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1583&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="Blood Donation"
                style={{ height: "450px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center w-100">
                <h1 className="carousel-heading">Welcome to Blood-Bridge</h1>
                <p className="carousel-text">
                  Connecting blood donors with those in need. Every drop counts!
                </p>
                <div className="d-flex gap-3">
                  <a href="/profile" className="btn btn-danger carousel-btn">
                    Log in
                  </a>
                  <a href="/sign" className="btn btn-danger carousel-btn">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
            {/* Slide 2 */}
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="Donor Registration"
                style={{ height: "450px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center w-100">
                <h1 className="carousel-heading">
                  Join the Blood Bridge Network
                </h1>
                <p className="carousel-text">
                  A small act of kindness makes a big difference.
                </p>
                <div className="d-flex gap-3">
                  <a href="/profile" className="btn btn-danger carousel-btn">
                    Log in
                  </a>
                  <a href="/sign" className="btn btn-danger carousel-btn">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
            {/* Slide 3 */}
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1606206591513-adbfbdd7a177?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="Blood Donation Camp"
                style={{ height: "450px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center w-100">
                <h1 className="carousel-heading">Every Drop Saves a Life</h1>
                <p className="carousel-text">Be a hero. Donate blood today!</p>
                <div className="d-flex gap-3">
                  <a href="/profile" className="btn btn-danger carousel-btn">
                    Log in
                  </a>
                  <a href="/sign" className="btn btn-danger carousel-btn">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container  py-5">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-lg-6 text-center text-lg-start mt-4 mt-lg-0">
            <h2 className="display-5 fw-bold text-dark">
              How Does this website work!
            </h2>
            <p className="mt-3 fs-3 text-lg-danger text-sm-dark">
              Here’s a step-by-step guide for signing in to a blood donation
              portal:
            </p>
            <p className="mt-3 ">
              <ul className="list-disc mt-4 fs-4 text-left px-10">
                <li>Sign up and create a donor profile.</li>
                <li>Find nearby donation centers or recipients in need.</li>
                <li>Schedule a donation and save lives.</li>
              </ul>
              <ul className="list-disc mt-4 fs-4 text-left px-10">
                <li>Sign up and create a donor profile.</li>
                <li>Find nearby donation centers or recipients in need.</li>
                <li>Schedule a donation and save lives.</li>
              </ul>
            </p>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 d-flex flex-column gap-4">
            <div
              className="position-relative w-100 "
              style={{ maxWidth: "32rem" }}
            >
            <div
              className="position-relative w-100 "
              style={{ maxWidth: "32rem" }}
            >
              <img
                src="https://rumsan.nyc3.cdn.digitaloceanspaces.com/hamro-lifebank/website/images/whyhlb_image.png"
                alt="blood"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/*SERVICES */}
      <h3 className="text-center fs-1 fw-bolder">SERVICES</h3>
      <div className="container my-4">
        <div className="row g-3">
          {" "}
          {/* g-3 adds space between columns */}
          <div className="col-md-6">
            <div className="card " >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="logo1.jpg"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Blood Storage</h5>
                    <p className="card-text">
                      We store the safest blood of all kind of blood groups
                      which you can use for any kind of treatments or in an
                      emergency.
                    </p>
                    <div>
                      <button type="button" className="btn btn-danger">
                        Enquire now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card" >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="logo1.jpg"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Blood Bank Locator</h5>
                    <p className="card-text">
                      With the helps of google map users find nearby blood banks
                      and donation centers with real-time availability and
                      contact details.
                    </p>
                    <div>
                      <button type="button" className="btn btn-danger">
                        Enquire now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-4">
        <div className="row g-3">
          {" "}
          {/* g-3 adds space between columns */}
          <div className="col-md-6">
            <div className="card" >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="logo1.jpg"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Donor Registration</h5>
                    <p className="card-text">
                      The process of enrolling blood donors, tracking donation
                      history, ensuring timely reminder and notifications.
                    </p>
                    <div>
                      <button type="button" className="btn btn-danger">
                        Enquire now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card " >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="logo1.jpg"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Blood Donation</h5>
                    <p className="card-text">
                      Donation of blood is a selfless service that we do for
                      mankind! We allow you to save alife by donating blood to
                      the ones who nedd it.
                    </p>
                    <div>
                      <button type="button" className="btn btn-danger">
                        Enquire now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
