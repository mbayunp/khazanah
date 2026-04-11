const express = require('express');
const router = express.Router();
const speakerController = require('../controllers/speakerController');
const upload = require('../middleware/upload');

router.get('/', speakerController.getAllSpeakers);
router.get('/:id', speakerController.getSpeakerById);
router.post('/', upload.single('photo'), speakerController.createSpeaker);
router.put('/:id', upload.single('photo'), speakerController.updateSpeaker);

router.delete('/:id', speakerController.deleteSpeaker);

module.exports = router;