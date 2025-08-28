const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Cek user sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Buat user baru
    const user = await User.create({ name, email, password }); // Nanti dienkripsi
    res.status(201).json({ message: 'Registrasi berhasil!', user: { id: user.id, name, email } });
  } catch (err) {
    res.status(500).json({ message: 'Gagal registrasi' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Untuk sekarang: password plain text
    // Nanti ganti pakai bcrypt
    if (user.password !== password) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }2

    // ✅ Kirim role ke frontend
    res.json({
      message: 'Login berhasil!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, 
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Gagal login' });
  }
});

module.exports = router;