// backend/app.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // izinkan akses dari frontend
app.use(express.json()); // baca data JSON dari request

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Halo dari backend!' });
});

// Route sederhana untuk tes
app.get('/', (req, res) => {
  res.send('Backend berjalan! 🚀');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});