const express = require('express');
const router = express.Router();

// IMPORTATION DU CONTROLLER 
const ArticleController = require('../controllers/Article.controller');
const verifyToken = require('../middlewares/auth');

router.get('/all', ArticleController.getAll);
router.post('/add', verifyToken, ArticleController.postArticle);

module.exports = router