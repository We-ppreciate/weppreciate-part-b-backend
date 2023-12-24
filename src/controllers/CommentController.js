const express = require('express');
const router = express.Router();
require('dotenv').config(); 
const { Nomination } = require('../models/NominationModel');
const { User } = require('../models/UserModel');
const { errorSwitch } = require('./ErrorController');
const auth = require('../functions/verifyToken');
const Comment = require('../models/CommentModel');



/* === COMMENT GET ROUTES === */

/* AUTH REQUIRED ON ALL */


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
router.get('/all/nomination/:id', async (request, response) => {
  try {
    const result = await Comment.find({ nominationId: request.params.id });
    response.json(result);
  } catch (err) {
    errorSwitch(err, response);
  }
});

// GET one comment by id
// eg GET localhost:3000/comments/one/nomination/5f2f8e3d2b8e9a0017b0e9f0
router.get('/one/nomination/:id', async (request, response) => {
  try {
    const result = await Comment.findById(request.params.id);
    response.json(result);
  } catch (err) {
    errorSwitch(err, response);
  }
});

// GET all comments by poster user id
// eg GET localhost:3000/comments/all/user/5f2f8e3d2b8e9a0017b0e9f0
router.get('/all/user/:id', async (request, response) => {
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
router.post('/post/:id',auth, async (request, response) => {
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    if(!result.isFullUser) {
      return response.status(403).send('You are not authorised to do that. Wash your mouth with soap.');
    };

    const newComment = new Comment(request.body);
    const outcome = await newComment.save();
    
    response.json({
      User: outcome
    });
    
  } catch (err) {
    errorSwitch(err, response);
  }
});


// POST Return all comments on an array of nominations
// Requires a request with array of nomination ids
// eg POST localhost:3000/comments/all/nominations
router.post('/all/nominations', auth, async (request, response) => {
  try {
    const nominationIds = request.body.nominationIds;
    const result = await Comment.find({ nominationId: { $in: nominationIds } });
    response.json(result);
  } catch (err) {
    errorSwitch(err, response);
  }
});


/* === COMMENT PATCH ROUTES === */


// PATCH a comment by comment id
// eg PATCH localhost:3000/comments/update/5f2f8e3d2b8e9a0017b0e9f0
router.patch('/update/:id', auth, async (request, response) => { 
  // verify user made the comment
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    if (!result._id !== request.params.id) {
      errorSwitch('You are not authorised to do that. Wash your mouth with soap.', response);
    }

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
      User: outcome
    });
  } catch (err) {
    errorSwitch(err, response);
  }
});


module.exports = router;