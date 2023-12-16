const express = require('express');
const router = express.Router();
const { User } = require('../models/UserModel');
const { logToFile } = require('../functions/logToFile');
// const { errorSwtich } = require('./ErrorController');


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
// eg GET localhost:3000/users/all/
router.get('/all', async (request, response) => {
  try {
    const result = await User.find({});
    
    response.json({
      Users: result
    });
    
  } catch (err) {
    errorSwtich(err, response);
  }
});


// GET all FULL users in db
// eg GET localhost:3000/users/all/fullusers
router.get('/all/fullusers', async (request, response) => {
  try {
    const result = await User.find({isFullUser: true});
    
    response.json({
      Users: result
    });
    
  } catch (err) {
    errorSwtich(err, response);
  }
});


// GET user by id
// eg: GET localhost:3000/users/one/id/5e9b2b7b9b9b9b9b9b9b9b9b
router.get('/one/id/:id', async (request, response) => {
  try {
    const result = await User.findById(request.params.id);
    
    response.json({
      User: result
    });
    
  } catch (err) {
    errorSwtich(err, response);
  }
});

// GET user by name
// eg: GET localhost:3000/users/one/name/katie/lock
router.get('/one/name/:firstName/:lastName', async (request, response) => {
  try {
    // Removed case sensitivity from query params

    const firstNameRegex = new RegExp(request.params.firstName, 'i'); // 'i' makes it case insensitive
    const lastNameRegex = new RegExp(request.params.lastName, 'i'); // 'i' makes it case insensitive
    
    const result = await User.findOne({ 'name.first': { $regex: firstNameRegex }, 'name.last': { $regex: lastNameRegex } });
    
    response.json({
      Users: result
    });
    
  } catch (err) {
    errorSwtich(err, response);
  }
});

// GET user regex, by name - not case sensitive
// eg: GET localhost:3000/users/search/katie
router.get('/search/:string', async (request, response) => {
  try {
    const regex = new RegExp(request.params.string, 'i');
    const result = await User.find({ 
      $or: [
        { 'name.first': { $regex: regex } },
        { 'name.last': { $regex: regex } }
      ]
    });
    
    response.json({
      Users: result
    });
    
  } catch (err) {
    errorSwtich(err, response);
  }
});


// GET user by Manager id
router.get('/all/manager/:id', async (request, response) => {
  try {
    const result = await User.find({ lineManagerId: request.params.id} );
    
    response.json({
      User: result
    });
    
  } catch (err) {
    errorSwtich(err, response);
  }
});

// GET user by email
// eg: GET localhost:3000/users/one/email
router.get('/one/email', async (request, response) => {
  try {
    // Removed case sensitivity from query params
    const { email } = request.body;

    const emailRegex = new RegExp(email, 'i'); // 'i' makes it case insensitive
    
    const result = await User.findOne({ 'email': { $regex: emailRegex } });
    
    response.json({
      Users: result
    });
    
  } catch (err) {
    errorSwtich(err, response);
  }
});


/* === USER POST ROUTES === */


// POST new user
// eg: POST http://localhost:3000/users/new
/* ADD AUTHORISATION */
router.post('/new', async (request, response) => {
  try {
    const newUser = new User(request.body);
    const result = await newUser.save();
    
    response.json({
      User: result
    });
    
  } catch (err) {
    errorSwtich(err, response);
  }
});


/* === USER PATCH ROUTES === */

// PATCH user by id, for use by self
// eg: PATCH localhost:3000/users/update/self/5e9b2b7b9b9b9b9b9b9b9b9b
/* ADD AUTHORISATION */
router.patch('/update/self/:id', async (request, response) => {
  try {
    // creates object of keys from request body
    const updates = Object.keys(request.body);
    // so as to limit update to only allowed updates: userTagLine
    const allowedUpdates = ['userTagLine'];
    // applies updated values to user object
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    // if trying to update a non-updatable field, return error
    if (!isValid) {
      return response.status(400).send({ error: 'Your intent is good but we can\'t update that.' });
    }

    // otherwise... update
    const updateSelf = await User.findById(request.params.id);

    // if person does not exist, return error
    if (!updateSelf) {
      return response.status(404).send({ error: 'Hmm. We can\'t find that person.' });
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
// eg: PATCH localhost:3000/users/update/admin/5e9b2b7b9b9b9b9b9b9b9b9b
/* ADD AUTHORISATION */
router.patch('/update/admin/:id', async (request, response) => {
  try {
    // creates object of keys from request body
    const updates = Object.keys(request.body);
    // so as to limit update to only allowed updates: userTagLine
    const allowedUpdates = ['email', 'name', 'businessUnit', 'lineManagerId', 'userPhotoKey', 'userTagLine', 'isFullUser', 'isLineManager', 'isSeniorManager', 'isAdmin'];

    // applies updated values to user object
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    // if trying to update a non-updatable field, return error
    if (!isValid) {
      return response.status(400).send({ error: 'Your intent is good but there is something in there that we can\'t update.' });
    }

    // otherwise... update
    const updateSelf = await User.findById(request.params.id);

    // if person does not exist, return error
    if (!updateSelf) {
      return response.status(404).send({ error: 'Hmm. We can\'t find that person.' });
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
router.delete('/delete/admin/:id', async (request, response) => {
  try {
    const result = await User.findByIdAndDelete(request.params.id);
    
    response.json({
      User: result
    });
    
  } catch (err) {
    errorSwtich(err, response);
  }
});



module.exports = router;