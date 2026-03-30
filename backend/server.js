const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- Tambahkan ini
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const programRoutes = require('./src/routes/programRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Akses folder gambar secara publik
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // <-- Tambahkan ini

app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server Backend berjalan di port ${PORT}`);
});