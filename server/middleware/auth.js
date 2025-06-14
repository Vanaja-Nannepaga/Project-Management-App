module.exports = (req, res, next) => {
  // For demo, just check for a header or session
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};
