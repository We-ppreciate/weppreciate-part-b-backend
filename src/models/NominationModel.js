const mongoose = require('mongoose');

// Award categories used for non-instant thanks
const awardEnum = ['Say/Do', 'Commitment', 'Collborate', 'Challenging', 'Learning', 'Spirited']

const NominationSchema = new mongoose.Schema({
    // ID of the nominee - to come from User Collection
    nomineeUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // TODO: Change required dependency after testing
      required: false
      // required: true
    },
    nominatorFullUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false    
    },
    nominatorBasicUser: {
      basicName: {
        first: {
          type: String,
          required: false
        },
        last: {
          type: String,
          required: false
        }
      },
      basicEmail: {
        type: String,
        required: false
      },
    },
    // Boolean on whether the nominator is a full user - determines requirements for nominatorEmail and nominatorName
    // nominationValue is required if nomination is not instant thanks; selected from array of enums
    nominationValue: {
      type: awardEnum,
      // TODO: Change required dependency after testing
      // required: function() {
        //   return !this.isNominationInstant;
        //   },
      },
      // Nomination body field - reason for the nomination
      nominationBody: {
        type: String,
        // TODO: Change required dependency after testing
        required: false,
        // required: true,
      },
      // Nomination date - default to submitted date
      nominationDate: {
        type: Date,
        default: Date.now,
        required: false,
      },
      isNominatorFullUser: {
        type: Boolean,
        // TODO: Change required dependency after testing
        required: true,
        // required: true,
        default: false
      },
      // Determines if nomination is instant thanks, or for an award
      isNominationInstant: {
        type: Boolean,
        // TODO: Change required dependency after testing
        required: false,
        // required: true,
        default: true
      },
    // Allows Senior Manager to promote nomination to award, if isNominationInstant is false
    isAward: {
      type: Boolean,
      // TODO: Change required dependency after testing
      // required: function() {
      //   return !this.isNominationInstant;
      //   },
      default: false
    },
    isReleased: {
      type: Boolean,
      // TODO Change required dependency after testing
      required: false,
      default: false,
    },
    // Date award is released
    releaseDate: {
      type: Date,
      required: false,
    },
});

const Nomination = mongoose.model('Nomination', NominationSchema);

module.exports = {
  Nomination
}