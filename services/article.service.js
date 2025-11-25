const modelArticle = require('../models/article.model');
const modelAvis = require('../models/avis.model');

// Récupérer tous les articles
const getAllArticles = async () => {
    return await modelArticle.find();
}

// Créer un nouvel article
const createArticle = async (articleData, userId) => {
    const article = {
        ...articleData,
        user: userId
    };
    return await modelArticle.create(article);
}

// Récupérer un article par son ID
const getArticleById = async (articleId) => {
    return await modelArticle.findById(articleId);
}

// Supprimer un article
const deleteArticle = async (articleId) => {
    return await modelArticle.findByIdAndDelete(articleId);
}

// Mettre à jour un article
const updateArticle = async (articleId, updateData) => {
    return await modelArticle.findByIdAndUpdate(articleId, updateData, { new: true });
}

// Récupérer les avis d'un article
const getArticleAvis = async (articleId) => {
    return await modelArticle.findById(articleId).populate('avis');
}

// Récupérer les articles triés par prix croissant
const getArticlesAscending = async () => {
    return await modelArticle.find().sort("price");
}

// Récupérer les articles triés par prix décroissant
const getArticlesDescending = async () => {
    return await modelArticle.find().sort("-price");
}

// Récupérer les articles triés par note moyenne
const getArticlesByRating = async () => {
    return await modelArticle.aggregate([
        {
            $lookup: {
                from: 'avis',
                localField: '_id',
                foreignField: 'article',
                as: 'avis'
            },
        },
        {
            $addFields: {
                averageRating: { $avg: '$avis.rating' }
            }
        },
        {
            $sort: { averageRating: -1 },
        },
    ]);
}

// Ajouter un avis à un article
const addAvisToArticle = async (avisData, userId) => {
    // Créer un nouvel avis
    const avis = await modelAvis.create({
        user: userId,
        article: avisData.article,
        rating: avisData.rating,
        comment: avisData.comment
    });

    // Ajouter l'ID de l'avis au tableau avis de l'article
    const article = await modelArticle.findByIdAndUpdate(
        avisData.article,
        { $push: { avis: avis._id } },
        { new: true }
    );

    return { avis, article };
}

module.exports = {
    getAllArticles,
    createArticle,
    getArticleById,
    deleteArticle,
    updateArticle,
    getArticleAvis,
    getArticlesAscending,
    getArticlesDescending,
    getArticlesByRating,
    addAvisToArticle
};

