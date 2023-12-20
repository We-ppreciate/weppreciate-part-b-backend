const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  nominationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nomination',
    required: true
  },
  commenterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
	commentBody: {
    type: String,
    required: [true, "You must enter a comment."]
  } 

});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
