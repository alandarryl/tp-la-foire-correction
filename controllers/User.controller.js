
const ModelUser = ('../models/User.model.js');

// Ajout un nouvel utilisateur

const register = async (req, res) =>{
    try {
        

        const user = await ModelUser.create(req.body);


    } catch (error) {
        //
    }
}




