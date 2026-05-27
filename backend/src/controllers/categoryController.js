const db = require('../config/db');

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const [categories] = await db.query("SELECT * FROM categories ORDER BY id ASC");
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Gagal memuat kategori', error: error.message });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Nama kategori wajib diisi' });
    }

    try {
        // Cek duplikasi nama
        const [existing] = await db.query("SELECT id FROM categories WHERE name = ?", [name]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Nama kategori sudah digunakan' });
        }

        const [result] = await db.query("INSERT INTO categories (name, description) VALUES (?, ?)", [name, description]);
        res.status(201).json({ message: 'Kategori berhasil ditambahkan', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menambahkan kategori', error: error.message });
    }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Nama kategori wajib diisi' });
    }

    try {
        // Cek duplikasi nama untuk id lain
        const [existing] = await db.query("SELECT id FROM categories WHERE name = ? AND id != ?", [name, id]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Nama kategori sudah digunakan oleh kategori lain' });
        }

        await db.query("UPDATE categories SET name = ?, description = ? WHERE id = ?", [name, description, id]);
        res.json({ message: 'Kategori berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui kategori', error: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM categories WHERE id = ?", [id]);
        res.json({ message: 'Kategori berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus kategori', error: error.message });
    }
};
