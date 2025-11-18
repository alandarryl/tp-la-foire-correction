const express = require('express');
const router = express.Router();

// IMPORTATION DU CONTROLLER 

const UserController = require('../controllers/User.controller');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

module.exports = router