
const ModelUser = require('../models/User.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env.js');


// Ajout un nouvel utilisateur

const register = async (req, res) =>{
    try {
        
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        // console.log(hashPassword);

        const user = await ModelUser.create({
            //... : permet de copier toutes les propriétés de l'objet req.body
            ...req.body,
            password: hashPassword
        });

        res.status(201).json(user);


    } catch (error) {
        //
        res.status(500).json(error.message)
    }
}

const login = async (req, res) => {
    try {
        
        //1- rechercher l'utilisateur par son email

        const userMail = req.body.email;
        const user = await ModelUser.findOne({ email: userMail });

        //2- si l'utilisateur n'existe pas => renvoyer une erreur 404

        if (!user){
            return res.status(404).json('User not found !');
        }

        //3 - comparer le mot de passe fourni avec celui de la base de données

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        //4 - si le mot de passe est incorrect => renvoyer une erreur 401

        if (!isPasswordValid){
            return res.status(401).json('Invalid password or email !');
        }
        //else{
        //     res.status(200).json({user, message :'Login successful !'});
        // }

        const token = jwt.sign(
            {id: user._id },
            ENV.TOKEN,
            {expiresIn: "24h"}
        )

        const { password, ...others} = user._doc;

        res.cookie(
            'acces_token',
            token,
            {httpOnly: true}
        );

        res.status(200).json({message: 'Login successful', user: others});

        console.log(token)


    } catch (error) {
        
        res.status(500).json(error.message)
    }
}


module.exports ={
    register,
    login
}

