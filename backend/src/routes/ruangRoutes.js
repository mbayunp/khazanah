const express = require('express');
const router = express.Router();
const ruangController = require('../controllers/ruangController');

// Route untuk Public
router.get('/', ruangController.getApprovedCurhatan); // Nampilin di halaman public
router.post('/', ruangController.createCurhatan);      // User submit curhatan

// Route khusus Admin/Leader
router.get('/admin', ruangController.getAllCurhatanAdmin);         // Nampilin di tabel admin
router.put('/:id/respond', ruangController.respondCurhatan);       // Admin ngasih jawaban & approve
router.delete('/:id', ruangController.deleteCurhatan);             // Admin hapus data
router.get('/:curhatId/comments', ruangController.getComments);
router.post('/:curhatId/comments', ruangController.addComment);

module.exports = router;