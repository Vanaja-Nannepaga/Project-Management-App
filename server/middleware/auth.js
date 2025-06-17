const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET=pX8kG5nLqWvT3mR2jY9hB4zA0cF7dE1iU6tS2wQ=';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
