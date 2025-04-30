import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserTie,
  FaClock,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import UserTimeout from "./UserTimeout";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [participation, setParticipation] = useState(null);
  const [participationHistory, setParticipationHistory] = useState([]); // New
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [authToken] = useState(localStorage.getItem("authToken"));
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [nextEligibleDate, setNextEligibleDate] = useState(null);
  const [eligibilityData, setEligibilityData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    } else {
      fetchUserData();
    }
  }, [authToken, navigate]);

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.post(
        "http://localhost:5000/api/auth/getuser",
        {},
        { headers: { "auth-token": authToken } }
      );
      const userData = userResponse.data;
      setUser(userData);

      // Fetch current participation
      const participationResponse = await axios.post(
        "http://localhost:5000/api/participation/check-participants",
        { email: userData.email }
      );
      setParticipation(participationResponse.data);

      // Fetch participation history
      const historyResponse = await axios.post(
        "http://localhost:5000/api/participation/get-all-participations",
        { email: userData.email },
        { headers: { "auth-token": authToken } }
      );
      setParticipationHistory(
        historyResponse.data.sort(
          (a, b) => new Date(b.participatedAt) - new Date(a.participatedAt)
        )
      );

      // Setup next eligible date if applicable
      if (participationResponse.data?.participatedAt) {
        const lastDonationDate = new Date(
          participationResponse.data.participatedAt
        );
        const eligibleDate = new Date(lastDonationDate);
        eligibleDate.setDate(eligibleDate.getDate() + 90);
        setNextEligibleDate(eligibleDate);
        startCountdown(eligibleDate);
      }
    } catch (err) {
      console.error("Error fetching user or participation data:", err);
      // setStatusMessage("❌ Unable to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    } else {
      fetchUserData();
    }

    const eligibility = localStorage.getItem("eligibility");
    if (eligibility) {
      try {
        setEligibilityData(JSON.parse(eligibility));
      } catch (error) {
        console.error("Invalid eligibility data in localStorage");
      }
    }
  }, [authToken, navigate]);

  const startCountdown = (eligibleDate) => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eligibleDate - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeRemaining("✅ You are now eligible to participate again!");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="text-center profile-loading">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="alert alert-danger profile-alert">
        ❌ User data not found. Please log in again.
      </div>
    );
  }

  const event = participation?.event;

  return (
    <div className="container mt-5 profile-container animate-fade-slide">
      <UserTimeout />
      <div className="row">
        <div className="col-12">
          <h2 className="profile-heading">My Profile</h2>
          {statusMessage && (
            <div className="alert alert-info">{statusMessage}</div>
          )}

          <div className="card profile-card mb-4">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">
                <FaEnvelope className="me-2 text-primary" />
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>

          {eligibilityData && (
            <div className="card profile-card mb-4">
              <div className="card-body">
                <h5 className="card-title">Eligibility Info</h5>
                <p className="card-text">
                  <strong>Age:</strong> {eligibilityData.age}
                </p>
                <p className="card-text">
                  <strong>Weight:</strong> {eligibilityData.weight} kg
                </p>
                <p className="card-text">
                  <strong>Last Donation Date:</strong>{" "}
                  {new Date(
                    eligibilityData.lastDonationDate
                  ).toLocaleDateString()}
                </p>
                <p className="card-text">
                  <strong>Health Status:</strong> {eligibilityData.healthStatus}
                </p>
              </div>
            </div>
          )}
          {/* Latest Participation */}
          
          {/* Current Event Participation */}
{participation?.hasParticipated && event ? (
  <div className="mt-4">
    <h4 className="section-heading">Current Event Participation</h4>
    <div
      className={`card profile-card mb-4 ${
        new Date(event.date).getTime() >= Date.now()
          ? "border-success"
          : "border-secondary"
      }`}
    >
      <div className="card-body">
        <h5 className="card-title">{event.title || "Untitled Event"}</h5>
        <p className="card-text">
          <FaCalendarAlt className="me-2 text-success" />
          <strong>Event Date:</strong>{" "}
          {event.date ? new Date(event.date).toLocaleString() : "N/A"}
        </p>
        <p className="card-text">
          <FaMapMarkerAlt className="me-2 text-danger" />
          <strong>Location:</strong> {event.location || "N/A"}
        </p>
        <p className="card-text">
          <FaUserTie className="me-2 text-warning" />
          <strong>Organizer:</strong> {event.organizer || "N/A"}
        </p>
        <p className="card-text">
          <FaClock className="me-2 text-secondary" />
          <strong>Last Donation:</strong>{" "}
          {participation.participatedAt
            ? new Date(participation.participatedAt).toLocaleString()
            : "N/A"}
        </p>

        {/* Countdown and Eligibility */}
        {nextEligibleDate && (
          <>
            <p className="card-text">
              <FaHourglassHalf className="me-2 text-info" />
              <strong>Next Eligible Date:</strong>{" "}
              {new Date(nextEligibleDate).toLocaleString()}
            </p>
            <p className="card-text text-danger fw-bold">⏳ {timeRemaining}</p>
          </>
        )}

        <p
          className={`card-text fw-bold mt-3 ${
            new Date(event.date).getTime() >= Date.now()
              ? "text-success"
              : "text-muted"
          }`}
        >
          {new Date(event.date).getTime() >= Date.now() ? (
            <>
              <FaCheckCircle className="me-1" /> Upcoming Event
            </>
          ) : (
            <>
              <FaTimesCircle className="me-1" /> Event Completed
            </>
          )}
        </p>
      </div>
    </div>
  </div>
) : (
  <div className="alert alert-warning profile-alert mt-4 mb-4">
    You have not participated in any upcoming events.
  </div>
)}


          {/* Participation History Section */}
          <div className="mt-5">
            <h4 className="section-heading">Participation History</h4>
            {participationHistory.length === 0 ? (
              <div className="alert alert-info profile-alert">
                No participation history yet.
              </div>
            ) : (
              participationHistory.map((record, index) => {
                const isActive = new Date(record.event.date) > new Date();
                return (
                  <div
                    key={index}
                    className={`card profile-card mb-3 ${
                      isActive ? "border-success" : "border-secondary"
                    }`}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{record.event.title}</h5>
                      <p className="card-text">
                        <FaCalendarAlt className="me-2" />
                        <strong>Event Date:</strong>{" "}
                        {new Date(record.event.date).toLocaleString()}
                      </p>
                      <p className="card-text">
                        <FaMapMarkerAlt className="me-2" />
                        <strong>Location:</strong> {record.event.location}
                      </p>
                      <p className="card-text">
                        <FaClock className="me-2" />
                        <strong>Participated At:</strong>{" "}
                        {new Date(record.participatedAt).toLocaleString()}
                      </p>
                      <p
                        className={`card-text fw-bold ${
                          isActive ? "text-success" : "text-muted"
                        }`}
                      >
                        {isActive ? (
                          <>
                            <FaCheckCircle className="me-1" /> Active Event
                          </>
                        ) : (
                          <>
                            <FaTimesCircle className="me-1" /> Past Event
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
