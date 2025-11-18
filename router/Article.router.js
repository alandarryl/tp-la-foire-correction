const express = require('express');
const router = express.Router();

// IMPORTATION DU CONTROLLER 
const ArticleController = require('../controllers/Article.controller');

router.get('/all', ArticleController.getAll);

module.exports = router