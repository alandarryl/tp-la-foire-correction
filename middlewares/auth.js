
const jwt = require("jsonwebtoken");

const createError = require('./error');

const ENV = require('../config/env');


const verifyToken = (req, res, next) =>{
    // Récupère le json (token) jwt a partir des cookies

    const token = req.cookies.access_token;

    if(!token) return next(createError(401, "Access Denied"));

    //verifie la validité du token en utilisant jwt.verify
    jwt.verify(token, ENV.TOKEN, (err, user) => {
        if(err) return next(createError(403, "Token non valide"));

        /* 
        commentaire sur plusieur ligne :shift+alt+a
         */

        /* 
        si la vérification réussit, on ajoute les informations
        de l'utilisateur dans l'objet "req.auth"
        */

        req.auth = user

        next()

    })


}


module.exports = verifyToken;



