require('dotenv').config();
const { databaseConnect, databaseClose } = require('../database');
const { User } = require('../models/UserModel');
const { Nomination } = require('../models/NominationModel');
const { Comment } = require('../models/CommentModel');
const { Category } = require('../models/CategoryModel');
const { errorSwitch } = require('../controllers/ErrorController');


/* MOVE TO DATABASE.JS? */


async function dropCpllection (collection, name) {
  try {
    await collection.collection.drop();
    console.log(`dropdb.js: ${name} collection dropped`);
  } catch (err) {
    console.log(`dropdb.js: Failed to drop ${name} collection: ${err}`);
  } 
}

async function dropAllCollections() {
  console.log("dropdb.js: === drop collections executed ===");

  try {
    await databaseConnect();
  } catch (err) {
    console.log('Failed to connect to database:', err);
    return;
  }

  await dropCpllection(User, 'User');
  await dropCpllection(Nomination, 'Nomination');
  await dropCpllection(Comment, 'Comment');
  await dropCpllection(Category, 'Category');

  await databaseClose();
}

dropAllCollections();



