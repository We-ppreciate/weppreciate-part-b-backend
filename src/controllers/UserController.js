const express = require('express');
const router = express.Router();
const { User } = require('../models/UserModel');
const { logToFile } = require('../functions/logToFile');
const auth = require('../functions/verifyToken');


/* === ERROR HANDLING === */
const errorSwtich = (err, response) => {
  let statusCode = 500;
  let message = `Sorry. That\'s a problem on our side. Look like Mavis spilled her tea on the server. ${err}`;

  switch (err) {
    case 400:
      statusCode = 400;
      message = `Your intent is good but the request was bad. ${err}`;
      break;
    case 403:
      statusCode = 403;
      message = `You are not authorised to do that. We'pologise. ${err}`;
      break;
    case 404:
      statusCode = 404;
      message = `This is not the page you are looking for. ${err}`;
      break;
    default:
      statusCode = 500;
      message = `Sorry. That's a problem on our side. Mavis is looking into it now... well, she will, after her tea. ${err}`
      break;      
  };

    response.status(statusCode).json({ message: message });
    logToFile(`UserController.js: ${err}`);
    console.log(`UserController.js: ${err}`);
};

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
    errorSwtich(err, response);
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
    errorSwtich(err, response);
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
    errorSwtich(err, response);
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
    errorSwtich(err, response);
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
    errorSwtich(err, response);
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
    errorSwtich(err, response);
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
    errorSwtich(err, response);
  }
});


/* === USER POST ROUTES === */


// POST new user
// Has authentication and authorisation = isAdmin must be true
// eg: POST http://localhost:3000/users/new

router.post('/new', auth, async (request, response) => {
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
    errorSwtich(err, response);
  }
});


/* === USER PATCH ROUTES === */

// PATCH user by id, for use by self
// eg: PATCH localhost:3000/users/update/self/5e9b2b7b9b9b9b9b9b9b9b9b
/* NEEDS TESTING */
router.patch('/update/self/:id', auth, async (request, response) => {
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    // creates object of keys from request body
    const updates = Object.keys(request.body);
    // so as to limit update to only allowed updates: userTagLine
    const allowedUpdates = ['userTagLine'];
    // applies updated values to user object
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    // if trying to update a non-updatable field, trying to update a profile other than their own, or is not admin return error
  if (!isValid || request.params.id !== _id || !result.isAdmin) {
      return response.status(400).send({ error: 'Your intent is good but we can\'t update that.' });
    }

    // otherwise... update
    const updateSelf = await User.findById(request.params.id);

    // if person does not exist, return error
    if (!updateSelf) {
      return response.status(404).send({ error: 'Hmm. We can\'t find that person. I\'ll check behind the couch' });
    }

    // otherwise... update
    updates.forEach((update) => updateSelf[update] = request.body[update]);
    await updateSelf.save();

    response.send(updateSelf);

  } catch (err) {
    errorSwtich(err, response);
  }
});


// PATCH admin by id 
// Has authentication and authorisation = isAdmin must be true
// eg: PATCH localhost:3000/users/update/admin/5e9b2b7b9b9b9b9b9b9b9b9b
router.patch('/update/admin/:id', auth, async (request, response) => {
  const _id = request.userId;

  try {
    const result = await User.findById(_id);
    // creates object of keys from request body
    const updates = Object.keys(request.body);
    // so as to limit update to only allowed updates: userTagLine
    const allowedUpdates = ['email', 'name', 'businessUnit', 'lineManagerId', 'userPhotoKey', 'userTagLine', 'isFullUser', 'isLineManager', 'isSeniorManager', 'isAdmin'];

    // applies updated values to user object
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    // if trying to update a non-updatable field, return error
    if (!request.isAdmin || !isValid) {
      return response.status(400).send({ error: 'Your intent is good but there is something in there that we can\'t update.' });
    }

    // otherwise... update
    const updateSelf = await User.findById(request.params.id);

    // if person does not exist, return error
    if (!updateSelf) {
      return response.status(404).send({ error: 'Hmm. We can\'t find that person. I\'ll check behind the couch' });
    }

    // otherwise... update
    updates.forEach((update) => updateSelf[update] = request.body[update]);
    await updateSelf.save();

    response.send(updateSelf);

  } catch (err) {
    errorSwtich(err, response);
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
    errorSwtich(err, response);
  }
});


module.exports = router;