const { model } = require('mongoose');
const modelArticle = require('../models/article.model');
const modelAvis = require('../models/avis.model');
const createError = require('../middlewares/error.js');
const ModelUser = require("../models/User.model.js");
const {checkIsAdmin} = require("../services/userService");

const getAll = async (req, res, next) => {
    try {
        const articles = await ModelArticle.find()
        res.status(200).json(articles);   
    } catch (error) {
        next(createError(500, "failed get all article", error.message))
    }
}
const postArticle =  async (req, res, next) => {
    try {
        // console.log(req.auth.id);

        await checkIsAdmin(req.auth.id);



        const article = await ModelArticle.create(req.body);

        // const newArticle = await ModelArticle.create({
        //         ...req.body,
        //         user: req.auth.id
        //     });

        res.status(201).json(article); 
    } catch (error) {
        next(createError(error.status || 500, error.message))
    }
}

const getArticleById = async (req, res, next) => {
    try {

        

        const article = await ModelArticle.findById(req.params.id);
        if(!article) return res.status(404).json('Article not found !')
        res.status(200).json(article)
    } catch (error) {
        next(createError(500, "failed get all article", error.message))
    }
}

const deleteArticle = async (req, res, next) => {
    try {
        const article = await ModelArticle.findByIdAndDelete(req.params.id)

        await checkIsAdmin(req.auth.id);
        
        if (!article) return res.status(404).json('Article Not found !!!!')
        
        res.status(200).json('Article deleted !!!!!!')
    } catch (error) {
        next(createError(500, "failed get all article", error.message))        
    }
}

const updateArticle = async (req, res, next) => {
    try {

        await checkIsAdmin(req.auth.id);

        const article = await ModelArticle.findByIdAndUpdate(req.params.id, 
            req.body, 
            { new: true }
        );
        if(!article) return res.status(404).json('Article not found  !!!');
        res.status(200).json(article)
    } catch (error) {
        next(createError(500, "failed get all article", error.message))
    }
}

const getAvis = async (req, res, next) => {
    try {
        const articleWithAvis = await ModelArticle.findById(req.params.id).populate("avis");
        if(!articleWithAvis) return res.status(404).json('Avis Not Found !!!!!!!!!');
        res.status(200).json(articleWithAvis)
    } catch (error) {
        next(createError(500, "failed get all article", error.message))
    }
} 

const ascArticle = async (req , res, next) => {
    try {
        const articles = await ModelArticle.find().sort("price");
        res.status(200).json(articles);
    } catch (error) {
        next(createError(500, "failed get all article", error.message))
    }
}

const descArticle = async (req , res, next) => {
    try {
        const articles = await ModelArticle.find().sort("-price");
        res.status(200).json(articles);
    } catch (error) {
        next(createError(500, "failed get all article", error.message))
    }
}


const sortByNote = async (req, res, next) => {
    try {
        const articles = await ModelArticle.aggregate([
        {
           // opérateur d'aggregation pour faire une jointure avec un model 
        $lookup: {
            from: 'avis', // Modele avec laquelle nous voulons faire la jointure
            localField: "_id", // Champ du modele 'Article' utilise pour la jointure  
            foreignField: 'article', // champ du modele 'avis ' utilisé pour la jointure, 
            as: "avis" // Nom du nouveau champ qui contiendra les documents joints  
            },
        },
        {
            $addFields: {
                // Ajout un nouveaux champs aux documents
                averageRating: { $avg: "$avis.rating"}, // Calcule la note moyenne des avis pour chaque article
            }
        },
        {
            $sort: { averageRating: -1 }, // trie les articles en fonction de leur note moyenne en ordre DESC
        }
        ]);  


        if(!articles || articles.length === 0) return res.status(404).json('Article not found !!!! ')
        
        res.status(200).json(articles);
    } catch (error) {
        next(createError(500, "failed get all article", error.message))
    }
} 

module.exports = {
    getAll,
    postArticle,
    getArticleById,
    deleteArticle,
    updateArticle
}