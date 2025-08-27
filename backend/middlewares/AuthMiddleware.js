const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['x-admin-token'];
  if (!token) return res.status(401).json({ message: 'Akses ditolak' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rahasia-super');
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token tidak valid' });
  }
};