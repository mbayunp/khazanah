const express = require('express');
const router = express.Router();
const leaderController = require('../controllers/leaderController');
const upload = require('../middleware/upload');

// Gunakan upload.single untuk menangani file input dengan name="cv_file"
router.post('/register', upload.single('cv_file'), leaderController.registerLeader);
router.get('/', leaderController.getAllLeaders);

router.put('/:id/status', leaderController.updateLeaderStatus);
router.delete('/:id', leaderController.deleteLeader);

module.exports = router;