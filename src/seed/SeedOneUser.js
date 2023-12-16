require('dotenv').config();

const mongoose = require('mongoose');
const { databaseConnect, databaseClose } = require('../database');
const { User } = require('../models/UserModel');
const { logToFile } = require('../functions/logToFile');
const bcrypt = require('bcrypt');

databaseConnect().then(async () => {
  logToFile('=== SeedOneUser.js executed ===');
  logToFile('SeedOneUser,js: Creating user seed data!');
  console.log('=== SeedOneUser.js executed ===');
  console.log('SeedOneUser,js: Creating user seed data!')


});