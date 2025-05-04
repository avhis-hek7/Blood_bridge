// middleware/fetchNotification.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Susanisagood$";

const fetchNotification = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied. No token.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // assuming token structure is { user: { id: ... } }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = fetchNotification;
