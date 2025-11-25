const mongoose = require('mongoose');
const avisModel = require('../models/avis.model');
const modelArticle = require('../models/article.model');

// Créer un nouvel avis
const createAvis = async (avisData, userId) => {
    const avis = await avisModel.create({
        user: userId,
        article: avisData.article,
        rating: avisData.rating,
        comment: avisData.comment
    });

    // Ajouter l'ID de l'avis au tableau avis de l'article
    await modelArticle.findByIdAndUpdate(
        avisData.article,
        { $push: { avis: avis._id } },
        { new: true }
    );

    return avis;
}

// Récupérer un avis par son ID
const getAvisById = async (avisId) => {
    return await avisModel.findById(avisId).populate('user').populate('article');
}

// Récupérer tous les avis d'un article
const getAvisByArticle = async (articleId) => {
    return await avisModel.find({ article: articleId }).populate('user');
}

// Récupérer tous les avis d'un utilisateur
const getAvisByUser = async (userId) => {
    return await avisModel.find({ user: userId }).populate('article');
}

// Mettre à jour un avis
const updateAvis = async (avisId, updateData, userId) => {
    // Vérifier que l'avis appartient à l'utilisateur
    const avis = await avisModel.findById(avisId);
    if (!avis) {
        throw new Error('Avis non trouvé');
    }
    if (avis.user.toString() !== userId.toString()) {
        throw new Error('Vous n\'êtes pas autorisé à modifier cet avis');
    }

    return await avisModel.findByIdAndUpdate(avisId, updateData, { new: true });
}

// Supprimer un avis
const deleteAvis = async (avisId, userId) => {
    // Vérifier que l'avis appartient à l'utilisateur
    const avis = await avisModel.findById(avisId);
    if (!avis) {
        throw new Error('Avis non trouvé');
    }
    if (avis.user.toString() !== userId.toString()) {
        throw new Error('Vous n\'êtes pas autorisé à supprimer cet avis');
    }

    // Retirer l'ID de l'avis du tableau avis de l'article
    await modelArticle.findByIdAndUpdate(
        avis.article,
        { $pull: { avis: avisId } },
        { new: true }
    );

    return await avisModel.findByIdAndDelete(avisId);
}

// Récupérer tous les avis
const getAllAvis = async () => {
    return await avisModel.find().populate('user').populate('article');
}

// Calculer la note moyenne d'un article
const getAverageRating = async (articleId) => {
    const result = await avisModel.aggregate([
        {
            $match: { article: new mongoose.Types.ObjectId(articleId) }
        },
        {
            $group: {
                _id: '$article',
                averageRating: { $avg: '$rating' },
                count: { $sum: 1 }
            }
        }
    ]);

    return result.length > 0 ? result[0] : { averageRating: 0, count: 0 };
}

module.exports = {
    createAvis,
    getAvisById,
    getAvisByArticle,
    getAvisByUser,
    updateAvis,
    deleteAvis,
    getAllAvis,
    getAverageRating
};



