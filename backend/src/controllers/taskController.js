const db = require('../config/db');

// Dapatkan semua tugas berdasarkan Program/Event
exports.getTasksByProgram = async (req, res) => {
    try {
        const { program_id } = req.params;
        const [tasks] = await db.query('SELECT * FROM tasks WHERE program_id = ? ORDER BY deadline ASC', [program_id]);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil tugas', error: error.message });
    }
};

// Tambah tugas baru secara manual
exports.createTask = async (req, res) => {
    try {
        const { program_id, title, assigned_to, role, deadline } = req.body;
        await db.query(
            'INSERT INTO tasks (program_id, title, assigned_to, role, deadline) VALUES (?, ?, ?, ?, ?)',
            [program_id, title, assigned_to, role, deadline]
        );
        res.status(201).json({ message: 'Tugas berhasil ditambahkan' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal membuat tugas', error: error.message });
    }
};

// Auto-Generate Standard Tasks untuk Event Baru
exports.autoGenerateTasks = async (req, res) => {
    try {
        const { program_id } = req.body;
        const standardTasks = [
            { title: 'Desain Poster Utama', role: 'Poster Designer' },
            { title: 'Tulis Caption IG', role: 'Caption Writer' },
            { title: 'Hubungi Pemateri', role: 'PIC Pemateri' },
            { title: 'Siapkan Link Zoom/Lokasi', role: 'Host / Admin' },
            { title: 'Siapkan Petugas Tilawah', role: 'Tilawah' }
        ];

        for (let task of standardTasks) {
            await db.query(
                "INSERT INTO tasks (program_id, title, assigned_to, role, status) VALUES (?, ?, 'Belum di-assign', ?, 'pending')",
                [program_id, task.title, task.role]
            );
        }
        res.status(201).json({ message: 'SOP Tugas Standar berhasil di-generate!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal generate SOP', error: error.message });
    }
};

// Update Status Tugas (Pending <-> Done)
exports.updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 
        await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Status tugas diperbarui' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal update status', error: error.message });
    }
};

// Hapus Tugas
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        res.json({ message: 'Tugas dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus tugas', error: error.message });
    }
};

// --- UPDATE MASTER TRACKER SEKALIGUS (EDIT BARIS) ---
exports.updateTracker = async (req, res) => {
    try {
        const { program_id } = req.params;
        const { pemateri, host, tilawah, poster, caption, diskusi } = req.body;

        const rolesToUpdate = [
            { role: 'Pemateri', assignee: pemateri },
            { role: 'Host', assignee: host },
            { role: 'Tilawah', assignee: tilawah },
            { role: 'Poster', assignee: poster },
            { role: 'Caption', assignee: caption },
            { role: 'Diskusi', assignee: diskusi }
        ];

        for (let item of rolesToUpdate) {
            if (item.assignee) {
                const [existing] = await db.query('SELECT id FROM tasks WHERE program_id = ? AND role = ?', [program_id, item.role]);
                if (existing.length > 0) {
                    await db.query('UPDATE tasks SET assigned_to = ? WHERE id = ?', [item.assignee, existing[0].id]);
                } else {
                    await db.query(
                        "INSERT INTO tasks (program_id, title, assigned_to, role, status) VALUES (?, ?, ?, ?, 'pending')",
                        [program_id, `Tugas ${item.role}`, item.assignee, item.role]
                    );
                }
            }
        }
        res.json({ message: 'Master Tracker berhasil diupdate!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal update tracker', error: error.message });
    }
};

// --- CREATE FULL EVENT (TAMBAH BARIS BARU) ---
exports.createFullEvent = async (req, res) => {
    try {
        const { 
            category, date, title, theme, 
            pemateri, host, tilawah, poster, caption, diskusi,
            peserta, tor, fotoCv 
        } = req.body;

        // 1. Insert Program
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const [progResult] = await db.query(
            'INSERT INTO programs (title, slug, category, theme, date, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, slug, category, theme, date, 'Online / Group WA', 'active']
        );
        const program_id = progResult.insertId;

        // 2. Insert Tasks
        const roles = [
            { role: 'Pemateri', name: pemateri },
            { role: 'Host', name: host },
            { role: 'Tilawah', name: tilawah },
            { role: 'Poster', name: poster },
            { role: 'Caption', name: caption },
            { role: 'Diskusi', name: diskusi }
        ];

        for (let item of roles) {
            if (item.name) {
                await db.query(
                    'INSERT INTO tasks (program_id, title, assigned_to, role, status) VALUES (?, ?, ?, ?, ?)',
                    [program_id, `Tugas ${item.role}`, item.name, item.role, 'pending']
                );
            }
        }

        // 3. Insert Report
        await db.query(
            'INSERT INTO event_reports (program_id, participants_count, tor_status, doc_status) VALUES (?, ?, ?, ?)',
            [program_id, peserta || 0, tor ? 1 : 0, fotoCv ? 1 : 0]
        );

        res.status(201).json({ message: 'Event Baru berhasil ditambahkan ke Tracker!' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal membuat event', error: error.message });
    }
};