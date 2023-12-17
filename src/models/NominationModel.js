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
        default: () => {
          const date = new Date();
          const aestTime = new Date(date.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
        
          const day = String(aestTime.getUTCDate()).padStart(2, '0');
          const month = String(aestTime.getUTCMonth() + 1).padStart(2, '0'); // January is 0!
          const year = aestTime.getUTCFullYear();
        
          return `${day}-${month}-${year}`;
        },
        required: true,
        validate: {
          validator: function (value) {
            // Regex to validate date format (dd-mm-yyyy)
            const regex = /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
            return regex.test(value) || value === '' || value === null || value === undefined;
            
          },
          message: 'Invalid date format. Date should be in dd-mm-yyyy format.'
        }
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
      default: () => {
        const date = new Date().toLocaleString('en-AU', {
          timeZone: 'Australia/Sydney',
          dateStyle: 'short'
        });
        return date;
      },
      required: false,
      validate: {
        validator: function (value) {
          // If the value is null, validation should pass
          if (value === null) {
            return true;
          }
        
          // Regex to validate date format (dd-mm-yyyy)
          const regex = /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
          return regex.test(value);
        },
        message: 'Invalid date format. Date should be null or in dd-mm-yyyy format.'
      }
    },
});

const Nomination = mongoose.model('Nomination', NominationSchema);

module.exports = {
  Nomination
}