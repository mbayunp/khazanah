const db = require('../config/db');

// --- UNTUK PUBLIC (USER AWAM) ---

// 1. Ambil HANYA curhatan yang sudah di-approve (Untuk Halaman Utama Ruang)
exports.getApprovedCurhatan = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM ruang_curhat WHERE status = 'approved' ORDER BY created_at DESC"
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 2. Kirim Curhatan Baru (Otomatis status 'pending')
exports.createCurhatan = async (req, res) => {
    try {
        const { sender_name, message } = req.body;
        
        // Jika nama kosong, set default ke 'Hamba Allah'
        const nameToSave = sender_name ? sender_name : 'Hamba Allah';

        await db.query(
            "INSERT INTO ruang_curhat (sender_name, message, status) VALUES (?, ?, 'pending')",
            [nameToSave, message]
        );
        res.status(201).json({ message: 'Curhatan berhasil dikirim dan menunggu moderasi Leader.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// --- UNTUK ADMIN / LEADER (DASHBOARD) ---

// 3. Ambil SEMUA curhatan (Pending, Approved, Rejected) untuk Dashboard Admin
exports.getAllCurhatanAdmin = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM ruang_curhat ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 4. Beri Tanggapan & Ubah Status (Approve/Reject)
exports.respondCurhatan = async (req, res) => {
    try {
        const { id } = req.params;
        const { admin_response, status } = req.body; // status bisa 'approved' atau 'rejected'

        await db.query(
            "UPDATE ruang_curhat SET admin_response = ?, status = ? WHERE id = ?",
            [admin_response, status, id]
        );
        res.json({ message: `Curhatan berhasil di-${status}!` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 5. Hapus Curhatan (Hanya Admin)
exports.deleteCurhatan = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM ruang_curhat WHERE id = ?", [id]);
        res.json({ message: 'Curhatan berhasil dihapus permanen.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// --- FITUR KOMENTAR PUBLIC ---

// Ambil komentar berdasarkan ID Curhatan
exports.getComments = async (req, res) => {
    try {
        const { curhatId } = req.params;
        const [rows] = await db.query(
            "SELECT * FROM ruang_comments WHERE curhat_id = ? ORDER BY created_at ASC",
            [curhatId]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Tambah komentar baru dari Public
exports.addComment = async (req, res) => {
    try {
        const { curhatId } = req.params;
        const { sender_name, comment_text } = req.body;
        const nameToSave = sender_name ? sender_name : 'Hamba Allah';

        await db.query(
            "INSERT INTO ruang_comments (curhat_id, sender_name, comment_text) VALUES (?, ?, ?)",
            [curhatId, nameToSave, comment_text]
        );
        res.status(201).json({ message: 'Komentar berhasil ditambahkan!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};