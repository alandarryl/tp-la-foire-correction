const userModel = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');

// Créer un nouvel utilisateur
const createUser = async (userData) => {
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Créer l'utilisateur avec le mot de passe hashé
    const user = await userModel.create({
        ...userData,
        password: hashedPassword
    });

    return user;
}

// Trouver un utilisateur par email
const findUserByEmail = async (email) => {
    return await userModel.findOne({ email });
}

// Trouver un utilisateur par ID
const findUserById = async (userId) => {
    return await userModel.findById(userId);
}

// Comparer le mot de passe
const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// Générer un token JWT
const generateToken = async (userId) => {
    return jwt.sign(
        { id: userId },
        ENV.TOKEN,
        { expiresIn: "24H" }
    );
}

// Vérifier le token JWT
const verifyToken = async (token) => {
    return jwt.verify(token, ENV.TOKEN);
}

// Mettre à jour un utilisateur
const updateUser = async (userId, updateData) => {
    // Si le mot de passe est modifié, le hasher
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await userModel.findByIdAndUpdate(userId, updateData, { new: true });
}

// Supprimer un utilisateur
const deleteUser = async (userId) => {
    return await userModel.findByIdAndDelete(userId);
}

// Récupérer tous les utilisateurs
const getAllUsers = async () => {
    return await userModel.find().select('-password');
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    comparePassword,
    generateToken,
    verifyToken,
    updateUser,
    deleteUser,
    getAllUsers
};

