const mongoose = require('mongoose');

const NominationSchema = new mongoose.Schema({
  nominationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nomination',
    // TODO: Change required dependency after testing
    required: false
  },
  commenter_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // TODO: Change required dependency after testing
    required: false
  },
	commentBody: {
    type: String,
    // TODO: Change required dependency after testing
    required: [false, "You must enter a comment."]
  } 

})