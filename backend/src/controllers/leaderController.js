const db = require('../config/db');

exports.registerLeader = async (req, res) => {
    try {
        const {
            full_name, nickname, email, instagram, phone,
            domicile, birth_place, birth_date, gender, activity,
            hobby, skills, interests, motivation, selling_point, agreement
        } = req.body;

        // Cek apakah file CV diupload
        if (!req.file) {
            return res.status(400).json({ message: 'File CV (PDF) wajib diunggah.' });
        }

        const cv_file = `/uploads/${req.file.filename}`;

        const query = `
            INSERT INTO leaders (
                full_name, nickname, email, instagram, phone,
                domicile, birth_place, birth_date, gender, activity,
                hobby, skills, interests, motivation, selling_point, cv_file, agreement
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            full_name, nickname, email, instagram, phone,
            domicile, birth_place, birth_date, gender, activity,
            hobby, skills, interests, // interests dikirim sebagai stringified JSON dari frontend
            motivation, selling_point, cv_file, agreement === 'true' || agreement === true
        ];

        await db.query(query, values);

        res.status(201).json({ message: 'Pendaftaran berhasil! Silakan tunggu info tahap screening selanjutnya.' });

    } catch (error) {
        console.error("Error Leader Registration:", error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.getAllLeaders = async (req, res) => {
    try {
        const [leaders] = await db.query('SELECT * FROM leaders ORDER BY created_at DESC');
        res.json(leaders);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data', error: error.message });
    }
};

exports.updateLeaderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await db.query('UPDATE leaders SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Status kandidat berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal update status', error: error.message });
    }
};

exports.deleteLeader = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM leaders WHERE id = ?', [id]);
        res.json({ message: 'Data kandidat berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus data', error: error.message });
    }
};