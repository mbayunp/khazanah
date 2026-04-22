const express = require('express');
const router = express.Router();
const jofisahController = require('../controllers/jofisahController');

router.post('/register', jofisahController.registerMember);
router.get('/members', jofisahController.getAllMembers);

module.exports = router;