const express = require('express');
const router = express.Router();
const { errorSwitch } = require('./ErrorController');

// const { logToFile } = require('../functions/logToFile');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');

require('dotenv').config();

let users = [];
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION;

router.get('/user', async (request, response) => {
  try {
    // Authenticate User
    response.json(users)
  } catch (err) {
    errorSwitch(err, response);
  }
});

/* === POST === */


// POST login
// eg POST localhost:3000/auth/login

router.post('/login', async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email }).select('+passwordHash');
    
    if (!user) {
      return response.status(400).send('User not found.');
    }
    
    const isPasswordMatch = await bcrypt.compare(request.body.password, user.passwordHash);
    
    if (isPasswordMatch) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: jwtExpiration, algorithm: 'HS256' });
      
      // Send token in response
      response.json({ token });
    } else {
      response.status(400).send('Invalid credentials');
    }
  } catch(err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

/* WAS: 

router.post('/login', async (request, response) => {
  const user = await User.findOne({ email: request.body.email }).select('+passwordHash');
  response.json({
    User: user
  });
  console.log(User);
  console.log(`pre-compare: ${user.passwordHash}`)
  // change to basic user route
  if (!user) {
    return response.status(400).send('User not found.');
  }
  try {
    let bodyPasswordHash = await bcrypt.hash(request.body.password, 10);
    console.log(`body: ${bodyPasswordHash}; user: ${user.passwordHash}`);
    const isPasswordMatch = await bcrypt.compare(bodyPasswordHash, user.passwordHash);
    if (isPasswordMatch) {
      response.send('Success');
    } else {
      response.status(400).send('Invalid credentials');
    }
  } catch(err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }

  
});
*/


module.exports = router;