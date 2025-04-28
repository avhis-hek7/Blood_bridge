import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

// Importing icons
import { FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaUserTie, FaClock, FaHourglassHalf } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [participation, setParticipation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [authToken] = useState(localStorage.getItem('authToken'));
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [nextEligibleDate, setNextEligibleDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    } else {
      fetchUserData();
    }
  }, [authToken, navigate]);

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.post(
        'http://localhost:5000/api/auth/getuser',
        {},
        { headers: { 'auth-token': authToken } }
      );
      const userData = userResponse.data;
      setUser(userData);

      const participationResponse = await axios.post(
        'http://localhost:5000/api/participation/check-participants',
        { email: userData.email }
      );
      const participationData = participationResponse.data;
      setParticipation(participationData);

      if (participationData?.participatedAt) {
        const lastDonationDate = new Date(participationData.participatedAt);
        const eligibleDate = new Date(lastDonationDate);
        eligibleDate.setDate(eligibleDate.getDate() + 90); // 90 days waiting period
        setNextEligibleDate(eligibleDate);

        // Start countdown
        startCountdown(eligibleDate);
      }

    } catch (err) {
      console.error('Error fetching user or participation data:', err);
      setStatusMessage('❌ Unable to load profile data.');
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = (eligibleDate) => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eligibleDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeRemaining('✅ You are now eligible to participate again!');
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
      <div className="row">
        <div className="col-12">
          <h2 className="profile-heading">My Profile</h2>
          {statusMessage && <div className="alert alert-info">{statusMessage}</div>}

          <div className="card profile-card mb-4">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">
                <FaEnvelope className="me-2 text-primary" />
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>

          {participation?.hasParticipated ? (
            event ? (
              <div className="mt-4">
                <h4 className="section-heading">Event Participation</h4>
                <div className="card profile-card mb-5">
                  <div className="card-body">
                    <h5 className="card-title">{event.title || 'Untitled Event'}</h5>
                    <p className="card-text">
                      <FaCalendarAlt className="me-2 text-success" />
                      <strong>Event Date:</strong> {event.date ? new Date(event.date).toLocaleString() : 'N/A'}
                    </p>
                    <p className="card-text">
                      <FaMapMarkerAlt className="me-2 text-danger" />
                      <strong>Location:</strong> {event.location || 'N/A'}
                    </p>
                    <p className="card-text">
                      <FaUserTie className="me-2 text-warning" />
                      <strong>Organizer:</strong> {event.organizer || 'N/A'}
                    </p>
                    <p className="card-text">
                      <FaClock className="me-2 text-secondary" />
                      <strong>Last Donation:</strong> {participation.participatedAt ? new Date(participation.participatedAt).toLocaleString() : 'N/A'}
                    </p>

                    {/* Countdown Section */}
                    {nextEligibleDate && (
                      <>
                        <p className="card-text">
                          <FaHourglassHalf className="me-2 text-info" />
                          <strong>Next Eligible Date:</strong> {new Date(nextEligibleDate).toLocaleString()}
                        </p>
                        <p className="card-text text-danger fw-bold">
                          ⏳ {timeRemaining}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-warning profile-alert mt-4 mb-5">
                Event details are currently unavailable. Please try again later.
              </div>
            )
          ) : (
            <div className="alert alert-warning profile-alert mt-4 mb-5">
              You have not participated in any events yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
