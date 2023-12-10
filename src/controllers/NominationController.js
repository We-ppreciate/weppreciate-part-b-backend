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

  // GET all nominations by nominee id
  // eg GET localhost:3000/nominations/all/recipient/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/all/recipient/:id', async (request, response) => {
    try {
      const result = await Nomination.find({nomineeRecipient: request.params.id});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwtich(err, response);
    }
  });


  // GET all nominations by nominator fullUser name or basicUser name
  // eg GET localhost:3000/nominations/all/nominator/name/ed/dogherty



  // GET all nominations sent in a month


  // GET all latest 30 nominations


  // GET one nomination by nomination id


  // GET one nomination by recipient id
  // eg GET localhost:3000/nominations/one/recipient/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/one/recipient/:id', async (request, response) => {
    try {
      const result = await Nomination.find({recipientUser: request.params.id});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwtich(err, response);
    }
  });


  // GET one nomination by nominator id
  // eg GET localhost:3000/nominations/one/nominator/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/one/nominator/:id', async (request, response) => {
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