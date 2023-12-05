require('dotenv').config();

const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
const { User } = require('./models/UserModel');
const { Nominations } = require('./models/NominationModel');
const { Comments } = require('./models/CommentModel');

/*
  This file is used to seed the database with some initial data.
  TODO: MAKE DRY
*/


databaseConnect().then(async () => {
  
  console.log("Creating user seed data!");

  /* USER SEED DATA */
  
  const natePicone = new User({
    _id: new mongoose.Types.ObjectId(),
    name: "Nate Picone",
    email: `nate.picone@yourcompany.com`,
    businessUnit: "Business Services",
    passwordHash: "replacethiswithhash",
    lineManagerId: null,
    userTagLine: "Tell me your access issue and I will make it go away.",
    userPhoto: 'replacewithURL',
    isFullUser: true,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: false,
  });

  natePicone.upn = natePicone.email.split('@')[0];

  await natePicone.save().then(() => {
    console.log(`${natePicone.name} saved, with id ${natePicone._id}`);
  });

  let edDougherty = new User({
    id: new mongoose.Types.ObjectId(),
    name: "Ed Dougherty",
    email: `ed.dougherty@yourcompany.com`,
    businessUnit: "Business Services",
    passwordHash: "replacethiswithhash",
    lineManagerId: null,
    userTagLine: "Building a better tomorrow, today.",
    userPhoto: 'replacewithURL',
    isFullUser: true,
    isLineManager: true,
    isSeniorManager: false,
    isAdmin: false,
  });

  edDougherty.upn = edDougherty.email.split('@')[0];

  await edDougherty.save().then(() => {
    console.log(`${edDougherty.name} saved, with id ${edDougherty._id}`);
  });

  let hannahSallows = new User({
    id: new mongoose.Types.ObjectId(),
    name: "Hannah Sallows",
    email: `Hannah.Sallows@yourcompany.com`,
    businessUnit: "Business Services",
    passwordHash: "replacethiswithhash",
    lineManagerId: null,
    userTagLine: "Working collaboratively for moments that matter.",
    userPhoto: 'replacewithURL',
    isFullUser: true,
    isLineManager: true,
    isSeniorManager: true,
    isAdmin: false,
  });

  hannahSallows.upn = hannahSallows.email.split('@')[0];

  await hannahSallows.save().then(() => {
    console.log(`${hannahSallows.name} saved, with id ${hannahSallows._id}`);
  });

  let katieLock = new User({
    id: new mongoose.Types.ObjectId(),
    name: "Katie Lock",
    email: `Katie.Lock@yourcompany.com`,
    businessUnit: "HR Business Partnership",
    passwordHash: "replacethiswithhash",
    lineManagerId: null,
    userTagLine: "Helping people achieve their goals.",
    userPhoto: 'replacewithURL',
    isFullUser: true,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: true,
  });

  katieLock.upn = katieLock.email.split('@')[0];

  await katieLock.save().then(() => {
    console.log(`${katieLock.name} saved, with id ${katieLock._id}`);
  });

  console.log(natePicone);
  console.log(edDougherty);
  console.log(hannahSallows);
  console.log(katieLock);

  // Update line manager details
  try {
    await User.findOneAndUpdate({ _id: natePicone._id }, { lineManagerId: edDougherty._id }, { new: true });
    console.log(`${natePicone.name} updated, with line manager`);
  } catch (error) {
    console.log(error);
  }    

  try {
    await User.findOneAndUpdate({ _id: edDougherty._id }, { lineManagerId: hannahSallows._id }, { new: true });
    console.log(`${edDougherty.name} updated, with line manager`);
  } catch (error) {
    console.log(error);
  }  
  

  /* NOMINATION SEED DATA */





  await mongoose.connection.close();
  console.log("Database disconnected!");


});

