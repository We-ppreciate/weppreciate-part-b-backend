require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');

const jwtSecret = process.env.JWT_SECRET;

async function auth(request, response, next){
  const authHeader = request.header('Authorization');
  console.log(request.header('Authorization'));

  if(!authHeader) return response.status(401).send('Access denied');
  
  // Remove the 'Bearer ' prefix
  const token = authHeader.replace('Bearer ', '');

  console.log('Token:', token);
  const decoded = jwt.decode(token);

  // The `exp` claim represents the expiration time in seconds since the epoch
  const expirationTimeInSeconds = decoded.exp;

  // Convert the expiration time to a Date object
  const expirationDate = new Date(expirationTimeInSeconds * 1000);

  console.log('Expiration Time in Seconds:', expirationTimeInSeconds);
  console.log('Expiration Date:', expirationDate);


  try {
    const verified = jwt.verify(token, jwtSecret);
    request.user = verified;
    console.log('Verified:', verified);

    // add user id to request, for route restrictions
    request.userId = verified.userId;

    next();
  } catch(error) {
    response.status(400).send('Invalid token');
    console.log('Error:', error);
  }
}



module.exports = auth;