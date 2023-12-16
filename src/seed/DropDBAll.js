require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../models/UserModel');
const { databaseConnect, databaseClose } = require('../database');
const { logToFile } = require('../functions/logToFile');
const { Nomination } = require('../models/NominationModel');


/* MOVE TO DATABASE.JS? */


async function dropCollection() {
  logToFile("dropdb.js: === drop collections executed ===");
  console.log("dropdb.js: === drop collections executed ===");

  try {
    await databaseConnect();
  } catch (err) {
    logToFile('Failed to connect to database:', err);
    console.log('Failed to connect to database:', err);
    return;
  }

  try {
    // drop user collection
    await User.collection.drop();
    logToFile("dropdb.js: User collection dropped");
    console.log("dropdb.js: User collection dropped");
  } catch (err) {
    logToFile('Failed to drop User collection:', err);
    console.log('Failed to drop User collection:', err);
  }

  try {
    // drop nomination collection
    await Nomination.collection.drop();
    logToFile("dropdb.js: Nomination collection dropped");
    console.log("dropdb.js: Nomination collection dropped");
  } catch (err) {
    logToFile('Failed to drop Nomination collection:', err);
    console.log('Failed to drop Nomination collection:', err);
  } finally {
    await databaseClose();
  }
}

dropCollection();


