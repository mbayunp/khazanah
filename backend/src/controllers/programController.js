const db = require('../config/db');

// GET Semua Program
exports.getAllPrograms = async (req, res) => {
    try {
        const [programs] = await db.query('SELECT * FROM programs');
        res.json(programs);
    } catch (error) {
        console.error("❌ ERROR GET PROGRAMS:", error.message); 
        res.status(500).json({ message: 'Gagal mengambil data program', error: error.message });
    }
};

// GET Program by ID
exports.getProgramById = async (req, res) => {
    try {
        const [program] = await db.query('SELECT * FROM programs WHERE id = ?', [req.params.id]);
        if (program.length === 0) return res.status(404).json({ message: 'Program tidak ditemukan' });
        res.json(program[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// CREATE Program Baru
exports.createProgram = async (req, res) => {
    try {
        const { title, category, description, date, location, quota, status } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: 'Judul program wajib diisi' });
        }

        const slug = title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const query = 'INSERT INTO programs (title, slug, category, description, date, location, quota, image, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [title, slug, category, description || '', date, location, quota || 0, image, status || 'draft'];

        await db.query(query, values);
        res.status(201).json({ message: 'Program berhasil dibuat!' });

    } catch (error) {
        console.error("Database Error:", error); 
        
        // Menangkap Error Duplikat Judul/Slug
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ 
                message: 'Judul program ini sudah pernah digunakan. Silakan gunakan judul lain atau tambahkan angka di belakangnya.' 
            });
        }

        res.status(500).json({ 
            message: 'Gagal membuat program di database', 
            error: error.message 
        });
    }
};

// UPDATE Program
exports.updateProgram = async (req, res) => {
    try {
        const { title, category, description, date, location, quota, status } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        // Jika ada gambar baru, pakai yang baru. Jika tidak, jangan ubah kolom image.
        if (req.file) {
            const image = `/uploads/${req.file.filename}`;
            await db.query(
                'UPDATE programs SET title=?, slug=?, category=?, description=?, date=?, location=?, quota=?, image=?, status=? WHERE id=?',
                [title, slug, category, description, date, location, quota, image, status, req.params.id]
            );
        } else {
            await db.query(
                'UPDATE programs SET title=?, slug=?, category=?, description=?, date=?, location=?, quota=?, status=? WHERE id=?',
                [title, slug, category, description, date, location, quota, status, req.params.id]
            );
        }
        res.json({ message: 'Program berhasil diperbarui!' });

    } catch (error) {
        console.error("Database Error:", error);

        // Menangkap Error Duplikat Judul/Slug saat Edit
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ 
                message: 'Judul program ini sudah dipakai oleh program lain. Silakan ubah judulnya.' 
            });
        }

        res.status(500).json({ message: 'Gagal memperbarui program', error: error.message });
    }
};

// DELETE Program
exports.deleteProgram = async (req, res) => {
    try {
        await db.query('DELETE FROM programs WHERE id = ?', [req.params.id]);
        res.json({ message: 'Program berhasil dihapus!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus program', error: error.message });
    }
};

// GET Program By Slug (Untuk Halaman Detail Publik)
exports.getProgramBySlug = async (req, res) => {
    try {
        const [program] = await db.query('SELECT * FROM programs WHERE slug = ?', [req.params.slug]);
        if (program.length === 0) return res.status(404).json({ message: 'Program tidak ditemukan' });
        res.json(program[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// --- FITUR KOMENTAR PROGRAM ---
exports.getProgramComments = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM program_comments WHERE program_id = ? ORDER BY created_at ASC", [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.addProgramComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, text } = req.body;
        const nameToSave = name ? name : 'Hamba Allah';

        await db.query("INSERT INTO program_comments (program_id, name, text) VALUES (?, ?, ?)", [id, nameToSave, text]);
        res.status(201).json({ message: 'Komentar berhasil ditambahkan!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};