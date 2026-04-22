const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/sholehah', memberController.getSholehahMembers);
router.get('/jofisah', memberController.getJofisahMembers);
router.put('/:id/status', memberController.updateMemberStatus);
router.delete('/:id', memberController.deleteMember);

module.exports = router;