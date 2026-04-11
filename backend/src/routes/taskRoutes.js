const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Manajemen Tugas
router.get('/program/:program_id', taskController.getTasksByProgram);
router.post('/', taskController.createTask);
router.post('/auto-generate', taskController.autoGenerateTasks); 
router.put('/:id/status', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);
router.put('/tracker/:program_id', taskController.updateTracker);
router.post('/full-event', taskController.createFullEvent);

module.exports = router;