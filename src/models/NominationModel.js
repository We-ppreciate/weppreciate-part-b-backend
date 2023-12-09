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
      
   
     //     KL note: there was a code conflict here, included the version from node-boiler-plate branch
    },
    nominatorFullUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false    
    },
    nominatorBasicUser: {
      basicName: {
        type: String,
        required: false
      },
      basicEmail: {
        type: String,
        required: false
      },

    },
    // Boolean on whether the nominator is a full user - determines requirements for nominatorEmail and nominatorName
    isNominatorFullUser: {
      type: Boolean,
      // TODO: Change required dependency after testing
      required: true,
      // required: true,
      default: false
    },
  
  //     KL note: there was a code conflict here, included the version from node-boiler-plate branch

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