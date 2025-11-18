const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true
        },
        content: {
            type: String,
            require: true
        }, 
        categorie: {
            type: String,
            require: true
        },
        brand: {
            type: String,
            require: true 
        },
        price: {
            type: Number,
            require: true 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        avis:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Avis'
            }
        ],
        picture: { 
            img: { type: String, require: true},
            img1: { type: String, require: true },
            img2: { type: String },
            img3: { type: String },
            img4: { type: String }
        },
        status: {
            type: Boolean,
            require: true
        },
        stock: {
            type: Number,
            require: true
        }
    }, {
        timeStamps: { createdAt: true}
    }
);

module.exports = mongoose.model('Article', ArticleSchema);