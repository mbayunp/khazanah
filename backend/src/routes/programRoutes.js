// backend/src/routes/programRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getAllPrograms, getProgramById, createProgram, updateProgram, deleteProgram, getProgramBySlug } = require('../controllers/programController');

// Helper untuk menangani error Multer agar server tidak crash
const uploadMiddleware = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Jika file terlalu besar atau format salah, kirim pesan JSON
            return res.status(400).json({ 
                message: err.code === 'LIMIT_FILE_SIZE' 
                    ? 'Ukuran file terlalu besar! Maksimal 5MB.' 
                    : err.message 
            });
        }
        next();
    });
};

router.get('/slug/:slug', getProgramBySlug);

router.get('/', getAllPrograms);
router.get('/:id', getProgramById);
router.post('/', uploadMiddleware, createProgram);
router.put('/:id', uploadMiddleware, updateProgram);
router.delete('/:id', deleteProgram);

module.exports = router;