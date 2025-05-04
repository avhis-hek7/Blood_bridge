import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminTimeout = ({ timeout = 10* 60 * 1000 }) => { // Default timeout: 15 minutes
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // Show session expired message
      setSessionExpired(true);

      setTimeout(() => {
        // After showing message for 2 seconds, clear auth and navigate
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAdmin");
        navigate("/admin-login");
      }, 2000);
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer(); // Initialize timer

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      {sessionExpired && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ff4d4f',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 9999,
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          ⚠️ Session expired due to inactivity. Redirecting to admin login...
        </div>
      )}
    </>
  );
};

export default AdminTimeout;
