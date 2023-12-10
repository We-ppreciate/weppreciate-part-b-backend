const express = require('express');
const router = express.Router();
const { Nomination } = require('../models/NominationModel');
const { User } = require('../models/UserModel');
const { logToFile } = require('../functions/logToFile');

// Error handling switch
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


  /* === NOMINATION GET ROUTES === */


  // GET all nominations in db
  // eg GET localhost:3000/nominations/all/
  router.get('/all', async (request, response) => {
    try {
      const result = await Nomination.find({});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwtich(err, response);
    }
  });

  // GET all nominations by recipient id
  // eg GET localhost:3000/nominations/all/recipient/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/all/recipient/:id', async (request, response) => {
    try {
      const result = await Nomination.find({recipientUser: request.params.id});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwtich(err, response);
    }
  });


  // GET all nominations by nominator fullUser name or basicUser name
  // eg GET localhost:3000/nominations/all/nominator/name/ed/dogherty

router.get('/all/nominator/:firstName/:lastName', async (request, response) => {
  const { firstName, lastName } = request.params;

  try {
    // Find the user with matching first and last name
    const user = await User.findOne({ 
      'name.first': { $regex: new RegExp(`^${firstName}$`, 'i') }, 
      'name.last': {$regex: new RegExp(`^${lastName}$`, 'i') } 
    });
  
    // Find nominations where the user is the nominator
    let result = [];
  
    if (!user) {
      result = await Nomination.find({
        'nominatorBasicUser.basicName.first': { $regex: new RegExp(`^${firstName}$`, 'i') }, 
        'nominatorBasicUser.basicName.last': {$regex: new RegExp(`^${lastName}$`, 'i') } 
      });
    } else {
      result = await Nomination.find({
        $or: [
          { nominatorFullUser: user.id },
          {
            'nominatorBasicUser.basicName.first': { $regex: new RegExp(`^${firstName}$`, 'i') },
            'nominatorBasicUser.basicName.last': {$regex: new RegExp(`^${lastName}$`, 'i') } 
          }
        ]
      });
    }
  
    response.json({
      Nominations: result
    });
  } catch (err) {
    errorSwtich(err, response);
  }
});


  // GET all released nominations


  // GET all unreleased nominations


  // GET all instant nominations


  // GET one nomination by nominator id
  // eg GET localhost:3000/nominations/one/nominator/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/one/nominator/:id', async (request, response) => {
    try {
      const result = await Nomination.findOne({nominatorFullUser: request.params.id});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwtich(err, response);
    }
  });


  // GET one nomination by recipient id
  // eg GET localhost:3000/nominations/one/recipient/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/one/recipient/:id', async (request, response) => {
    try {
      const result = await Nomination.findOne({recipientUser: request.params.id});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwtich(err, response);
    }
  });


  // GET one nomination by nomination id
  // eg GET localhost:3000/nominations/one/nomination/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/one/nomination/:id', async (request, response) => {
    try {
      const result = await Nomination.findOne({_id: request.params.id});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwtich(err, response);
    }
  });


  // GET all nominations by nominator id
  // eg GET localhost:3000/nominations/one/nominator/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/all/nominator/:id', async (request, response) => {
    try {
      const result = await Nomination.find({nominatorFullUser: request.params.id});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwtich(err, response);
    }
  });

module.exports = router;


  /* === NOMINATION GET POST === */

// POST new nomination
// eg: POST localhost:3000/nominations/new
/* ADD AUTHORISATION */
router.post('/new', async (request, response) => {
  try {
    const { recipientUser, nominatorFullUser } = request.body;
    
    // Check if recipientUser is equal to nominatorFullUser
    if (recipientUser === nominatorFullUser) {
      response.status(400).json({
        message: 'Nominating yourself? That\'s a bit cheeky.'
      });
      return;
    }

    const newNomination = new Nomination(request.body);
    const result = await newNomination.save();
    
    response.json({
      User: result
    });
    
  } catch (err) {
    errorSwtich(err, response);
  }
});