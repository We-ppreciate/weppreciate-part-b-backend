const express = require('express');
const router = express.Router();
require('dotenv').config(); 
const { Nomination } = require('../models/NominationModel');
const { User } = require('../models/UserModel');
const { logToFile } = require('../functions/logToFile');
const { errorSwtich } = require('./ErrorController');


/* === COMMENT GET ROUTES === */

/* AUTH REQUIRED ON ALL */


// GET all comments in db
// eg GET localhost:3000/comments/all/
router.get('/all', async (request, response) => {
  try {
    const result = await Comment.find();
    response.json(result);
  } catch (err) {
    errorSwtich(err, response);
  }
});

// GET all comments on a nomination
router.get('/all/nomination/:id', async (request, response) => {
  try {
    const result = await Comment.find({ nominationId: request.params.id });
    response.json(result);
  } catch (err) {
    errorSwtich(err, response);
  }
};

// GET one comment by id
router.get('/one/:id', async (request, response) => {
  try {
    const result = await Comment.findById(request.params.id);
    response.json(result);
  } catch (err) {
    errorSwtich(err, response);
  }
});

// GET all comments by user id
router.get('/all/user/:id', async (request, response) => {
  const _id = request.params.id;
  try {
    const result = await Comment.find({ commenterId: _id });
    response.json(result);
  } catch (err) {
    errorSwtich(err, response);
  }
});


/* === COMMENT POST ROUTES === */


// POST a comment on a nomination
// router.post('/post/:id', auth, async (request, response) => {
//   const _id = request.userId;

//   try {
//     const result = await User.findById(_id);
//     if (!result.isFullUser) {
//       return response.status(403).send('You are not authorised to do that. Wash your mouth with soap.');
//     }

//     const outcome = await Comment.create({
//       nominationId: request.params.id,
//       commenterId: _id,
//       commentBody: request.body.commentBody
//     });
    
//     response.json({
//       User: outcome
//     });
//   } catch (err) {
//     errorSwtich(err, response);
//   }
// });


/* === COMMENT PUT ROUTES === */


// PATCH a comment by id
// router.patch('/update/:id', async (request, response) => { 
//   // verify user made the comment
//   const _id = request.userId;

//   try {
//     const result = await User.findById(_id);
//     if (!result._id !== request.params.id) {
//       return response.status(403).send('You are not authorised to do that. Wash your mouth with soap.');
//     }


/* === COMMENT DELETE ROUTES === */


// DELETE a comment by id
router.delete('/delete/:id', async (request, response) => {
  // const _id = request.userId;

  try {
    // const result = await User.findById(_id);
    // if (!result.isAdmin) {
    //   return response.status(403).send('You are not authorised to do that. Wash your mouth with soap.');
    // }

    const outcome = await Comment.findByIdAndDelete(request.params.id);
    
    response.json({
      User: outcome
    });
  } catch (err) {
    errorSwtich(err, response);
  }
});