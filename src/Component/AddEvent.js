import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    organizer: ''
  });

  const [status, setStatus] = useState('');
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/participation'); // 👈 Correct route
        console.log('Participation response:', res.data);
        setParticipations(res.data.data); // 👈 Updated to access the `data` array
      } catch (err) {
        console.error('Error fetching participations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipations();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setStatus('❌ Auth token not found. Please log in as admin.');
        return;
      }

      await axios.post('http://localhost:5000/api/authevent', formData, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });

      setStatus('✅ Event created successfully!');
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        organizer: ''
      });
    } catch (err) {
      console.error('Event creation error:', err);
      setStatus('❌ ' + (err.response?.data?.message || 'Failed to create event.'));
    }

    hideStatusAfterDelay();
  };

  const hideStatusAfterDelay = () => {
    setTimeout(() => {
      setStatus('');
    }, 3000);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Create New Event</h2>

      {status && (
        <div className="alert alert-info mb-3" role="alert">
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light mb-5">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Organizer</label>
          <input
            type="text"
            className="form-control"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>

      <h2 className="mb-4">Participant Information</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : participations.length === 0 ? (
        <p>No participations yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Event Title</th>
                <th>Event Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {participations.map((p, index) => (
                <tr key={p._id || index}>
                  <td>{index + 1}</td>
                  <td>{p.user.name}</td>
                  <td>{p.user.email}</td>
                  <td>{p.event.title}</td>
                  <td>{new Date(p.event.date).toLocaleString()}</td>
                  <td>{p.event.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
