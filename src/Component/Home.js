import React from "react";

export default function Home() {
  return (
    <>
      {/*Navbar*/}
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          <div className="container-fluid">
            <a className="navbar-brand fs-3 fw-bold" href="#">
              RED LIFE
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
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link mx-2 fs-5 fw-semibold" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-2 fs-5 fw-semibold" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-2 fs-5 fw-semibold" href="#">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-2 fs-5 fw-semibold" href="#">
                    Event
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-2 fs-5 fw-semibold" href="#">
                    Blog
                  </a>
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
                <a href="/register" className="btn btn-danger carousel-btn">
                  Create Profile
                </a>
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
                <a href="/register" className="btn btn-danger carousel-btn">
                  Create Profile
                </a>
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
                <a href="/register" className="btn btn-danger carousel-btn">
                  Create Profile
                </a>
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
    </>
  );
}
