const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER ADMIN
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Cek apakah email sudah ada
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) return res.status(400).json({ message: 'Email sudah terdaftar!' });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert ke Database
        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        res.status(201).json({ message: 'Admin berhasil didaftarkan!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// LOGIN ADMIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ message: 'Email tidak ditemukan!' });

        const user = users[0];

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Password salah!' });

        // Buat Token JWT
        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token berlaku 1 hari
        );

        res.json({ message: 'Login berhasil!', token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};