// backend/app.js
const express = require('express');
const cors = require('cors');
const Message = require('./models/Message');
const Service = require('./models/Service');
const Portfolio = require('./models/Portfolio');

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

// ✅ PUBLIC PORTFOLIO ROUTE - Endpoint untuk frontend PortfolioPage
app.get('/api/portfolio', async (req, res) => {
  try {
    console.log("📡 Request ke /api/portfolio diterima");
    
    // Ambil semua portfolio yang aktif
    const portfolios = await Portfolio.findAll({
      where: { is_active: true },
      order: [['created_at', 'DESC']]
    });
    
    console.log(`✅ Berhasil mengambil ${portfolios.length} portfolio aktif`);
    
    // Format data agar sesuai dengan frontend
    const formattedPortfolios = portfolios.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      mainCategory: p.mainCategory, // mapping dari field main_category
      image: p.image || 'Project Image', // fallback jika tidak ada
      description: p.description,
      tags: Array.isArray(p.tags) ? p.tags : [], // pastikan tags array
      duration: p.duration || 'N/A',
      team: p.team || 'N/A',
      details: {
        client: p.client || 'N/A',
        duration: p.duration || 'N/A',
        team: p.team || 'N/A',
        tech: p.tech || 'N/A',
        status: p.status || 'N/A',
        features: Array.isArray(p.features) ? p.features : []
      },
      isActive: p.is_active,
      createdAt: p.created_at,
      updatedAt: p.updated_at
    }));
    
    res.json(formattedPortfolios);
    
  } catch (error) {
    console.error("❌ Error mengambil portfolio:", error);
    res.status(500).json({ 
      message: "Gagal mengambil data portfolio",
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

    // ✅ Create sample portfolios jika belum ada
    const portfolioCount = await Portfolio.count();
    if (portfolioCount === 0) {
      console.log('📝 Membuat sample portfolios...');

      const samplePortfolios = [
        {
          id: 'project1',
          title: 'Grand Luxury Hotel',
          category: 'web branding',
          main_category: 'Web Design',
          image: 'https://via.placeholder.com/400x250?text=Grand+Luxury+Hotel',
          description: 'Complete website redesign for a 5-star luxury hotel chain with booking system integration and multilingual support.',
          tags: ['WordPress', 'Booking System', 'Responsive'],
          duration: '8 weeks',
          team: '4 team members',
          client: 'Grand Luxury Hotels',
          tech: 'WordPress, PHP, MySQL, JavaScript',
          status: 'Completed & Live',
          features: [
            'Advanced booking system with real-time availability',
            'Multilingual support (English, Indonesian, Chinese, Japanese)',
            'Mobile-responsive design',
            'Integration with property management system',
            'SEO optimization for better search rankings'
          ],
          is_active: true
        },
        {
          id: 'project2',
          title: 'FitTracker Pro',
          category: 'mobile ui-ux',
          main_category: 'Mobile App',
          image: 'https://via.placeholder.com/400x250?text=FitTracker+Pro',
          description: 'iOS and Android fitness app with social features, workout plans, and progress tracking with wearable device integration.',
          tags: ['React Native', 'HealthKit', 'Analytics'],
          duration: '12 weeks',
          team: '6 team members',
          client: 'FitTech Solutions',
          tech: 'React Native, Node.js, MongoDB',
          status: 'Completed & Live',
          features: [
            'Wearable device integration (Apple Watch, Fitbit)',
            'Social challenges and leaderboards',
            'Personalized workout plans',
            'Nutrition tracking with barcode scanner',
            'Progress analytics and reporting'
          ],
          is_active: true
        },
        {
          id: 'project3',
          title: 'StyleHub Online Store',
          category: 'ecommerce web',
          main_category: 'E-commerce',
          image: 'https://via.placeholder.com/400x250?text=StyleHub+Online+Store',
          description: 'Premium fashion e-commerce platform with AI-powered recommendations and advanced inventory management system.',
          tags: ['Shopify Plus', 'AI Recommendations', 'Payment Gateway'],
          duration: '10 weeks',
          team: '5 team members',
          client: 'StyleHub Inc.',
          tech: 'Shopify Plus, React, Stripe API',
          status: 'Launched',
          features: [
            'AI-powered product recommendations',
            'One-click checkout',
            'Inventory sync across warehouses',
            'Customer loyalty program',
            'Advanced search with filters'
          ],
          is_active: true
        },
        {
          id: 'project4',
          title: 'InnovateAI Brand Identity',
          category: 'branding ui-ux',
          main_category: 'Branding',
          image: 'https://via.placeholder.com/400x250?text=InnovateAI+Branding',
          description: 'Complete brand identity package for AI startup including logo design, brand guidelines, and marketing materials.',
          tags: ['Logo Design', 'Brand Guidelines', 'Print Materials'],
          duration: '6 weeks',
          team: '3 team members',
          client: 'InnovateAI',
          tech: 'Adobe Illustrator, InDesign',
          status: 'Completed',
          features: [
            'Complete brand guidelines',
            'Logo variations for digital and print',
            'Business card and stationery design',
            'Social media templates',
            'Email signature design'
          ],
          is_active: true
        },
        {
          id: 'project5',
          title: 'DataAnalytics Dashboard',
          category: 'web ui-ux',
          main_category: 'UI/UX Design',
          image: 'https://via.placeholder.com/400x250?text=DataAnalytics+Dashboard',
          description: 'Complex data visualization dashboard for enterprise SaaS platform with real-time analytics and reporting features.',
          tags: ['React', 'D3.js', 'Real-time Data'],
          duration: '14 weeks',
          team: '7 team members',
          client: 'DataCorp',
          tech: 'React, D3.js, WebSocket, Node.js',
          status: 'In Production',
          features: [
            'Real-time data streaming',
            'Customizable dashboards',
            'Export to PDF/CSV',
            'Role-based access control',
            'Alerts and notifications'
          ],
          is_active: true
        },
        {
          id: 'project6',
          title: 'QuickBite Delivery',
          category: 'mobile ecommerce',
          main_category: 'Mobile App',
          image: 'https://via.placeholder.com/400x250?text=QuickBite+Delivery',
          description: 'On-demand food delivery application with real-time tracking, payment integration, and restaurant management system.',
          tags: ['Flutter', 'GPS Tracking', 'Payment Gateway'],
          duration: '16 weeks',
          team: '8 team members',
          client: 'QuickBite',
          tech: 'Flutter, Firebase, Google Maps API',
          status: 'Live on App Store & Play Store',
          features: [
            'Live GPS tracking',
            'In-app payments',
            'Push notifications',
            'Restaurant management dashboard',
            'Rating and review system'
          ],
          is_active: true
        }
      ];

      try {
        await Portfolio.bulkCreate(samplePortfolios, { 
          updateOnDuplicate: ['title'] // opsional: jika ingin bisa di-update
        });
        console.log('✅ Sample portfolios berhasil dibuat!');
      } catch (error) {
        console.error('❌ Gagal membuat sample portfolios:', error);
      }
    }

  })
  .catch(err => console.log('❌ Gagal sync:', err));

// ✅ JALANKAN SERVER DI AKHIR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
  console.log(`📡 Public API: http://localhost:${PORT}/api/services`);
  console.log(`📦 Portfolio API: http://localhost:${PORT}/api/portfolio`);
  console.log(`🔐 Admin API: http://localhost:${PORT}/api/admin`);
  console.log(`📩 Contact: POST http://localhost:${PORT}/api/contact`);
});