// backend/routes/adminRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const User = require('../models/User');
const Service = require('../models/Service');
const { Op } = require('sequelize');
const router = express.Router();

// ✅ MIDDLEWARE AUTHENTICATION dengan JWT
const isAuthenticated = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization atau x-admin-token
    const token = req.headers.authorization?.replace('Bearer ', '') || 
                 req.headers['x-admin-token'] ||
                 req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token tidak ditemukan. Silakan login.' });
    }
    
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Cari user berdasarkan decoded token
    const user = await User.findByPk(decoded.id);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang diizinkan.' });
    }
    
    // Attach user to request object
    req.user = user;
    next();
    
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token tidak valid' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token sudah expired. Silakan login ulang.' });
    }
    
    return res.status(500).json({ message: 'Error validasi token' });
  }
};

// =================== ADMIN DASHBOARD ===================
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    // Get statistics for dashboard
    const totalMessages = await Message.count();
    const totalServices = await Service.count();
    const activeServices = await Service.count({ where: { isActive: true } });
    
    res.json({
      stats: {
        totalMessages,
        totalServices,
        activeServices,
        inactiveServices: totalServices - activeServices
      },
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Gagal ambil data dashboard' });
  }
});

// =================== MESSAGES ROUTES ===================
router.get('/messages', isAuthenticated, async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(messages);
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ message: 'Gagal ambil data pesan' });
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

// =================== SERVICES ROUTES ===================
router.get('/services', isAuthenticated, async (req, res) => {
  try {
    console.log('Admin: Getting all services...');
    
    const services = await Service.findAll({
      order: [['createdAt', 'DESC']],
    });
    
    console.log('Admin: Services found:', services.length);
    res.json(services);
  } catch (err) {
    console.error('Admin get services error:', err);
    res.status(500).json({ 
      message: 'Gagal ambil data services', 
      error: err.message 
    });
  }
});

router.get('/services/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    
    if (!service) return res.status(404).json({ message: 'Service tidak ditemukan' });
    
    res.json(service);
  } catch (err) {
    console.error('Admin get service by ID error:', err);
    res.status(500).json({ message: 'Gagal ambil data service' });
  }
});

router.post('/services', isAuthenticated, async (req, res) => {
  try {
    console.log('Admin: Creating service with data:', req.body);
    
    const { 
      title, 
      description, 
      icon = '🛠️', 
      category, 
      price = 0, 
      duration = 1, 
      color = 'from-gray-400 to-gray-600', 
      isActive = true 
    } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Judul dan deskripsi wajib diisi' });
    }
    
    const existingService = await Service.findOne({ 
      where: { title: title.trim() } 
    });
    
    if (existingService) {
      return res.status(400).json({ message: 'Judul layanan sudah ada' });
    }
    
    const newService = await Service.create({
      title: title.trim(),
      description: description.trim(),
      icon,
      category,
      price: parseInt(price) || 0,
      duration: parseInt(duration) || 1,
      color,
      isActive: Boolean(isActive)
    });
    
    console.log('Admin: Service created:', newService.toJSON());
    res.status(201).json(newService);
  } catch (err) {
    console.error('Admin create service error:', err);
    
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Data tidak valid', 
        errors: err.errors.map(e => e.message) 
      });
    }
    
    res.status(500).json({ message: 'Gagal tambah service', error: err.message });
  }
});

router.put('/services/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, category, price, duration, color, isActive } = req.body;
    
    console.log('Admin: Updating service ID:', id, 'with data:', req.body);
    
    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ message: 'Service tidak ditemukan' });
    
    if (title && title.trim() !== service.title) {
      const existingService = await Service.findOne({ 
        where: { 
          title: title.trim(),
          id: { [Op.ne]: id }
        } 
      });
      
      if (existingService) {
        return res.status(400).json({ message: 'Judul layanan sudah digunakan service lain' });
      }
    }
    
    const updateData = {};
    if (title !== undefined && title.trim()) updateData.title = title.trim();
    if (description !== undefined && description.trim()) updateData.description = description.trim();
    if (icon !== undefined) updateData.icon = icon;
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = parseInt(price) || 0;
    if (duration !== undefined) updateData.duration = parseInt(duration) || 1;
    if (color !== undefined) updateData.color = color;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    
    await service.update(updateData);
    
    console.log('Admin: Service updated:', service.toJSON());
    res.json(service);
  } catch (err) {
    console.error('Admin update service error:', err);
    
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Data tidak valid', 
        errors: err.errors.map(e => e.message) 
      });
    }
    
    res.status(500).json({ message: 'Gagal update service', error: err.message });
  }
});

router.delete('/services/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Admin: Deleting service ID:', id);
    
    const service = await Service.findByPk(id);
    
    if (!service) return res.status(404).json({ message: 'Service tidak ditemukan' });
    
    await service.destroy();
    
    console.log('Admin: Service deleted successfully');
    res.json({ message: 'Service berhasil dihapus' });
  } catch (err) {
    console.error('Admin delete service error:', err);
    res.status(500).json({ message: 'Gagal hapus service', error: err.message });
  }
});

module.exports = router;