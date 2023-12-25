const express = require('express');
const router = express.Router();
require('dotenv').config(); 
const { User } = require('../models/UserModel');
const { errorSwitch } = require('./ErrorController');
const auth = require('../functions/verifyToken');
const { Comment } = require('../models/CommentModel');
const { validateNewComment, validateUpdateComment } = require('../validations/CommentValidation');


/* === COMMENT GET ROUTES === */


// GET all comments in db
// eg GET localhost:3000/comments/all/
router.get('/all', auth, async (request, response) => {
  try {
    const result = await Comment.find();
    response.json(result);
  } catch (err) {
    console.log(err)
    errorSwitch(err, response);
  }
});

// GET all comments on a nomination
// eg GET localhost:3000/comments/all/nomination/5f2f8e3d2b8e9a0017b0e9f0
router.get('/all/nomination/:id', auth, async (request, response) => {
  try {
    const result = await Comment.find({ nominationId: request.params.id });
    response.json(result);
  } catch (err) {
    errorSwitch(err, response);
  }
});

// GET one comment by id
// eg GET localhost:3000/comments/one/nomination/5f2f8e3d2b8e9a0017b0e9f0
router.get('/one/comment/:id', auth, async (request, response) => {
  try {
    const result = await Comment.findById(request.params.id);
    response.json(result);
  } catch (err) {
    errorSwitch(err, response);
  }
});

// GET all comments by poster user id
// eg GET localhost:3000/comments/all/user/5f2f8e3d2b8e9a0017b0e9f0
router.get('/all/user/:id', auth, async (request, response) => {
  const _id = request.params.id;
  try {
    const result = await Comment.find({ commenterId: _id });
    response.json(result);
  } catch (err) {
    errorSwitch(err, response);
  }
});


/* === COMMENT POST ROUTES === */


// POST a comment on a nomination
// eg POST localhost:3000/comments/post/5f2f8e3d2b8e9a0017b0e9f0
const newCommentSchema = router.post('/post/:id', auth, async (request, response) => {
  const { error, value } = validateNewComment(request.body);

  if (error) {
    return response.status(400).send(error.details);
  }

  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    if(!result.isFullUser) {
      return response.status(403).send('You are not authorised to do that. Wash your mouth with soap.');
    };

    const newComment = new Comment(request.body);
    const outcome = await newComment.save();
    
    response.json({
      Comment: outcome
    });
    
  } catch (err) {
    errorSwitch(err, response);
  }
});

/* === COMMENT PATCH ROUTES === */


// PATCH a comment by comment id
// eg PATCH localhost:3000/comments/update/5f2f8e3d2b8e9a0017b0e9f0
const updateCommentSchema = router.patch('/update/:id', auth, async (request, response) => { 
  // apply validation - required field is commentBody
  const { error, value } = validateUpdateComment(request.body);

  if (error) {
    return response.status(400).send(error.details);
  }

  try {
    const comment = await Comment.findById(request.params.id);

    // check comment exists
    if (!comment) {
      return response.status(404).send('Comment not found.');
    }
    
    const commenter = comment.commenterId;
    const requester = await User.findById(request.userId);
    
    // check user created comment or is admin
    if (requester.id.toString() != commenter.toString()) {
      return response.status(403).send('You are not authorised to do that. Wash your mouth with soap.');
    }

    // update with new string
    comment.commentBody = request.body.commentBody;

    //save to db
    const outcome = await comment.save();

    response.json({
      Comment: outcome
    });

  } catch (err) {
    errorSwitch(err, response);
  }

});


/* === COMMENT DELETE ROUTES === */


// DELETE a comment by id
// eg DELETE localhost:3000/comments/delete/5f2f8e3d2b8e9a0017b0e9f0
router.delete('/delete/:id', auth, async (request, response) => {
  const requestorId = request.userId;
  const targetComment = request.params.id;
  const requestor = await User.findById(requestorId);

  try {
    if (!requestor.isAdmin) {
      return response.status(403).send('You are not authorised to do that. Wash your mouth with soap.');
    }

    const outcome = await Comment.findByIdAndDelete(targetComment);
    
    response.json({
      Comment: outcome
    });
  } catch (err) {
    errorSwitch(err, response);
  }
});


module.exports = router;