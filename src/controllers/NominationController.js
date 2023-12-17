const express = require('express');
const router = express.Router();
const { Nomination } = require('../models/NominationModel');
const { User } = require('../models/UserModel');
const { logToFile } = require('../functions/logToFile');

const auth = require('../functions/verifyToken');



// /* REMOVE IF NOT BROKEN */


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
  router.get('/all', auth, async (request, response) => {
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
  router.get('/all/recipient/:id', auth, async (request, response) => {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).send({ error: 'ID not provided.' });
      }
      const result = await Nomination.find({recipientUser: id});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwtich(err, response);
    }
  });

  /* WAS:
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
  */

  // GET all nominations by nominator fullUser name or basicUser name
  // eg GET localhost:3000/nominations/all/nominator/name/ed/dogherty

router.get('/all/nominator/:firstName/:lastName', auth, async (request, response) => {
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
      })
    };
  
    response.json({
      Nominations: result
    });
  } catch (err) {
    errorSwtich(err, response);
  }
});


  // TODO GET all released nominations


  // TODO GET all unreleased nominations


  // TODO GET all instant nominations


  // GET one nomination by nominator id
  // eg GET localhost:3000/nominations/one/nominator/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/one/nominator/:id', auth, async (request, response) => {
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
  router.get('/one/recipient/:id', auth, async (request, response) => {
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
  router.get('/one/nomination/:id', auth, async (request, response) => {
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
  router.get('/all/nominator/:id', auth, async (request, response) => {
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


/* === NOMINATION POST ROUTES === */


// POST new nomination
// eg: POST localhost:3000/nominations/new
/* ADD AUTHORISATION */

  // JSON Template:
  // { 
  //   "recipientUser": ,
  //   "nominatorFullUser": ,
  //   "nominatorBasicUser": {
  //     "basicName": {
  //       "first": ,
  //       "last": ,
  //     },
  //     "basicEmail": ,
  //   },
  //   "nominationValue": ,
  //   "nominationBody": ,
  //   "nominationDate": ,
  //   "isNominatorFullUser": ,
  //   "isNominationInstant": ,
  //   "isAward": ,
  //   "isReleased": ,
  //   "releaseDate": ,
  // }


router.post('/new', auth, async (request, response) => {

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


/* === NOMINATION PATCH ROUTES === */


// TODO Add authorisation
// PATCH SnrMgr and Admin to promote from nomination to award
// eg: PATCH localhost:3000/nominations/update/nom/5f2f8e3d2b8e9a0017b0e9f0
router.patch('/update/nom/:id', auth, async (request, response) => {
  try {
    // creates object of keys from request body
    const updates = Object.keys(request.body);
    // so as to limit update to only allowed updates: userTagLine
    const allowedUpdates = ['isAward', 'isReleased', 'releaseDate'];

    // applies updated values to user object
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    // if trying to update a non-updatable field, return error
    if (!isValid) {
      return response.status(400).send({ error: 'Your intent is good but there is something in there that we can\'t update.' });
    }

    // otherwise... update
    const updateAward = await Nomination.findById(request.params.id);

    // if person does not exist, return error
    if (!updateAward) {
      return response.status(404).send({ error: 'Hmm. We can\'t find that nomination.' });
    }

    // otherwise... update
    updates.forEach((update) => updateAward[update] = request.body[update]);
    await updateAward.save();

    response.send(updateAward);

    response.json({
      Nominations: updateAward
    });

  } catch (err) {
    errorSwtich(err, response);
  }
});



/* === NOMINATION DELETE ROUTES === */

// DELETE admin by id
// eg DELETE localhost:3000/nominations/delete/5f2f8e3d2b8e9a0017b0e9f0
router.delete('/delete/:id', auth, async (request, response) => {
  try {
    const result = await Nomination.findByIdAndDelete(request.params.id);

    if (!result) {
      return response.status(404).send({ error: 'Hmm. We can\'t find that nomination.' });
    }

    response.json({
      Nominations: result
    });

  } catch (err) {
    errorSwtich(err, response);
  }
});


module.exports = router;

