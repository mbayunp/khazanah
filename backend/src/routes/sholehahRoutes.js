const express = require('express');
const router = express.Router();
const sholehahController = require('../controllers/sholehahController');

// Route Publik
router.post('/register', sholehahController.registerMember);

// Route Admin (nanti kita buat halaman dashboard-nya)
router.get('/members', sholehahController.getAllMembers);

module.exports = router;