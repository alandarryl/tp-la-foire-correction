
const createError = (status, message, details = null) =>{
    //crée une nouvelle instance d'erreur vide
    const error = new Error(message)
    //Definit le code d'etat de l'erreur en fonction du paramètre "status"
    error.status = status
    //Definit le code d'etat de l'erreur en fonction du paramètre "message"
    error.message = message

    error.details = details

    return error;
}


module.exports = createError;