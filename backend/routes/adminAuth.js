// routes/adminAuth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Contoh login admin (ganti dengan DB nanti)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validasi admin
  if (email === 'admin@agency.com' && password === 'bismillah') {
    const token = jwt.sign(
      { id: 1, email, role: 'admin' },
      process.env.JWT_SECRET || 'rahasia-super',
      { expiresIn: '1h' }
    );

    return res.json({
      token,
      user: { id: 1, email, role: 'admin', name: 'Admin' },
    });
  }

  res.status(401).json({ message: 'Email atau password salah' });
});

module.exports = router;