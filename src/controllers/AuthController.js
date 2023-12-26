require('dotenv').config();
const express = require('express');
const router = express.Router();
const { errorSwitch } = require('./ErrorController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');
const auth = require('../functions/verifyToken');
const { validatePassword } = require('../validations/AuthValidation');


const jwtSecret = process.env.JWT_SECRET;


/* === POST === */


// POST login
// eg POST localhost:3000/auth/login

router.post('/login', async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email })
    // Explicitly selects passwordHash from document
    .select('_id name email businessUnit lineManagerId userTagLine userPhotoKey isFullUser isLineManager isSeniorManager isAdmin +passwordHash');
    
    if (!user) {
      return response.status(400).send('User not found.');
    }
    
    const isPasswordMatch = await bcrypt.compare(request.body.password, user.passwordHash);
    
    if (isPasswordMatch) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d', algorithm: 'HS256' });
      
      // Send token in response
      response.json({
        id: user._id, 
        name: user.name,
        email: user.email, 
        businessUnit: user.businessUnit,
        lineManagerId: user.lineManagerId,
        userTagLine: user.userTagLine,
        userPhotoKey: user.userPhotoKey,
        isFullUser: user.isFullUser,
        isLineManager: user.isLineManager,
        isSeniorManager: user.isSeniorManager,
        isAdmin: user.isAdmin,
        token
      });
    } else {
      response.status(401).send('Invalid credentials');
    }
  } catch(err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH password reset
// Required body fields: newPassword: string
// eg PATCH localhost:3000/auth/reset
const passwordResetScheme = router.patch('/reset/:id', auth, async (request, response) => {
  const { error, value } = validatePassword(request.body);

  if (error) {
    return response.status(400).send(error.details);
  }

  const requestorId = request.userId;
  const targetId = request.params.id;
  const newPassword = request.body.newPassword;
  
  try {
    const target = await User.findById(targetId);
    const requestor = await User.findById(requestorId);
    if (!target) {
      return response.status(400).send(`User ${target} not found.`);
    };
    if (!requestor) {
      return response.status(400).send(`User ${requestor} not found.`);
    };

    if (typeof newPassword !== 'string') {
      return response.status(400).send('Invalid password.');
    }

    if (requestorId == targetId || requestor.isAdmin) {
      target.passwordHash = bcrypt.hashSync(newPassword, 10);
      await target.save();
  
      return response.status(200).send('Password reset successful. With great passwords come great responsibility.');
    };

    return response.status(403).send('You are not authorised to do that. Wash your mouth with soap.');

  } catch (err) {
    errorSwitch(err, response);
  };
});


module.exports = router;