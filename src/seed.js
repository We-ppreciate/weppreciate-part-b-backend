require('dotenv').config();

const mongoose = require('mongoose');
const { databaseConnect, databaseClose } = require('./database');
const { User } = require('./models/UserModel');
const { Nomination } = require('./models/NominationModel');
const { Comments } = require('./models/CommentModel');
const { logToFile } = require('./functions/logToFile');


/*
  USER SEED DATA

  This file is used to seed the database with some initial data.
  TODO: MAKE DRY
*/


// {
//   _id: objectId,
//   name: {
//    first: string,
//    last: string
//   },
//   email: string
//   businessUnit: string,
//   passwordHash: string,
//   lineManagerId: null, -> is added later, after line manager created
//   userTagLine: string,
//   userPhotoKey: stirng,
//   isFullUser: boolean,
//   isLineManager: boolean,
//   isSeniorManager: boolean,
//   isAdmin: boolean,
// }

databaseConnect().then(async () => {
  logToFile('=== seed.js executed ===');
  logToFile('seed,js: Creating user seed data!');
  console.log('=== seed.js executed ===');
  console.log('seed,js: Creating user seed data!')


  /* USER SEED DATA */
  
  const natePicone = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Nate',
      last: 'Picone'
    },

    email: `nate.picone@yourcompany.com`,
    businessUnit: 'Business Services',
    passwordHash: 'replacethiswithhash',
    lineManagerId: null,
    userTagLine: 'Tell me your access issue and I will make it go away.',
    userPhotoKey: 'replacewithURL',
    isFullUser: true,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: false,
  });

  natePicone.upn = natePicone.email.split('@')[0];

  await natePicone.save().then(() => {
    logToFile(`seed.js: ${natePicone.name} saved, with id ${natePicone._id}\n${natePicone}`);
    console.log(`seed.js: ${natePicone.name} saved, with id ${natePicone._id}\n${natePicone}`);
  });

  const edDougherty = new User({
    id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Ed',
      last: 'Dougherty'
    },

    email: `ed.dougherty@yourcompany.com`,
    businessUnit: 'Business Services',
    passwordHash: 'replacethiswithhash',
    lineManagerId: null,
    userTagLine: 'Building a better tomorrow, today.',
    userPhotoKey: 'replacewithURL',
    isFullUser: true,
    isLineManager: true,
    isSeniorManager: false,
    isAdmin: false,
  });

  edDougherty.upn = edDougherty.email.split('@')[0];

  await edDougherty.save().then(() => {
    logToFile(`seed.js: ${edDougherty.name} saved, with id ${edDougherty._id}\n${edDougherty}`);
    console.log(`seed.js: ${edDougherty.name} saved, with id ${edDougherty._id}\n${edDougherty}`);
  });

  const hannahSallows = new User({
    id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Hannah',
      last: 'Sallows'
    },
    email: `Hannah.Sallows@yourcompany.com`,
    businessUnit: 'Business Services',
    passwordHash: 'replacethiswithhash',
    lineManagerId: null,
    userTagLine: 'Working collaboratively for moments that matter.',
    userPhotoKey: 'replacewithURL',
    isFullUser: true,
    isLineManager: true,
    isSeniorManager: true,
    isAdmin: false,
  });

  hannahSallows.upn = hannahSallows.email.split('@')[0];

  await hannahSallows.save().then(() => {
    logToFile(`seed.js: ${hannahSallows.name} saved, with id ${hannahSallows._id}\n${hannahSallows}`);
    console.log(`seed.js: ${hannahSallows.name} saved, with id ${hannahSallows._id}\n${hannahSallows}`);
  });

  const katieLock = new User({
    id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Katie',
      last: 'Lock'
    },
    email: `Katie.Lock@yourcompany.com`,
    businessUnit: 'HR Business Partnership',
    passwordHash: 'replacethiswithhash',
    lineManagerId: null,
    userTagLine: 'Helping people achieve their goals.',
    userPhotoKey: 'replacewithURL',
    isFullUser: true,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: true,
  });

  katieLock.upn = katieLock.email.split('@')[0];

  await katieLock.save().then(() => {
    logToFile(`seed.js: ${katieLock.name} saved, with id ${katieLock._id}\n${katieLock}`);
    console.log(`seed.js: ${katieLock.name} saved, with id ${katieLock._id}\n${katieLock}`);
  });

  const jordanBenjamin = new User({
    id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Jordan',
      last: 'Benjamin'
    },
    email: `Jordan.Benjamin@yourcompany.com`,
    businessUnit: 'Art',
    passwordHash: 'replacethiswithhash',
    lineManagerId: null,
    userTagLine: 'Creating Beautiful things',
    userPhotoKey: 'replacewithURL',
    isFullUser: false,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: false,
  });

  jordanBenjamin.upn = jordanBenjamin.email.split('@')[0];

  await jordanBenjamin.save().then(() => {
    logToFile(`seed.js: ${jordanBenjamin.name} saved, with id ${jordanBenjamin._id}\n${jordanBenjamin}`);
    console.log(`seed.js: ${jordanBenjamin.name} saved, with id ${jordanBenjamin._id}\n${jordanBenjamin}`);
  });

  // Update line manager details
  try {
    await User.findOneAndUpdate({ _id: natePicone._id }, { lineManagerId: edDougherty._id }, { new: true });
    logToFile(`seed.js: ${natePicone.name} updated, with line manager`);
    console.log(`seed.js: ${natePicone.name} updated, with line manager`);
  } catch (error) {
    logToFile(`seed.js: ${error}`);
    console.log(`seed.js: ${error}`);
  }    

  try {
    await User.findOneAndUpdate({ _id: edDougherty._id }, { lineManagerId: hannahSallows._id }, { new: true });
    logToFile(`seed.js: ${edDougherty.name} updated, with line manager`);
    console.log(`seed.js: ${edDougherty.name} updated, with line manager`);
  } catch (error) {
    logToFile(`seed.js: ${error}`);
    console.log(`seed.js: ${error}`);
  }  
  

  /* NOMINATION SEED DATA */

  
  // { 
  //   recipientUser: User Object,
  //   nominatorFullUser: User Object,
  //   nominatorBasicUser: {
  //     basicName: {
  //       first: String,
  //       last: String
  //     },
  //     basicEmail: String,
  //   },
  //   nominationValue: awardEnum
  //   nominationBody: String,
  //   nominationDate: Date,
  //   isNominatorFullUser: Boolean,
  //   isNominationInstant: Boolean,
  //   isAward: Boolean,
  //   isReleased: Boolean,
  //   releaseDate: Date,
  // }

  const instantNate = new Nomination({
    _id: new mongoose.Types.ObjectId(),
    recipientUser: natePicone,
    nominatorFullUser: edDougherty,
    nominatorBasicUser: null,
    nominationValue: 'Commitment',
    nominationBody: 'Nate is a great guy!',
    nominationDate: '2023-12-09',
    isNominatorFullUser: true,
    isAward: false,
    isNominationInstant: true,
    isReleased: false,
    releaseDate: null
  });

  await instantNate.save().then(() => {
    logToFile(`seed.js: Award for ${instantNate.recipientUser.name} saved, with id ${instantNate._id}\n${instantNate}`);
    console.log(`seed.js: Award for ${instantNate.recipientUser.name} saved, with id ${instantNate._id}\n${instantNate}`);
  });

  const instantEd = new Nomination({
    _id: new mongoose.Types.ObjectId(),
    recipientUser: edDougherty,
    nominatorFullUser: katieLock,
    nominatorBasicUser: null,
    nominationValue: 'Commitment',
    nominationBody: 'Ed is also a great guy!',
    nominationDate: '2023-12-02',
    isNominatorFullUser: true,
    isAward: false,
    isNominationInstant: true,
    isReleased: false,
    releaseDate: null
  });

  await instantEd.save().then(() => {
    logToFile(`seed.js: Award for ${instantEd.recipientUser.name} saved, with id ${instantEd._id}\n${instantEd}`);
    console.log(`seed.js: Award for ${instantEd.recipientUser.name} saved, with id ${instantEd._id}\n${instantEd}`);

  });

  const nominateEd = new Nomination({
    _id: new mongoose.Types.ObjectId(),
    recipientUser: edDougherty,
    nominatorFullUser: null,
    nominatorBasicUser: {
      basicName: {
        first: 'Naomi',
        last: 'SkyCaptain',
      },
      basicEmail: 'naomi.skycaptain@yourcompany.com',
    },
    nominationValue: 'Challenging',
    nominationBody: 'Ed is a challenger!',
    nominationDate: '2023-12-10',
    isNominationInstant: false,
    isNominatorFullUser: false,
    isAward: false,
    isReleased: false,
    releaseDate: null
  });

  await nominateEd.save().then(() => {
    logToFile(`seed.js: Award for ${nominateEd.recipientUser.name} saved, with id ${nominateEd._id}\n${nominateEd}`);
    console.log(`seed.js: Award for ${nominateEd.recipientUser.name} saved, with id ${nominateEd._id}\n${nominateEd}`);
  });  

  const nominateKatie = new Nomination({
    _id: new mongoose.Types.ObjectId(),
    recipientUser: katieLock,
    nominatorFullUser: katieLock,
    nominatorBasicUser: null,
    nominationValue: 'Commitment',
    nominationBody: 'Katie deserves this because of the thing what she did at the time.',
    nominationDate: '2023-11-02',
    isNominatorFullUser: true,
    isAward: true,
    isNominationInstant: true,
    isReleased: true,
    releaseDate: null
  });

  await nominateKatie.save().then(() => {
    logToFile(`seed.js: Award for ${nominateKatie.recipientUser.name} saved, with id ${nominateKatie._id}\n${nominateKatie}`);
    console.log(`seed.js: Award for ${nominateKatie.recipientUser.name} saved, with id ${nominateKatie._id}\n${nominateKatie}`);
  });  

  /* TO DO: COMMENT SEED DATA */

  databaseClose();

});

