const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const programRoutes = require('./src/routes/programRoutes');
const ruangRoutes = require('./src/routes/ruangRoutes');
const articleRoutes = require('./src/routes/articleRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const speakerRoutes = require('./src/routes/speakerRoutes');
const sholehahRoutes = require('./src/routes/sholehahRoutes');
const jofisahRoutes = require('./src/routes/jofisahRoutes');
const leaderRoutes = require('./src/routes/leaderRoutes');
const memberRoutes = require('./src/routes/memberRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const db = require('./src/config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Akses folder gambar secara publik
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/ruang', ruangRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/speakers', speakerRoutes);
app.use('/api/sholehah', sholehahRoutes);
app.use('/api/jofisah', jofisahRoutes);
app.use('/api/leaders', leaderRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/categories', categoryRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`🚀 Server Backend berjalan di port ${PORT}`);

    // --- PENGECEKAN KONEKSI DATABASE ---
    try {
        // Melakukan query super ringan untuk mengetes koneksi
        await db.query('SELECT 1');
        console.log('✅ DATABASE MYSQL BERHASIL TERHUBUNG!');
    } catch (error) {
        console.error('❌ DATABASE GAGAL TERHUBUNG!');
        console.error('Alasan:', error.message);
    }
    });