// backend/app.js
const express = require('express');
const cors = require('cors');
const Message = require('./models/Message');
const Service = require('./models/Service');

const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ ROUTES - Hanya admin dan public services
app.use('/api/admin', require('./routes/adminRoutes')); // Admin routes (protected)
app.use('/api/auth', require('./routes/authRoutes'));   // Auth routes (hanya untuk admin)

// ✅ PUBLIC SERVICES ROUTE - Endpoint untuk frontend ServicesPage
app.get('/api/services', async (req, res) => {
  try {
    console.log("📡 Request ke /api/services diterima");
    
    // Ambil semua services yang aktif
    const services = await Service.getActiveServices();
    
    console.log(`✅ Berhasil mengambil ${services.length} services aktif`);
    
    // Return services dengan format yang dibutuhkan frontend
    const formattedServices = services.map(service => ({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon,
      category: service.category,
      price: service.price,
      duration: service.duration,
      color: service.color,
      isActive: service.isActive,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt
    }));
    
    res.json(formattedServices);
    
  } catch (error) {
    console.error("❌ Error mengambil services:", error);
    res.status(500).json({ 
      message: "Gagal mengambil data layanan",
      error: error.message 
    });
  }
});

// Route untuk form kontak
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Nama, email, dan pesan wajib diisi.' });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'Tanpa subjek',
      message,
    });

    console.log("📩 Pesan disimpan ke DB:", newMessage.toJSON());
    res.status(201).json({ message: "Pesan berhasil dikirim!" });

  } catch (err) {
    console.error("❌ Gagal simpan ke DB:", err);
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Gagal menyimpan pesan. Coba lagi." });
  }
});

// ✅ Route test
app.get('/', (req, res) => {
  res.send('🚀 Backend Creative Agency siap menerima pesan!');
});

// ✅ Sync database dan create sample data
sequelize.sync({ force: false })
  .then(async () => {
    console.log('✅ Semua tabel siap!');
    
    // ✅ Create sample services jika belum ada data
    const serviceCount = await Service.count();
    if (serviceCount === 0) {
      console.log('📝 Membuat sample services...');
      
      const sampleServices = [
        {
          title: 'Brand Identity',
          description: 'Complete brand development including logo design, visual identity, and brand guidelines that make your business memorable.',
          icon: '🎨',
          category: 'Design',
          price: 5000000,
          duration: 14,
          color: 'from-pink-500 to-rose-600',
          isActive: true
        },
        {
          title: 'Web Development',
          description: 'Custom websites and web applications built with cutting-edge technology for optimal performance and user experience.',
          icon: '💻',
          category: 'Development',
          price: 15000000,
          duration: 30,
          color: 'from-indigo-500 to-purple-600',
          isActive: true
        },
        {
          title: 'Mobile Apps',
          description: 'Native and cross-platform mobile applications that deliver seamless user experiences across all devices.',
          icon: '📱',
          category: 'Development',
          price: 20000000,
          duration: 45,
          color: 'from-blue-500 to-cyan-500',
          isActive: true
        },
        {
          title: 'Digital Marketing',
          description: 'Strategic digital marketing campaigns that increase visibility, engage audiences, and drive conversions.',
          icon: '📈',
          category: 'Marketing',
          price: 8000000,
          duration: 30,
          color: 'from-emerald-500 to-teal-600',
          isActive: true
        },
        {
          title: 'Video Production',
          description: 'Professional video content creation from concept to final cut, including motion graphics and animations.',
          icon: '🎬',
          category: 'Production',
          price: 12000000,
          duration: 21,
          color: 'from-amber-500 to-orange-600',
          isActive: true
        },
        {
          title: 'Analytics & SEO',
          description: 'Data-driven insights and search engine optimization to maximize your digital presence and ROI.',
          icon: '📊',
          category: 'Marketing',
          price: 6000000,
          duration: 14,
          color: 'from-violet-500 to-fuchsia-600',
          isActive: true
        }
      ];
      
      try {
        await Service.bulkCreate(sampleServices);
        console.log('✅ Sample services berhasil dibuat!');
      } catch (error) {
        console.error('❌ Gagal membuat sample services:', error);
      }
    }
  })
  .catch(err => console.log('❌ Gagal sync:', err));

// ✅ JALANKAN SERVER DI AKHIR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
  console.log(`📡 Public API: http://localhost:${PORT}/api/services`);
  console.log(`🔐 Admin API: http://localhost:${PORT}/api/admin`);
});