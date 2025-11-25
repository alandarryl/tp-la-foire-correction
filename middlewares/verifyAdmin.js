const createError = require('./error');
const modelUser = require('../models/User.model');

const verifyAdmin = async (req, res, next) => {
    try {
        // Vérifier que l'utilisateur est authentifié
        if (!req.auth || !req.auth.id) {
            return next(createError(401, 'Accès refusé - authentification requise'));
        }

        // Récupérer l'utilisateur depuis la base de données
        const user = await modelUser.findById(req.auth.id);

        if (!user) {
            return next(createError(404, 'Utilisateur non trouvé'));
        }

        // Vérifier si l'utilisateur est administrateur
        if (user.role !== 'admin') {
            return next(createError(403, 'Accès refusé - droits administrateur requis'));
        }

        // Si tout est OK, passer au middleware suivant
        console.log('utilisateur admin ok')
        if (user.role == admin){
            next('utilisateur admin ok')
        }

    } catch (error) {
        next(createError(500, error.message));
    }
}

module.exports = verifyAdmin;

