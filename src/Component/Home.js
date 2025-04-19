import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const stats = [
  { id: "count1", target: 50, label: "Total Donors Registered" },
  { id: "count2", target: 120, label: "Blood Event Organized" },
  { id: "count3", target: 275, label: "Lives saved" },
  { id: "count4", target: 5982, label: "Total blood collected" },
];

const Counter = ({ target, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let countValue = 0;
    let speed = target / 100;
    const interval = setInterval(() => {
      countValue += Math.ceil(speed);
      if (countValue >= target) {
        countValue = target;
        clearInterval(interval);
      }
      setCount(countValue);
    }, 30);
    return () => clearInterval(interval);
  }, [target, isVisible]);

  return <span className="highlight">{count}</span>;
};

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const statsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLoginToggle = () => setShowLogin(!showLogin);
  const toggleAdminLogin = () => setIsAdmin(!isAdmin);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = isAdmin
        ? { username, password} // UPDATED: Send both username and password for admin login
        : { email, password };

        const response = await axios.post(
          `http://localhost:5000/api/auth/${isAdmin ? "admin-login" : "login"}`,
          loginData
        );
      if (response.data.authToken) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("isAdmin", isAdmin.toString());
        alert("Login successful!");
        setShowLogin(false);
        if (isAdmin) {
          navigate("/admin/dashboard"); // Redirect to admin dashboard
        } else {
          navigate("/events"); // Redirect to events page
        }
      }
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      {showLogin && <div className="overlay" onClick={handleLoginToggle}></div>}

      {showLogin && (
        <div className="login-form" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleLogin}>
            <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>
            {isAdmin ? (
              <>
                <input
                  type="text"
                  placeholder="Username"
                  className="input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </>
            )}
            <button type="submit" className="btn btn-danger me-2">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleLoginToggle}
            >
              Close
            </button>
            <p className="mt-2">
              <button
                type="button"
                className="btn btn-link"
                onClick={toggleAdminLogin}
              >
                {isAdmin ? "Login as User" : "Login as Admin"}
              </button>
            </p>
          </form>
        </div>
      )}

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
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center w-100">
                <h1 className="carousel-heading">Welcome to Blood-Bridge</h1>
                <p className="carousel-text">
                  Connecting blood donors with those in need. Every drop counts!
                </p>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-light fw-bold text-dark c-btn"
                    onClick={handleLoginToggle}
                  >
                    Log in
                  </button>
                  <Link
                    type="button"
                    className="btn btn-outline-light fw-bold text-dark c-btn"
                    to="/donate"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
            {/* Slide 2 */}
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="Donor Registration"
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center w-100">
                <h1 className="carousel-heading">
                  Join the Blood Bridge Network
                </h1>
                <p className="carousel-text">
                  A small act of kindness makes a big difference.
                </p>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-light fw-bold text-dark c-btn"
                    onClick={handleLoginToggle}
                  >
                    Log in
                  </button>
                  <Link
                    type="button"
                    className="btn btn-outline-light fw-bold text-dark c-btn"
                    to="/donate"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
            {/* Slide 3 */}
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1606206591513-adbfbdd7a177?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="Blood Donation Camp"
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center w-100">
                <h1 className="carousel-heading">Every Drop Saves a Life</h1>
                <p className="carousel-text">Be a hero. Donate blood today!</p>
                <div className="C-button d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-light fw-bold text-dark c-btn"
                    onClick={handleLoginToggle}
                  >
                    Log in
                  </button>
                  <Link
                    type="button"
                    className="btn btn-outline-light fw-bold text-dark c-btn"
                    to="/donate"
                  >
                    Sign in
                  </Link>
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

      {/* How it works */}
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
      </div>

      {/*SERVICES */}
      <div>
        <h3 className="text-center fs-1 fw-bolder">SERVICES</h3>
        <div className="container my-4">
          <div className="row g-3">
            {" "}
            {/* g-3 adds space between columns */}
            <div className="col-md-6">
              <div className="card hcard">
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
              <div className="card hcard">
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
                        With the helps of google map users find nearby blood
                        banks and donation centers with real-time availability
                        and contact details.
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
              <div className="card hcard">
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
              <div className="card hcard">
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
      {/* Counting cards */}
      <div ref={statsRef} className="container c-container py-5 text-center">
        <h2 className="py-2">Making a Difference, One Drop at a Time</h2>
        <div className="row">
          {stats.map((stat) => (
            <div key={stat.id} className="col-md-4 col-sm-6 mb-4">
              <div className="stat-card p-4 shadow rounded">
                <h3 className="stat-value">
                  <Counter target={stat.target} isVisible={isVisible} />
                </h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
