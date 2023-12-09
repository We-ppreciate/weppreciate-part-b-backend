const mongoose = require('mongoose');
const { User } = require('./models/UserModel');
const { databaseConnect, databaseClose } = require('./database');
const { logToFile } = require('./functions/logToFile');
const { Nomination } = require('./models/NominationModel');
require('dotenv').config();


/* MOVE TO DATABASE.JS? */

async function dropUserCollection() {
  logToFile("dropdb.js: === dropUserCollection executed ===");
  try {
    await databaseConnect({ useNewUrlParser: true, useUnifiedTopology: true });
    // drop user collection
    await User.collection.drop();
    logToFile("dropbdb.js: User collection dropped");
    // drop nomination collection
    await Nomination.collection.drop();
    logToFile("dropbdb.js: Nomination collection dropped");
  } catch (err) {
    logToFile('Failed to drop User collection:', err);
  } finally {
    await databaseClose();
  }
}


dropUserCollection();
