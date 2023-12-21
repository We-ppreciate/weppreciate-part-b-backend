const express = require('express');
const router = express.Router();
const { User } = require('../models/UserModel');
const { logToFile } = require('../functions/logToFile');
const auth = require('../functions/verifyToken');
const { errorSwitch } = require('./ErrorController');
const {validateNewUser, validateUpdateSelf, validateUpdateAdmin } = require('../validations/UserValidation');
const _ = require('lodash');
// const flat = require('flat'); Dynamic imports is new.



/* === USER GET ROUTES === */

// GET all users in db
// Has authentication and authorisation (just to test - all authenticated users can access)
// eg GET localhost:3000/users/all/
router.get('/all', auth, async (request, response) => {
  // extract id from request, to return name, as test
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    const resultAll = await User.find();
    
    if (!result) {
      return response.status(400).send('User does not exist.');
    }

    if (result.isAdmin) {
      response.json({
        message: "Hello Admin",
        Users: resultAll
       })
    } else {
      response.json({
        message: "Hello non-Admin",
        Users: resultAll
      });
    }
    
  } catch (err) {
    errorSwitch(err, response);
  }
});


// GET all FULL users in db
// eg GET localhost:3000/users/all/fullusers
router.get('/all/fullusers', auth, async (request, response) => {
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    const outcome = await User.find({isFullUser: true});
    
    response.json({
      Users: outcome
    });
    
  } catch (err) {
    errorSwitch(err, response);
  }
});


// GET user by id
// eg: GET localhost:3000/users/one/id/5e9b2b7b9b9b9b9b9b9b9b9b
router.get('/one/id/:id', auth, async (request, response) => {
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    const outcome = await User.findById(request.params.id);
    
    response.json({
      User: outcome
    });
    
  } catch (err) {
    errorSwitch(err, response);
  }
});

// GET user by name
// eg: GET localhost:3000/users/one/name/katie/lock
router.get('/one/name/:firstName/:lastName', auth, async (request, response) => {
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    
    // Removes case sensitivity from query params
    const firstNameRegex = new RegExp(request.params.firstName, 'i'); // 'i' makes it case insensitive
    const lastNameRegex = new RegExp(request.params.lastName, 'i'); // 'i' makes it case insensitive
    
    const outcome = await User.findOne({ 'name.first': { $regex: firstNameRegex }, 'name.last': { $regex: lastNameRegex } });
    
    response.json({
      Users: outcome
    });
    
  } catch (err) {
    errorSwitch(err, response);
  }
});

// GET user regex, by name - not case sensitive
// eg: GET localhost:3000/users/search/katie
router.get('/search/:string', auth, async (request, response) => {
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    const regex = new RegExp(request.params.string, 'i');
    const outcome = await User.find({ 
      $or: [
        { 'name.first': { $regex: regex } },
        { 'name.last': { $regex: regex } }
      ]
    });
    
    response.json({
      Users: outcome
    });
    
  } catch (err) {
    errorSwitch(err, response);
  }
});


// GET user by Manager id
// Has authentication and authorisation = one of isLineManager, isSeniorManager, isAdmin must be true
// eg: GET localhost:3000/users/all/manager/657d7c33d8b97e77efe01939
router.get('/all/manager/:id', auth, async (request, response) => {
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    const outcome = await User.find({ lineManagerId: request.params.id} );
    
    if (!result.isLineManager && !result.isSeniorManager && !result.isAdmin) {
      return response.status(400).send('You are not authorised to see this. Close your eyes and walk away.');
    }
    
    response.json({
      User: outcome
    });
    
  } catch (err) {
    errorSwitch(err, response);
  }
});

// GET user by email
// eg: GET localhost:3000/users/one/email/jordan.benjamin@yourcompany.com

router.get('/one/email/:email', auth, async (request, response) => {
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    const { email } = request.params;
    
    // Removes case sensitivity from query params
    const emailRegex = new RegExp(email, 'i'); // 'i' makes it case insensitive
    const outcome = await User.findOne({ 'email': { $regex: emailRegex } });
    
    response.json({
      Users: outcome
    });
    
  } catch (err) {
    errorSwitch(err, response);
  }
});


/* === USER POST ROUTES === */


// POST new user
// Has authentication and authorisation = isAdmin must be true
// eg: POST http://localhost:3000/users/new

const newUserSchema = router.post('/new', auth, async (request, response) => {
  const { error, value } = validateNewUser(request.body);

  if (error) {
    return response.status(400).send(error.details);
  }

  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    if(!result.isAdmin) {
      return response.status(403).send('You are not authorised to do that. Wash your mouth with soap.');
    };

    const newUser = new User(request.body);
    const outcome = await newUser.save();
    
    response.json({
      User: outcome
    });
    
  } catch (err) {
    errorSwitch(err, response);
  }
});


/* === USER PATCH ROUTES === */

// TODO MAKE DRYER
// PATCH user by id, for use by self
// eg: PATCH localhost:3000/users/update/self/5e9b2b7b9b9b9b9b9b9b9b9b

const updateSelfSchema = router.patch('/update/self/:id', auth, async (request, response) => {
  const _id = request.userId;
  const { error, value } = validateUpdateSelf(request.body);
  if (error) {
    return response.status(400).send(error.details);
  }

  const requestor = await User.findById(_id);
  const target = await User.findById(request.params.id);

  try {
    // Checking db for User document
    if (!target) {
      return response.status(404).send({ error: 'Hmm. We can\'t find that person. I\'ll check behind the couch' });
    }
    // Checking requestor is only updating their own document
    if (requestor.id !== target.id) {
      return response.status(400).send({ error: 'You can only update your own details, you prankster, you.' });
    }

    // Assigning validated request.body to User document
    Object.assign(target, request.body);
    await target.save();

    response.send(target);

  } catch {
    errorSwitch(err, response);
  }
});


// TODO MAKE DRYER
// PATCH admin by id 
// Has authentication and authorisation = isAdmin must be true
// eg: PATCH localhost:3000/users/update/admin/5e9b2b7b9b9b9b9b9b9b9b9b
const updateAdminSchema = router.patch('/update/admin/:id', auth, async (request, response) => {
  const _id = request.userId;
  const { error, value } = validateUpdateAdmin(request.body);
  if (error) {
    return response.status(400).send(error.details);
  }

  const requestor = await User.findById(_id);
  const target = await User.findById(request.params.id);

  try {
    // Checking db for User document
    if (!target) {
      return response.status(404).send({ 
        status: response.statusCode,
        error: 'Hmm. We can\'t find that person. I\'ll check behind the couch' });
    }
    // Check if user is non-Admin; return error
    if (!requestor.isAdmin) {
      return response.status(400).send({ 
        status: response.statusCode,
        error: 'Your admin has the access to update that. Please contact them, and buy them a coffee. They deserve it.' 
      });
    }
    
    // Assigning validated request.body to User document
    Object.assign(target, request.body);
    await target.save();

    response.send(target);

  } catch (err) {
    errorSwitch(err, response);
  }
});


/* === USER DELETE ROUTES === */

// DELETE user by id, for admin use
// eg: DELETE localhost:3000/admin/delete/5e9b2b7b9b9b9b9b9b9b9b9b
/* ADD AUTHORISATION */
router.delete('/delete/admin/:id', auth, async (request, response) => {
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    if (!result.isAdmin) {
      return response.status(403).send('You are not authorised to do that. Wash your mouth with soap.');
    }

    const outcome = await User.findByIdAndDelete(request.params.id);
    
    response.json({
      User: outcome
    });
    
  } catch (err) {
    errorSwitch(err, response);
  }
});


module.exports = router;