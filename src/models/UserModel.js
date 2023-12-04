const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is missing.'],
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is missing.'],
    unique: false,
    trim: true
  },
  businessUnit: {
    type: String,
    required: [true, 'Business Unit is missing.'],
    unique: false,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is missing.'],
    unique: false
  },
  // TODO: Change this to ObjectId
  lineManagerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    unique: false
  },
  // TODO: Change this to match front end name/specifics
  userTagLine: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  // TODO: Insert other fields here
  /* */
  // TODO: Link user's _id to photo on S3/Google Storage
  userPhoto: {
    type: String,
    required: false,
    unique: false
  },
  isFullUser: {
    type: Boolean,
    required: true,
    default: true
  },
  isLineManager: {
    type: Boolean,
    required: true,
    default: false
  },
  isSeniorManager: {
    type: Boolean,
    required: true,
    default: false
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
});

// TODO: ADD INSTANCE SAVE FOR MODIFYING PASSWORD?


const User = mongoose.model('User', UserSchema);

module.exports = { 
  User
};