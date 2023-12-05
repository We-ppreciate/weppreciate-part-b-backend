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
    // Boolean on whether the nominator is a full user - determines requirements for nominatorEmail and nominatorName
    isNominatorFullUser: {
      type: Boolean,
      // TODO: Change required dependency after testing
      required: true,
      // required: true,
      default: false
    },
    // nominatorEmail is required if nominator is not a full user
    nominatorEmail: {
      type: String,
      // TODO: Change required dependency after testing
      // required: function() {
      //   return !this.isNominatorFullUser;
      //   }
    },
    // nominatorName is required if nominator is not a full user
    nominatorName: {
      type: String,
      // TODO: Change required dependency after testing
      // required: function() {
      //   return !this.isNominatorFullUser;
      //   }
    },
    // Determines if nomination is instant thanks, or for an award
    isNominationInstant: {
      type: Boolean,
      // TODO: Change required dependency after testing
      required: false,
      // required: true,
      default: true
    },
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
    }
});

const Nomination = mongoose.model('Nomination', NominationSchema);

module.exports = {
  Nomination
}