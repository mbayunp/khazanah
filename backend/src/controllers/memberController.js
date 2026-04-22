const db = require('../config/db');

exports.getSholehahMembers = async (req, res) => {
    try {
        const [members] = await db.query("SELECT *, 'Sholehah' as community_type FROM sholehah_members ORDER BY created_at DESC");
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: 'Gagal memuat data Sholehah', error: error.message });
    }
};

exports.getJofisahMembers = async (req, res) => {
    try {
        const [members] = await db.query("SELECT *, 'Jofisah' as community_type FROM jofisah_members ORDER BY created_at DESC");
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: 'Gagal memuat data Jofisah', error: error.message });
    }
};

exports.updateMemberStatus = async (req, res) => {
    const { id } = req.params;
    const { community, status } = req.body; // community: 'sholehah' atau 'jofisah'

    try {
        const table = community === 'sholehah' ? 'sholehah_members' : 'jofisah_members';
        await db.query(`UPDATE ${table} SET status = ? WHERE id = ?`, [status, id]);
        res.json({ message: 'Status berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal update status', error: error.message });
    }
};

exports.deleteMember = async (req, res) => {
    const { id } = req.params;
    const { community } = req.body;

    try {
        const table = community === 'sholehah' ? 'sholehah_members' : 'jofisah_members';
        await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        res.json({ message: 'Data berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus data', error: error.message });
    }
};