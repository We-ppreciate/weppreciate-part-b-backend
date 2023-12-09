require('dotenv').config();

const mongoose = require('mongoose');
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
const { databaseConnect, databaseClose } = require('./database');
const { User } = require('./models/UserModel');
const { Nomination } = require('./models/NominationModel');
const { Comments } = require('./models/CommentModel');
const { logToFile } = require('./functions/logToFile');


/*
  This file is used to seed the database with some initial data.
  TODO: MAKE DRY
*/


databaseConnect().then(async () => {
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
  logToFile("=== seed.js executed ===");
  logToFile("seed,js: Creating user seed data!");


  /* USER SEED DATA */
  
  const natePicone = new User({
    _id: new mongoose.Types.ObjectId(),
    name: "Nate Picone",
    email: `nate.picone@yourcompany.com`,
    businessUnit: "Business Services",
    passwordHash: "replacethiswithhash",
    lineManagerId: null,
    userTagLine: "Tell me your access issue and I will make it go away.",
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
    userPhotoKey: 'replacewithURL',

    isFullUser: true,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: false,
  });

  natePicone.upn = natePicone.email.split('@')[0];

  await natePicone.save().then(() => {
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
    logToFile(`seed.js: ${natePicone.name} saved, with id ${natePicone._id}\n${natePicone}`);
  });

  const edDougherty = new User({

    id: new mongoose.Types.ObjectId(),
    name: "Ed Dougherty",
    email: `ed.dougherty@yourcompany.com`,
    businessUnit: "Business Services",
    passwordHash: "replacethiswithhash",
    lineManagerId: null,
    userTagLine: "Building a better tomorrow, today.",
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
    userPhotoKey: 'replacewithURL',

    isFullUser: true,
    isLineManager: true,
    isSeniorManager: false,
    isAdmin: false,
  });

  edDougherty.upn = edDougherty.email.split('@')[0];

  await edDougherty.save().then(() => {
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
    logToFile(`seed.js: ${edDougherty.name} saved, with id ${edDougherty._id}\n${edDougherty}`);
  });

  const hannahSallows = new User({

    id: new mongoose.Types.ObjectId(),
    name: "Hannah Sallows",
    email: `Hannah.Sallows@yourcompany.com`,
    businessUnit: "Business Services",
    passwordHash: "replacethiswithhash",
    lineManagerId: null,
    userTagLine: "Working collaboratively for moments that matter.",
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
    userPhotoKey: 'replacewithURL',

    isFullUser: true,
    isLineManager: true,
    isSeniorManager: true,
    isAdmin: false,
  });

  hannahSallows.upn = hannahSallows.email.split('@')[0];

  await hannahSallows.save().then(() => {
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
    logToFile(`seed.js: ${hannahSallows.name} saved, with id ${hannahSallows._id}\n${hannahSallows}`);
  });

  const katieLock = new User({

    id: new mongoose.Types.ObjectId(),
    name: "Katie Lock",
    email: `Katie.Lock@yourcompany.com`,
    businessUnit: "HR Business Partnership",
    passwordHash: "replacethiswithhash",
    lineManagerId: null,
    userTagLine: "Helping people achieve their goals.",
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
    userPhotoKey: 'replacewithURL',

    isFullUser: true,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: true,
  });

  katieLock.upn = katieLock.email.split('@')[0];

  await katieLock.save().then(() => {
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
    logToFile(`seed.js: ${katieLock.name} saved, with id ${katieLock._id}\n${katieLock}`);
  });

  // Update line manager details
  try {
    await User.findOneAndUpdate({ _id: natePicone._id }, { lineManagerId: edDougherty._id }, { new: true });
    logToFile(`seed.js: ${natePicone.name} updated, with line manager`);
  } catch (error) {
    logToFile(`seed.js: ${error}`);

  }    

  try {
    await User.findOneAndUpdate({ _id: edDougherty._id }, { lineManagerId: hannahSallows._id }, { new: true });
//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
    logToFile(`seed.js: ${edDougherty.name} updated, with line manager`);
  } catch (error) {
    logToFile(`seed.js: ${error}`);

  }  
  

  /* NOMINATION SEED DATA */

//     KL note: there was a code conflict here, included the version from node-boiler-plate branch
  // { 
  //   nomineeUser: User Object,
  //   nominatorFullUser: User Object,
  //   isNominatorFullUser: Boolean,
  //   nominatorBasicUser: {
  //     basicName: String,
  //     basicEmail: String,
  //   },
  //   isNominationInstant: Boolean,
  //   nominationValue: awardEnum
  //   nominationBody: String,
  //   isAward: Boolean,
  //   isReleased: Boolean,
  // }

  const instantNate = new Nomination({
    _id: new mongoose.Types.ObjectId(),
    nomineeUser: natePicone,
    nominatorFullUser: edDougherty,
    isNominatorFullUser: true,
    nominatorBasicUser: null,
    isNominationInstant: true,
    nominationValue: "Commitment",
    nominationBody: "Nate is a great guy!",
    isAward: false,
    isReleased: false,
  });

  await instantNate.save().then(() => {
    logToFile(`seed.js: Award for ${instantNate.nomineeUser.name} saved, with id ${instantNate._id}\n${instantNate}`);
  });

  databaseClose();


});

