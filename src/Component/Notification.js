import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell } from 'lucide-react';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get('http://localhost:5000/api/notifications', {
        headers: { 'auth-token': token },
      });
      setNotifications(res.data || []);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, {
        headers: { 'auth-token': token },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, seen: true } : n))
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unseenCount = notifications.filter((n) => !n.seen).length;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Notifications</h2>
        <button className="btn btn-outline-primary position-relative">
          <Bell />
          {unseenCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {unseenCount}
            </span>
          )}
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <strong>Notifications</strong>
        </div>
        <ul className="list-group list-group-flush">
          {loading ? (
            <li className="list-group-item text-center">Loading...</li>
          ) : notifications.length === 0 ? (
            <li className="list-group-item text-center text-muted">
              You have no notifications.
            </li>
          ) : (
            notifications.map((notification) => (
              <li
                key={notification._id}
                className={`list-group-item ${notification.seen ? 'text-muted' : ''}`}
                onClick={() => markAsRead(notification._id)}
                style={{ cursor: 'pointer' }}
              >
                {notification.message}
                <div className="text-end small text-muted">
                  {new Date(notification.timestamp).toLocaleString()}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
