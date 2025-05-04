import React, { useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminTimeout from './AdminTimeout';

const AdminNotification = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
  });
  const [status, setStatus] = useState('');

  const sendNotification = async (e) => {
    e.preventDefault();
    const { title, date, time, location } = formData;
    const message = `📢 Upcoming Event: ${title} on ${date} at ${time}, Location: ${location}`;

    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        'http://localhost:5000/api/notifications/send',
        { message },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        }
      );
      setStatus('✅ Notification sent!');
      setFormData({ title: '', date: '', time: '', location: '' });
    } catch (error) {
      console.error('Failed to send notification:', error);
      setStatus('❌ Failed to send notification.');
    }

    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="container-fluid">
      <AdminTimeout/>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-light min-vh-100 p-0">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h2 className="mb-4">Send Event Notification</h2>
          <div className="card shadow-sm">
            <div className="card-header bg-danger text-white">
              <strong>Send Event Notification</strong>
            </div>
            <div className="card-body">
              {status && (
                <div
                  className={`alert ${
                    status.includes('✅') ? 'alert-success' : 'alert-danger'
                  }`}
                >
                  {status}
                </div>
              )}
              <form onSubmit={sendNotification}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Event Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label fw-bold">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label fw-bold">Time</label>
                    <input
                      type="time"
                      name="time"
                      className="form-control"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger">
                  <Send className="me-2" size={16} /> Send Notification
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
