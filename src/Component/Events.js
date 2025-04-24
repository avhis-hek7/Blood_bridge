import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch events on mount
  useEffect(() => {
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

    fetchEvents();
  }, []);

  // Set login status on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  // Session timeout after 5 minutes
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.removeItem('authToken');
      alert('⚠️ Session expired. Redirecting to home...');
      window.location.href = '/';
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(timeout);
  }, []);

  const handleParticipate = async (eventData) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setStatusMessage('❌ Please log in to participate.');
      hideStatusAfterDelay();
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/getuser',
        {},
        {
          headers: {
            'auth-token': token,
          },
        }
      );

      const user = res.data;

      if (user && user.name) {
        // Send user + event info to backend
        await axios.post('http://localhost:5000/api/authevent/participation', {
          user,
          event: eventData,
        });

        setStatusMessage(`✅ Participation recorded. Thank you, ${user.name}!`);
      } else {
        setStatusMessage('❌ Invalid user session.');
      }
    } catch (err) {
      console.error('Error verifying or recording participation:', err);
      setStatusMessage('❌ Authentication failed. Please log in again.');
    }

    hideStatusAfterDelay();
  };

  const hideStatusAfterDelay = () => {
    setTimeout(() => {
      setStatusMessage('');
    }, 3000);
  };

  const handleAuthToggle = () => {
    if (isLoggedIn) {
      localStorage.removeItem('authToken');
      setStatusMessage('✅ Logged out successfully.');
      setIsLoggedIn(false);
      setTimeout(() => {
        window.location.href = '/';
      }, 5*60*1000);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Events</h2>
        <button className="btn btn-secondary" onClick={handleAuthToggle}>
          {isLoggedIn ? '🔒 Logout' : '🔓 Login'}
        </button>
      </div>

      {statusMessage && (
        <div className="alert alert-info">{statusMessage}</div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="row">
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            events.map((event) => (
              <div key={event._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{event.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {new Date(event.date).toLocaleString()}
                    </h6>
                    <p className="card-text">{event.description}</p>
                    <p className="text-muted mb-2">
                      <strong>Location:</strong> {event.location}<br />
                      <strong>Organizer:</strong> {event.organizer}
                    </p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => handleParticipate(event)}
                    >
                      Participate
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
