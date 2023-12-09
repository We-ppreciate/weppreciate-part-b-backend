const express = require('express');
const router = express.Router();
const { User } = require('../models/UserModel');
const { logToFile } = require('../functions/logToFile');

// Error handling switch
const errorSwtich = (err) => {
  switch (err) {
    case 400:
      response.status(400).json({ message: `Your intent is good but the request was bad. ${err}` });
      logToFile(`UserController.js: ${err}`);
      break;
    case 403:
      response.status(403).json({ message: `You are not authorised to do that. We'pologise. ${err}` });
      logToFile(`UserController.js: ${err}`);
      break;
    case 404:
      response.status(404).json({ message: `This is not the page you are looking for. ${err}` });
      logToFile(`UserController.js: ${err}`);
      break;
    default:
      response.status(500).json({ message: `Sorry. That's a problem on our side. Mavis is looking into it now... well, after her tea. ${err}` });
      logToFile(`UserController.js: ${err}`);
      break;
  }
}

/* === USER GET ROUTES === */

// GET all users in db
router.get('/all', async (request, response) => {
  try {
    const result = await User.find({});
    
    response.json({
      Users: result
    });
    
  } catch (err) {
    errorSwtich(err);
  }
});


// GET all FULL users in db
router.get('/all/fullusers', async (request, response) => {
  try {
    const result = await User.find({isFullUser: true});
    
    response.json({
      Users: result
    });
    
  } catch (err) {
    errorSwtich(err);
  }
});


// GET user by id
router.get('/one/:id', async (request, response) => {
  try {
    const result = await User.findById(request.params.id);
    
    response.json({
      User: result
    });
    
  } catch (err) {
    errorSwtich(err);
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
    errorSwtich(err);
  }
});


/* === USER POST ROUTES === */




module.exports = router;