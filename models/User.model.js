const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    prenom: { 
      type: String, 
      required: true 
    },   
	avatar: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    isActive: {
      type: Boolean,
      required : true, 
      default: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    password: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: { createdAt: true } }
)

module.exports = mongoose.model('User', UserSchema)