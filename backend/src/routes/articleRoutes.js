const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const upload = require('../middleware/upload');

// --- PUBLIC ROUTES ---
router.get('/', articleController.getApprovedArticles);
router.get('/slug/:slug', articleController.getArticleBySlug);

// --- USER ACTION ---
// Gunakan upload.single('thumbnail') untuk menangani file gambar
router.post('/', upload.single('thumbnail'), articleController.submitArticle);

// --- ADMIN ROUTES ---
router.get('/admin', articleController.getAllArticlesAdmin);
router.put('/:id/status', articleController.updateArticleStatus);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;