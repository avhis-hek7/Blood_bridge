import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserTimeout = ({ timeout = 5* 60 * 1000 }) => { // Timeout in milliseconds (default: 15 minute)
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const handleActivity = () => {
      clearTimeout(window.idleTimer);
      window.idleTimer = setTimeout(triggerSessionExpiry, timeout);
    };

    const triggerSessionExpiry = () => {
      setSessionExpired(true);

      // Give user a moment to read the message (like 2 seconds)
      setTimeout(() => {
        logout();
      }, 2000);
    };

    const logout = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAdmin');
      navigate('/');
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    window.idleTimer = setTimeout(triggerSessionExpiry, timeout);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearTimeout(window.idleTimer);
    };
  }, [navigate, timeout]);

  return (
    <>
      {sessionExpired && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ffc107',
          color: '#000',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 9999,
          fontWeight: 'bold'
        }}>
          ⚠️ Your session expired due to inactivity. Redirecting to home...
        </div>
      )}
    </>
  );
};

export default UserTimeout;
