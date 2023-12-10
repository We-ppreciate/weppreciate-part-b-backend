const mongoose = require('mongoose');
const { User } = require('./models/UserModel');
const { databaseConnect, databaseClose } = require('./database');
const { logToFile } = require('./functions/logToFile');
const { Nomination } = require('./models/NominationModel');
require('dotenv').config();


/* MOVE TO DATABASE.JS? */


async function dropCollection() {
  logToFile("dropdb.js: === drop collections executed ===");
  console.log("dropdb.js: === drop collections executed ===");

  try {
    await databaseConnect({ useNewUrlParser: true, useUnifiedTopology: true });
    // drop user collection
    await User.collection.drop();
    logToFile("dropbdb.js: User collection dropped");
    console.log("dropbdb.js: User collection dropped");
    // drop nomination collection
    await Nomination.collection.drop();
    logToFile("dropbdb.js: Nomination collection dropped");
    console.log("dropbdb.js: Nomination collection dropped");
  } catch (err) {
    logToFile('Failed to drop User collection:', err);
    console.log('Failed to drop User collection:', err);
  } finally {
    await databaseClose();
  }
}


dropCollection();


