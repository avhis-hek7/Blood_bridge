import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Events.css';
import UserTimeout from './UserTimeout'; 

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [eligibilityMessage, setEligibilityMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [hasParticipated, setHasParticipated] = useState(false);
  const [participatedEvent, setParticipatedEvent] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [healthStatus, setHealthStatus] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [authToken]);

  useEffect(() => {
    if (participatedEvent) {
      const eventDate = new Date(participatedEvent.date);
      const now = new Date();
      if (eventDate.getTime() + 24*60* 60 * 1000 < now.getTime()) {
        // Event expired, reset participation
        setHasParticipated(false);
        setParticipatedEvent(null);
      }
    }
  }, [participatedEvent]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/authevent');
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkLoginStatus = async () => {
    if (authToken) {
      setIsLoggedIn(true);
      await fetchUserAndParticipation(authToken);
    } else {
      setIsLoggedIn(false);
      resetUserData();
    }
  };

  const resetUserData = () => {
    setUser(null);
    setHasParticipated(false);
    setParticipatedEvent(null);
  };

  const fetchUserAndParticipation = async (token) => {
    try {
      const userResponse = await axios.post(
        'http://localhost:5000/api/auth/getuser',
        {},
        { headers: { 'auth-token': token } }
      );
      const userData = userResponse.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      const participationResponse = await axios.post(
        'http://localhost:5000/api/participation/check-participants',
        { email: userData.email }
      );

      const { hasParticipated, event } = participationResponse.data;
      setHasParticipated(hasParticipated);
      if (event) {
        setParticipatedEvent(event);
        setStatusMessage(`Welcome back, ${userData.name}! You have already participated in an event.`);
        setTimeout(() => setStatusMessage(''), 5000);
      }
    } catch (err) {
      console.error('Error fetching user or participation info:', err);
      resetUserData();
    }
  };

  const handleParticipateClick = (eventData) => {
    if (!authToken) {
      setStatusMessage('❌ Please log in to participate.');
      hideStatusAfterDelay();
      return;
    }
    if (hasParticipated) {
      setStatusMessage('⛔ You have already participated in an event.');
      hideStatusAfterDelay();
      return;
    }
    setSelectedEvent(eventData);
    setEligibilityMessage('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (age <= 0 || weight <= 0) {
      setEligibilityMessage('❌ Age and weight must be positive numbers.');
      return;
    }
    if (age < 18) {
      setEligibilityMessage('❌ Age must be at least 18 to participate.');
      return;
    }
    if (weight < 45) {
      setEligibilityMessage('❌ Weight must be at least 45kg to participate.');
      return;
    }
    if (!lastDonationDate) {
      setEligibilityMessage('❌ Please provide your last donation date.');
      return;
    }
    if (!healthStatus) {
      setEligibilityMessage('❌ Please select your health status.');
      return;
    }
  
    const lastDate = new Date(lastDonationDate);
    const today = new Date();
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays < 90) {
      setEligibilityMessage('❌ Minimum 3 months gap required since last donation.');
      return;
    }
  
    if (healthStatus !== 'Medically Fit') {
      setEligibilityMessage('❌ You must be medically fit to participate.');
      return;
    }
  
    // ✅ Save eligibility data to localStorage
    const eligibilityData = {
      age,
      weight,
      lastDonationDate,
      healthStatus,
    };
    localStorage.setItem('eligibility', JSON.stringify(eligibilityData));
    console.log('✅ Eligibility data saved to localStorage:', eligibilityData);
  
    try {
      await axios.post('http://localhost:5000/api/participation', {
        user,
        event: selectedEvent,
      });
  
      setEligibilityMessage('✅ Participation recorded successfully!');
      setHasParticipated(true);
      setParticipatedEvent(selectedEvent);
      setTimeout(() => {
        setSelectedEvent(null);
        setEligibilityMessage('');
      }, 2000);
    } catch (err) {
      console.error('Error recording participation:', err);
      setEligibilityMessage('❌ Something went wrong. Please try again.');
    }
  };
  

  const hideStatusAfterDelay = () => {
    setTimeout(() => {
      setStatusMessage('');
    }, 3000);
  };

  const handleAuthToggle = () => {
    if (isLoggedIn) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setAuthToken(null);
      resetUserData();
      setIsLoggedIn(false);
      setStatusMessage('✅ Logged out successfully.');
      setTimeout(() => window.location.reload(), 500);
    } else {
      window.location.href = '/';
    }
  };


  return (
    <div className="container mt-4">
      <UserTimeout/>
      <div className="d-flex justify-content-between align-items-center mb-4 fade-in">
        <h2 className="slide-in-left">All Events</h2>
        <div className="d-flex gap-2">
          {isLoggedIn && (
            <Link to="/profile" className="btn btn-primary pulse-on-hover">
              👤 Profile
            </Link>
          )}
          <button className="btn btn-secondary pulse-on-hover" onClick={handleAuthToggle}>
            {isLoggedIn ? '🔒 Logout' : '🔓 Login'}
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="alert alert-info fade-in">{statusMessage}</div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="row">
          {events.length === 0 ? (
            <p className="fade-in">No events found.</p>
          ) : (
            events
              .filter(event => {
                const eventDate = new Date(event.date);
                const now = new Date();
                return eventDate.getTime() + 24*60* 60 * 1000 > now.getTime();
              })
              .map((event, index) => {
                const isParticipatedEvent = participatedEvent && participatedEvent._id === event._id;

                return (
                  <div 
                    key={event._id} 
                    className="col-md-6 col-lg-4 mb-4"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`card shadow-sm h-100 event-card ${isParticipatedEvent ? 'border-primary border-3 bg-light' : ''}`}>
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="card-title mb-0">
                            {event.title}
                            {isParticipatedEvent && (
                              <span className="badge bg-primary ms-2 badge-pulse">
                                <i className="bi bi-star-fill me-1"></i>
                                Your Event
                              </span>
                            )}
                          </h5>
                        </div>
                        <h6 className="card-subtitle mb-2 text-muted">
                          <i className="bi bi-calendar-event me-1"></i>
                          {new Date(event.date).toLocaleString()}
                        </h6>
                        <p className="card-text flex-grow-1">{event.description}</p>
                        <div className="text-muted mb-3">
                          <p className="mb-1">
                            <i className="bi bi-geo-alt me-1"></i>
                            <strong>Location:</strong> {event.location}
                          </p>
                          <p className="mb-0">
                            <i className="bi bi-person me-1"></i>
                            <strong>Organizer:</strong> {event.organizer}
                          </p>
                        </div>

                        {hasParticipated ? (
                          isParticipatedEvent ? (
                            <button className="btn btn-success mt-auto" disabled>
                              <i className="bi bi-check-circle me-1"></i>
                              You Participated
                            </button>
                          ) : (
                            <button className="btn btn-secondary mt-auto" disabled>
                              <i className="bi bi-lock me-1"></i>
                              Already Participated
                            </button>
                          )
                        ) : (
                          <button
                            className="btn btn-primary mt-auto hover-grow"
                            onClick={() => handleParticipateClick(event)}
                          >
                            <i className="bi bi-plus-circle me-1"></i>
                            Participate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      )}

      {/* Modal */}
      {selectedEvent && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5 className="modal-title mb-3">Eligibility Check for {selectedEvent.title}</h5>
              
              {eligibilityMessage && (
                <div className={`alert ${eligibilityMessage.startsWith('✅') ? 'alert-success' : 'alert-danger'} text-center`} role="alert">
                  {eligibilityMessage}
                </div>
              )}

<form onSubmit={handleFormSubmit}>
  <div className="mb-3">
    <label className="form-label">Age</label>
    <input
      type="number"
      className="form-control"
      value={age}
      min="0"
      onChange={(e) => setAge(e.target.value)}
      required
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Weight (kg)</label>
    <input
      type="number"
      className="form-control"
      value={weight}
      min="0"
      onChange={(e) => setWeight(e.target.value)}
      required
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Last Donation Date</label>
    <input
      type="date"
      className="form-control"
      value={lastDonationDate}
      onChange={(e) => setLastDonationDate(e.target.value)}
      required
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Health Status</label>
    <div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="healthStatus"
          value="Medically Fit"
          checked={healthStatus === 'Medically Fit'}
          onChange={(e) => setHealthStatus(e.target.value)}
          required
        />
        <label className="form-check-label">Medically Fit</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="healthStatus"
          value="Under Treatment"
          checked={healthStatus === 'Under Treatment'}
          onChange={(e) => setHealthStatus(e.target.value)}
        />
        <label className="form-check-label">Under Treatment</label>
      </div>
    </div>
  </div>

  <div className="d-flex justify-content-between">
    <button type="submit" className="btn btn-success">
      Submit
    </button>
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => setSelectedEvent(null)}
    >
      Cancel
    </button>
  </div>
</form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
