const db = require('../config/db');

// ==========================================
// AREA PUBLIK & USER
// ==========================================

// 1. Dapatkan Semua Artikel (Hanya yang Approved)
exports.getApprovedArticles = async (req, res) => {
    try {
        const [articles] = await db.query(
            "SELECT id, title, slug, thumbnail, category, author_name, created_at FROM articles WHERE status = 'approved' ORDER BY created_at DESC"
        );
        res.json(articles);
    } catch (error) {
        console.error("Error get articles:", error);
        res.status(500).json({ message: 'Gagal mengambil artikel', error: error.message });
    }
};

// 2. Dapatkan Detail Artikel Berdasarkan Slug
exports.getArticleBySlug = async (req, res) => {
    try {
        const [article] = await db.query(
            "SELECT * FROM articles WHERE slug = ? AND status = 'approved'", 
            [req.params.slug]
        );
        if (article.length === 0) return res.status(404).json({ message: 'Artikel tidak ditemukan atau belum dipublish' });
        res.json(article[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 3. Submit Artikel Baru (Otomatis Pending)
exports.submitArticle = async (req, res) => {
    try {
        const { title, content, category, author_name } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: 'Judul dan isi artikel wajib diisi' });
        }

        // Buat Slug dari Judul
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        // Ambil path gambar jika ada yang diupload
        const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

        const query = 'INSERT INTO articles (title, slug, content, thumbnail, category, author_name, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [title, slug, content, thumbnail, category || 'Umum', author_name || 'Anonim', 'pending'];

        await db.query(query, values);
        res.status(201).json({ message: 'Artikel berhasil dikirim dan menunggu review Admin!' });

    } catch (error) {
        console.error("Database Error:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Judul artikel ini sudah pernah ada. Silakan gunakan judul lain.' });
        }
        res.status(500).json({ message: 'Gagal mengirim artikel', error: error.message });
    }
};


// ==========================================
// AREA ADMIN DASHBOARD
// ==========================================

// 4. Dapatkan SEMUA Artikel untuk Dashboard Admin (Pending, Approved, Rejected)
exports.getAllArticlesAdmin = async (req, res) => {
    try {
        const [articles] = await db.query('SELECT * FROM articles ORDER BY created_at DESC');
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data artikel', error: error.message });
    }
};

// 5. Ubah Status Artikel (Approve / Reject)
exports.updateArticleStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' atau 'rejected'

        await db.query("UPDATE articles SET status = ? WHERE id = ?", [status, id]);
        res.json({ message: `Artikel berhasil di-${status}!` });
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengubah status', error: error.message });
    }
};

// 6. Hapus Artikel
exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM articles WHERE id = ?", [id]);
        res.json({ message: 'Artikel berhasil dihapus!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus artikel', error: error.message });
    }
};