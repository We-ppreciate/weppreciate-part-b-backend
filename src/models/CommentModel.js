const mongoose = require('mongoose');

const NominationSchema = new mongoose.Schema({
  nominationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nomination',
    required: true
  },
  commenter_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
	commentBody: {
    type: String,
    required: [true, "You must enter a comment."]
  } 

})