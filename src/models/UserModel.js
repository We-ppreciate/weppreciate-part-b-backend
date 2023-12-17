const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  upn: {
    type: String,
    //TODO: Change required dependency after testing
    required: false,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is missing.'],
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    first: {
      type: String,
      required: [true, 'First name is missing.'],
      unique: false,
      trim: true,
    },
    last: {
      type: String,
      required: [true, 'Last name is missing.'],
      unique: false,
      trim: true,
    }

  },
  businessUnit: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  passwordHash: {
    type: String,
    required: false,
    unique: false,
    // prevents password being automatically returned
    select: false
  },
  lineManagerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    unique: false
  },
  userTagLine: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  // TODO: Link user's _id to photo on S3/Google Storage
  userPhotoKey: {
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