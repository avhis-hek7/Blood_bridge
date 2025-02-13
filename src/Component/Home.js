import React from "react";
export default function Home() {
  return (
    <>
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
                  <button className="btn btn-outline-light fw-bold text-dark c-btn">
                    Log in
                  </button>
                  <button className="btn btn-outline-light fw-bold text-dark c-btn">
                    Sign in
                  </button>
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
                  <button className="btn btn-outline-light fw-bold text-dark c-btn">
                    Log in
                  </button>
                  <button className="btn btn-outline-light fw-bold text-dark c-btn">
                    Sign in
                  </button>
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
                <div className="C-button d-flex gap-3">
                  <button className="btn btn-outline-light fw-bold text-dark c-btn">
                    Log in
                  </button>
                  <button className="btn btn-outline-light fw-bold text-dark c-btn">
                    Sign in
                  </button>
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
              <div className="card">
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
              <div className="card">
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
              <div className="card">
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
              <div className="card ">
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


      <div className="footer">
        <div className="sb_footer section_padding">
          <div className="sb_footer-links">
            <div className="sb_footer-links-div">
              <h4>For Business</h4>
              <a href="/">
                <p>Employee</p>
              </a>
              <a href="/">
                <p>Health plan</p>
              </a>
              <a href="/">
                <p>Indiviual</p>
              </a>
            </div>
            <div className="sb_footer-links-div">
              <h4>Resources</h4>
              <a href="/">
                <p>Resouces center </p>
              </a>
              <a href="/">
                <p>Testimonals</p>
              </a>
              <a href="/">
                <p>STV</p>
              </a>
            </div>
            <div className="sb_footer-links-div">
              <h4>Patners</h4>
              <a href="/">
                <p>Swing Techno</p>
              </a>
            </div>
            <div className="sb_footer-links-div">
              <h4>Company</h4>
              <a href="/">
                <p>About</p>
              </a>
              <a href="/">
                <p>Press</p>
              </a>
              <a href="/">
                <p>Q&A</p>
              </a>
              <a href="/">
                <p>Contact</p>
              </a>
            </div>
            <div className="sb_footer-links-div">
              <h4>Comming Soon</h4>
              <div className="socialmedia">
                <p><img src="whatsapp.png" alt="" /></p>
                <p><img src="twitter1.png" alt="" /></p>
                <p><img src="instagram.png" alt="" /></p>
                <p><img src="facebook.png" alt="" /></p>
                
              </div>
            </div>
          </div>
          <hr/>
          <div className="sb_footer-below">
            <div className="sb_footer-copyright">
              <p>
                @{new Date().getFullYear} Blood Portal. All right reserved
              </p>
            </div>
            <div className="sb_footer-below-links">
              <a href="/"><div><p>Terms & COnditions</p></div></a>
              <a href="/"><div><p>Privacy</p></div></a>
              <a href="/"><div><p>Security</p></div></a>
              <a href="/"><div><p>Cookie Declaration</p></div></a>
            </div>
          </div>
          </div>
          </div>
          
    </>
  );
}
