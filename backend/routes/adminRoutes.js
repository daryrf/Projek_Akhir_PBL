// backend/routes/adminRoutes.js
const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User'); // Tambahkan model User
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  const auth = req.headers['x-admin-token'];
  if (auth === 'admin123') next();
  else res.status(401).json({ message: 'Akses ditolak' });
};

// =================== MESSAGES ROUTES ===================
router.get('/messages', isAuthenticated, async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(messages);
  } catch (err) {
    console.error('Get messages error:', err);
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
    console.error('Delete message error:', err);
    res.status(500).json({ message: 'Gagal hapus pesan' });
  }
});

// POST - Tambah pesan baru
router.post('/messages', isAuthenticated, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = await Message.create({ name, email, message });
    res.json(newMessage);
  } catch (err) {
    console.error('Create message error:', err);
    res.status(500).json({ message: 'Gagal tambah pesan' });
  }
});

// PUT - Update pesan
router.put('/messages/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;
    
    const msg = await Message.findByPk(id);
    if (!msg) return res.status(404).json({ message: 'Pesan tidak ditemukan' });
    
    await msg.update({ name, email, message });
    res.json(msg);
  } catch (err) {
    console.error('Update message error:', err);
    res.status(500).json({ message: 'Gagal update pesan' });
  }
});

// =================== USERS ROUTES ===================

// GET - Ambil semua users
router.get('/users', isAuthenticated, async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password'] }, // Jangan kirim password
    });
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Gagal ambil data users' });
  }
});

// GET - Ambil user berdasarkan ID
router.get('/users/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, // Jangan kirim password
    });
    
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    
    res.json(user);
  } catch (err) {
    console.error('Get user by ID error:', err);
    res.status(500).json({ message: 'Gagal ambil data user' });
  }
});

// POST - Tambah user baru
router.post('/users', isAuthenticated, async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    
    // Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
    }

    // Cek apakah email sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Buat user baru
    const newUser = await User.create({ 
      name, 
      email, 
      password, // Pastikan password di-hash di model atau middleware
      role 
    });

    // Response tanpa password menggunakan method toSafeJSON
    res.json(newUser.toSafeJSON());
  } catch (err) {
    console.error('Create user error:', err);
    
    // Handle Sequelize validation errors
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Data tidak valid', 
        errors: err.errors.map(e => e.message) 
      });
    }
    
    res.status(500).json({ message: 'Gagal tambah user' });
  }
});

// PUT - Update user
router.put('/users/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    
    // Cek apakah email baru sudah digunakan user lain
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ 
        where: { 
          email,
          id: { [require('sequelize').Op.ne]: id } // Exclude current user
        } 
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Email sudah digunakan user lain' });
      }
    }
    
    // Update user (tidak termasuk password untuk keamanan)
    await user.update({ 
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role })
    });
    
    // Response tanpa password menggunakan method toSafeJSON
    res.json(user.toSafeJSON());
  } catch (err) {
    console.error('Update user error:', err);
    
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Data tidak valid', 
        errors: err.errors.map(e => e.message) 
      });
    }
    
    res.status(500).json({ message: 'Gagal update user' });
  }
});

// DELETE - Hapus user
router.delete('/users/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    
    // Proteksi: tidak bisa hapus admin
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Tidak dapat menghapus admin' });
    }
    
    await user.destroy();
    res.json({ message: 'User berhasil dihapus' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ message: 'Gagal hapus user' });
  }
});

// PUT - Update password user (endpoint terpisah untuk keamanan)
router.put('/users/:id/password', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password baru minimal 6 karakter' });
    }
    
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    
    await user.update({ password: newPassword }); // Pastikan di-hash di model
    
    res.json({ message: 'Password berhasil diubah' });
  } catch (err) {
    console.error('Update password error:', err);
    res.status(500).json({ message: 'Gagal ubah password' });
  }
});

// GET - Statistik users (bonus)
router.get('/users/stats/summary', isAuthenticated, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalAdmins = await User.count({ where: { role: 'admin' } });
    const totalRegularUsers = await User.count({ where: { role: 'user' } });
    
    res.json({
      total: totalUsers,
      admins: totalAdmins,
      users: totalRegularUsers
    });
  } catch (err) {
    console.error('Get user stats error:', err);
    res.status(500).json({ message: 'Gagal ambil statistik users' });
  }
});

module.exports = router;