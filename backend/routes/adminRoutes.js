// backend/routes/adminRoutes.js
const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  const auth = req.headers['x-admin-token'];
  if (auth === 'admin123') next();
  else res.status(401).json({ message: 'Akses ditolak' });
};

router.get('/messages', isAuthenticated, async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil data' });
  }
});

router.delete('/messages/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);
    if (!message) return res.status(404).json({ message: 'Pesan tidak ditemukan' });
    await message.destroy();
    res.json({ message: 'Pesan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus pesan' });
  }
});

module.exports = router;