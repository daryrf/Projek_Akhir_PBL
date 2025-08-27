const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Agar frontend React bisa akses
app.use(express.json()); // Baca JSON dari frontend

// Routes
app.use('/api', require('./routes/contactRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('Backend Creative Agency berjalan!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});