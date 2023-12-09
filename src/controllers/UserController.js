const express = require('express');
const router = express.Router();
const { User } = require('../models/UserModel');
const { logToFile } = require('../functions/logToFile');


// GET all users

router.get('/all', async (request, response) => {
  try {
    const result = await User.find({});
    
    response.json({
      Users: result
    });
  
  } catch (err) {
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
        response.status(500).json({ message: `Sorry. That's a problem on our side. Mavis is looking into it now. ${err}` });
        logToFile(`UserController.js: ${err}`);
        break;
    }
  }
});



module.exports = router;