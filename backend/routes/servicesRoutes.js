// backend/routes/servicesRoutes.js
const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // Path ke model yang benar

// GET: Ambil semua layanan aktif (untuk publik)
router.get('/', async (req, res) => {
  try {
    console.log('Fetching active services...');
    
    const services = await Service.findAll({
      where: { isActive: true },
      order: [['createdAt', 'ASC']],
      attributes: [
        'id', 'title', 'description', 'icon', 'category', 
        'price', 'duration', 'color', 'isActive', 'createdAt', 'updatedAt'
      ]
    });
    
    console.log(`Found ${services.length} active services`);
    
    // Log first service for debugging
    if (services.length > 0) {
      console.log('First service:', services[0].toJSON());
    }
    
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ 
      message: 'Gagal mengambil data layanan.',
      error: err.message 
    });
  }
});

// GET: Ambil layanan berdasarkan ID (untuk detail)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findOne({
      where: { 
        id: id,
        isActive: true 
      }
    });
    
    if (!service) {
      return res.status(404).json({ message: 'Layanan tidak ditemukan' });
    }
    
    res.json(service);
  } catch (err) {
    console.error('Error fetching service by ID:', err);
    res.status(500).json({ 
      message: 'Gagal mengambil detail layanan.',
      error: err.message 
    });
  }
});

// GET: Ambil layanan berdasarkan kategori
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.findAll({
      where: { 
        category: category,
        isActive: true 
      },
      order: [['createdAt', 'ASC']]
    });
    
    res.json(services);
  } catch (err) {
    console.error('Error fetching services by category:', err);
    res.status(500).json({ 
      message: 'Gagal mengambil layanan berdasarkan kategori.',
      error: err.message 
    });
  }
});

module.exports = router;