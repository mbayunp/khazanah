const db = require('../config/db');

// GET Semua Program
exports.getAllPrograms = async (req, res) => {
    try {
        const [programs] = await db.query('SELECT * FROM programs ORDER BY created_at DESC');
        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data program', error });
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
        console.error("Database Error:", error); // Lihat error asli di terminal backend!
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
        res.status(500).json({ message: 'Gagal memperbarui program', error });
    }
};

// DELETE Program
exports.deleteProgram = async (req, res) => {
    try {
        await db.query('DELETE FROM programs WHERE id = ?', [req.params.id]);
        res.json({ message: 'Program berhasil dihapus!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus program', error });
    }
};

exports.getProgramBySlug = async (req, res) => {
    try {
        const [program] = await db.query('SELECT * FROM programs WHERE slug = ?', [req.params.slug]);
        if (program.length === 0) return res.status(404).json({ message: 'Program tidak ditemukan' });
        res.json(program[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};