
const ModelUser = require('../models/User.model');
const CreateError = require('../middlewares/error');
const createError = require('../middlewares/error');


const checkIsAdmin = async (userId) =>{
    const user = await ModelUser.findById(userId);
    if(!user){
        throw createError(404, "User not found");
    }
    if(user.role !== 'admin'){
        throw createError(401, "Access Denied");
    }
    return true
}

module.exports = {
    checkIsAdmin
}
