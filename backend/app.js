// backend/app.js
const express = require('express');
const cors = require('cors');
const Message = require('./models/Message');

const sequelize = require('./config/database'); //Import instance sequelize

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Sync database
sequelize.sync({ force: false })
  .then(() => console.log('Semua tabel siap!'))
  .catch(err => console.log('Gagal sync:', err));

// Route test
app.get('/', (req, res) => {
  res.send('🚀 Backend Creative Agency siap menerima pesan!');
});

// Route untuk form kontak
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validasi input dasar
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Nama, email, dan pesan wajib diisi.' });
    }

    // Simpan ke MySQL
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
    
    // 💡 Tangani error spesifik dari Sequelize (misal: validasi)
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({ message: "Gagal menyimpan pesan. Coba lagi." });
  }
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});