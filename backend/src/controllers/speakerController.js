const db = require('../config/db');

exports.getAllSpeakers = async (req, res) => {
    try {
        const [speakers] = await db.query('SELECT * FROM speakers ORDER BY name ASC');
        res.json(speakers);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data pemateri', error: error.message });
    }
};

exports.getSpeakerById = async (req, res) => {
    try {
        const [speaker] = await db.query('SELECT * FROM speakers WHERE id = ?', [req.params.id]);
        if (speaker.length === 0) return res.status(404).json({ message: 'Pemateri tidak ditemukan' });
        res.json(speaker[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createSpeaker = async (req, res) => {
    try {
        const { name, gender, focus, bio, phone, instagram, invitation_status, ratecard, benefits, notes } = req.body;
        
        // Ambil path gambar jika ada yang diupload
        const photo = req.file ? `/uploads/${req.file.filename}` : null;
        
        await db.query(
            'INSERT INTO speakers (name, gender, photo, focus, bio, phone, instagram, invitation_status, ratecard, benefits, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, gender, photo, focus, bio, phone, instagram, invitation_status, ratecard || 0, benefits, notes]
        );
        res.status(201).json({ message: 'Data pemateri berhasil ditambahkan!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menambah pemateri', error: error.message });
    }
};

exports.updateSpeaker = async (req, res) => {
    try {
        const { name, gender, focus, bio, phone, instagram, invitation_status, ratecard, benefits, notes } = req.body;
        
        // Cek jika ada foto baru yang diupload
        if (req.file) {
            const photo = `/uploads/${req.file.filename}`;
            await db.query(
                'UPDATE speakers SET name=?, gender=?, photo=?, focus=?, bio=?, phone=?, instagram=?, invitation_status=?, ratecard=?, benefits=?, notes=? WHERE id=?',
                [name, gender, photo, focus, bio, phone, instagram, invitation_status, ratecard || 0, benefits, notes, req.params.id]
            );
        } else {
            // Update tanpa mengubah foto lama
            await db.query(
                'UPDATE speakers SET name=?, gender=?, focus=?, bio=?, phone=?, instagram=?, invitation_status=?, ratecard=?, benefits=?, notes=? WHERE id=?',
                [name, gender, focus, bio, phone, instagram, invitation_status, ratecard || 0, benefits, notes, req.params.id]
            );
        }
        res.json({ message: 'Data pemateri berhasil diperbarui!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui data', error: error.message });
    }
};

exports.deleteSpeaker = async (req, res) => {
    try {
        await db.query('DELETE FROM speakers WHERE id = ?', [req.params.id]);
        res.json({ message: 'Data pemateri berhasil dihapus!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus data', error: error.message });
    }
};