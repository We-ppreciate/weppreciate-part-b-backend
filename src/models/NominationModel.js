const mongoose = require('mongoose');

// Award categories used for non-instant thanks
const awardEnum = ['Say/Do', 'Commitment', 'Collborate', 'Challenging', 'Learning', 'Spirited']

const NominationSchema = new mongoose.Schema({
    // ID of the nominee - to come from User Collection
    recipientUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipient is missing.'],
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
    // nominationValue is required if nomination is not an instant thanks; selected from array of enums
    nominationValue: {
      type: awardEnum,
      // TODO: Change required dependency after testing
        required: function() {
          return !this.isNominationInstant;
        },
      },
      // Nomination body field - reason for the nomination
      nominationBody: {
        type: String,
        required: true,
      },
      // Nomination date - default to submitted date
      nominationDate: {
        type: String,
        required: true,
      },
      // Boolean on whether the nominator is a full user - determines requirements for nominatorEmail and nominatorName
      isNominatorFullUser: {
        type: Boolean,
        required: true,
        default: false
      },
      // Determines if nomination is instant thanks, or for an award
      isNominationInstant: {
        type: Boolean,
        required: true,
        default: true
      },
    // Allows Senior Manager to promote nomination to award, if isNominationInstant is false
    isAward: {
      type: Boolean,
      required: true,
      default: false
    },
    isReleased: {
      type: Boolean,
      required: true,
      default: false,
    },
    // Date award is released
    releaseDate: {
      type: String,
      required: false,
    },
});

const Nomination = mongoose.model('Nomination', NominationSchema);

module.exports = {
  Nomination
}