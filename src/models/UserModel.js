const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: false,
    trim: true,
  },
  businessUnit: {
    type: String,
    required: [true, 'Business Unit is required'],
    unique: false,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    unique: false
  },
  lineManagerId: {
    type: String,
    required: false,
    unique: false
  },
  userTagLine: {
    type: String,
    required: false,
    unique: false
  },
  userPhoto: {
    type: String,
    required: false,
    unique: false
  }
});

// TODO: ADD INSTANCE SAVE FOR MODIFYING PASSWORD?


const User = mongoose.model('User', UserSchema);

module.exports = { 
  User
};