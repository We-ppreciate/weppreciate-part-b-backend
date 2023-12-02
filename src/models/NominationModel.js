const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Award categories used for non-instant thanks
const awardEnum = ['Say/Do', 'Commitment', 'Collborate', 'Challenging', 'Learning', 'Spirited']

const NominationSchema = new mongoose.Schema({
    // ID of the nominee - to come from User Collection
    nomineeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    // Boolean on whether the nominator is a full user - determines requirements for nominatorEmail and nominatorName
    isNominatorFullUser: {
      type: Boolean,
      required: true,
      default: false
    },
    // nominatorEmail is required if nominator is not a full user
    nominatorEmail: {
      type: String,
      required: function() {
        return !this.isNominatorFullUser;
        }
    },
    // nominatorName is required if nominator is not a full user
    nominatorName: {
      type: String,
      required: function() {
        return !this.isNominatorFullUser;
        }
    },
    // Determines if nomination is instant thanks, or for an award
    isNominationInstant: {
      type: Boolean,
      required: true,
      default: true
    },
    // nominationValue is required if nomination is not instant thanks; selected from array of enums
    nominationValue: {
      type: String,
      required: function() {
        return !this.isNominationInstant;
        },
      enum: awardEnum
    },
    // Nomination body field - reason for the nomination
    nominationBody: {
      type: String,
      required: true
    },
    // Allows Senior Manager to promote nomination to award, if isNominationInstant is false
    isAward: {
      type: Boolean,
      required: function() {
        return !this.isNominationInstant;
        },
      default: false
    },
    isReleased: {
      type: Boolean,
      default: false
    }
});

const Nomination = mmongoose.model('Nomination', NominationSchema);

module.exports = {
  Nomination
}