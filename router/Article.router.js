const express = require('express');
const router = express.Router();

//IMPORTATION CONTROLLER
articleController = require('../controllers/article.controller');
const verifyToken = require('../middlewares/auth');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/all', articleController.getAll);
router.post('/add', verifyToken, verifyAdmin, articleController.postArticle);
router.get('/get/:id', articleController.getArticleById);
router.delete('/delete/:id', verifyToken, verifyAdmin, articleController.deleteArticle);
router.put('/update/:id', verifyToken, verifyAdmin, articleController.updateArticle);
router.get('/get/:id/avis', articleController.getAvis);
router.get('/get/:id/asc-rating', articleController.ascArticles);
router.get('/get/:id/desc-rating', articleController.descArticles);
router.get('/get/:id/notes', articleController.sortByNote);
router.post('/add/avis', verifyToken, articleController.addAvis);

module.exports = router;