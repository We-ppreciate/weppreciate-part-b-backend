const express = require('express');
const router = express.Router();
const { Nomination } = require('../models/NominationModel');
const { User } = require('../models/UserModel');
const auth = require('../functions/verifyToken');
const { validateNewNomination, validateUpdateNomination } = require('../validations/NominationValidation');
const { errorSwitch } = require('./ErrorController');

  /* === NOMINATION GET ROUTES === */


  // GET all nominations in db
  // eg GET localhost:3000/nominations/all/
  router.get('/all', auth, async (request, response) => {
    // find and return all nominations
    try {
      const result = await Nomination.find({});

      response.json({
        Nominations: result
      });
    } catch (err) {
      errorSwitch(err, response);
    }
  });

  // GET all nominations by recipient id
  // eg GET localhost:3000/nominations/all/recipient/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/all/recipient/:id', auth, async (request, response) => {
    const { id } = request.params;
    try {
      // if id not found
      if (!id) {
        return response.status(400).send({ 
          status: response.statusCode,
          error: 'ID not provided.' 
        });
      }
      // ... otherwise return
      const result = await Nomination.find({recipientUser: id});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwitch(err, response);
    }
  });


  // GET all nominations by nominator fullUser name or basicUser name
  // eg GET localhost:3000/nominations/all/nominator/name/ed/dogherty
  router.get('/all/nominator/:firstName/:lastName', auth, async (request, response) => {
    const { firstName, lastName } = request.params;

    try {
      // Find the full user with matching first and last name, case insensitive
      const user = await User.findOne({ 
        'name.first': { $regex: new RegExp(`^${firstName}$`, 'i') }, 
        'name.last': {$regex: new RegExp(`^${lastName}$`, 'i') } 
      });
    
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
      errorSwitch(err, response);
    }
  });


  // GET 20 nominations at a time with pagenation
  // eg GET localhost:3000/nominations/page/1
  router.get('/page/:page', auth, async (request, response) => {
    // sets the variable that determines the number of documents to skip, base 10
    const page = parseInt(request.params.page, 10);
    const limit = 20;
    const skip = (page - 1) * limit;
  
    try {
      const nominations = await Nomination.find()
      // descending order by date of nomination submission
      .sort({ nominationDate: -1 })
      // skips 20 * (page - 1) documents
      .skip(skip)
      // limits returned json to 20 documents
      .limit(limit);
      response.json({
        Nominations: nominations
      });
    } catch (err) {
      errorSwitch(err, response);
    }
  });


  // GET one nomination by nominator id
  // eg GET localhost:3000/nominations/one/nominator/5f2f8e3d2b8e9a0017b0e9f0
  router.get('/one/nominator/:id', auth, async (request, response) => {
    try {
      const result = await Nomination.findOne({nominatorFullUser: request.params.id});

      response.json({
        Nominations: result
      });

    } catch (err) {
      errorSwitch(err, response);
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
    errorSwitch(err, response);
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
      errorSwitch(err, response);
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
      errorSwitch(err, response);
    }
  });

  // module.exports = router;


/* === NOMINATION POST ROUTES === */


// POST new nomination

// JSON Template:
// { 
//     "recipientUser": ,
//     "nominatorFullUser": ,
//     "nominatorBasicUser": {
//         "basicName": {
//             "first": ,
//             "last": ,
//           },
//           "basicEmail": ,
//         },
//         "nominationValue": ,
//         "nominationBody": ,
//         "nominationDate": ,
//         "isNominatorFullUser": ,
//         "isNominationInstant": ,
//         "isAward": ,
//         "isReleased": ,
//         "releaseDate": ,
//       }

      
// eg: POST localhost:3000/nominations/new
router.post('/new', auth, async (request, response) => {
  const { error, value } = validateNewNomination(request.body);

  if (error) {  
    return response.status(400).send(error.details);
  }

  const _id = request.body.recipientUser;

  try {
    const checkExist = await User.findById(_id);
    if (!checkExist._id) {
      return response.status(404).send({ 
        status: response.statusCode,
        error: 'Hmm. We can\'t find that person. I\'ll check behind the couch' });
    };

    const { recipientUser, nominatorFullUser } = request.body;

    // Check if recipientUser is equal to nominatorFullUser
    if (recipientUser === nominatorFullUser) {
      return response.status(400).send({
        status: response.statusCode,
        error: 'Nominating yourself? That\'s a bit cheeky.'
      });
    }

    const newNomination = new Nomination(request.body);
    const result = await newNomination.save();
    
    response.json({
      Nomination: result
    });
    
    } catch (err) {
      errorSwitch(err, response);
    }
});


/* === NOMINATION PATCH ROUTES === */


/* accepts JSON body:
{
    "nominationId": string, required
    "isAward": boolean, optional
    "isReleased": boolean, optional
    "releaseDate": date (DD-MM-YYYY) or null
}
*/
// PATCH SnrMgr and Admin to promote from nomination to award
// eg: PATCH localhost:3000/nominations/update/nom/5f2f8e3d2b8e9a0017b0e9f0
router.patch('/update/nom/:id', auth, async (request, response) => {
  const _id = request.userId;
  const { error, value } = validateUpdateNomination(request.body);

  if (error) {  
    return response.status(400).send(error.details);
  }

  try {
    const requestor = await User.findById(_id);
    const nomination = await Nomination.findById(request.params.id);

    console.log(`admin: ${requestor.isAdmin}, snrMgr: ${requestor.isSeniorManager}`);

    if (!requestor.isSeniorManager && !requestor.isAdmin) {
      return response.status(403).send({ 
        status: response.statusCode,
        error: 'Your admin or senior manager has the access to update that. Please contact them. Also buy them a coffee. They deserve it.' 
      });
    }

    // Assigning validated request.body to User document
    Object.assign(nomination, request.body);
    await nomination.save();

    response.send(nomination);

  } catch (err) {
    errorSwitch(err, response);
  }
});



/* === NOMINATION DELETE ROUTES === */


// DELETE admin by id
// eg DELETE localhost:3000/nominations/delete/5f2f8e3d2b8e9a0017b0e9f0
router.delete('/delete/:id', auth, async (request, response) => {
  const _id = await Nomination.findById(request.params.id);
  const requestor = await User.findById(request.userId);
  console.log(`requestor: ${requestor}, _id: ${_id}`)
  try {
    
    if (!requestor.isAdmin) {
      return response.status(403).send({ 
        status: response.statusCode,
        error: 'Your admin has the access to update that. Please contact them, and buy them a coffee. They deserve it.' 
      });
    };
    
    const result = await Nomination.findByIdAndDelete(_id);
    
    if (!result) {
      // return response.status(404).send({ error: 'Hmm. We can\'t find that nomination.' });
      return response.status(404).send({ 
        status: response.statusCode,
        error: 'Hmm. We can\'t find that nomination.'
      });
    }
    
    response.json({
      Nominations: result
    });

  } catch (err) {
    errorSwitch(err, response);
  }
});


module.exports = router;

