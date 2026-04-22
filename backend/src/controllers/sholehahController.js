const db = require('../config/db');

// --- SIMPAN PENDAFTARAN MEMBER BARU ---
exports.registerMember = async (req, res) => {
    try {
        const {
            name, gender, phone, generation, activity, domicile,
            is_interested_leader, leader_interest_area,
            concerns, goals, requested_topics, speaker_recommendation,
            agreement
        } = req.body;

        // Validasi wajib isi
        if (!name || !phone || !generation || !activity || !domicile || !concerns || !goals || !agreement) {
            return res.status(400).json({ message: 'Semua kolom yang diberi tanda * wajib diisi.' });
        }

        const query = `
            INSERT INTO sholehah_members (
                name, gender, phone, generation, activity, domicile, 
                is_interested_leader, leader_interest_area, 
                concerns, goals, requested_topics, speaker_recommendation, agreement
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            name, gender || 'Perempuan', phone, generation, activity, domicile,
            is_interested_leader || false, leader_interest_area || null,
            concerns, goals, requested_topics || null, speaker_recommendation || null, agreement
        ];

        await db.query(query, values);

        res.status(201).json({
            message: 'Pendaftaran berhasil! Tim kami akan segera menghubungi kamu via WhatsApp.'
        });

    } catch (error) {
        console.error("Error Registration:", error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

// --- GET SEMUA MEMBER (UNTUK ADMIN DASHBOARD) ---
exports.getAllMembers = async (req, res) => {
    try {
        const [members] = await db.query('SELECT * FROM sholehah_members ORDER BY created_at DESC');
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data', error: error.message });
    }
};