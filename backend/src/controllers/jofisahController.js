const db = require('../config/db');

exports.registerMember = async (req, res) => {
    try {
        const {
            name, gender, phone, generation, activity, domicile,
            is_interested_leader, leader_interest_area, leader_reason,
            concerns, goals, requested_topics, speaker_recommendation,
            agreement
        } = req.body;

        if (!name || !gender || !phone || !generation || !activity || !domicile || !concerns || !goals || !agreement) {
            return res.status(400).json({ message: 'Semua kolom yang diberi tanda * wajib diisi.' });
        }

        const query = `
            INSERT INTO jofisah_members (
                name, gender, phone, generation, activity, domicile, 
                is_interested_leader, leader_interest_area, leader_reason,
                concerns, goals, requested_topics, speaker_recommendation, agreement
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            name, gender, phone, generation, activity, domicile,
            is_interested_leader || false, leader_interest_area || null, leader_reason || null,
            concerns, goals, requested_topics || null, speaker_recommendation || null, agreement
        ];

        await db.query(query, values);

        res.status(201).json({
            message: 'Pendaftaran berhasil! Selamat bergabung di perjalanan growth kita 🚀'
        });

    } catch (error) {
        console.error("Error Registration:", error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

exports.getAllMembers = async (req, res) => {
    try {
        const [members] = await db.query('SELECT * FROM jofisah_members ORDER BY created_at DESC');
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data', error: error.message });
    }
};