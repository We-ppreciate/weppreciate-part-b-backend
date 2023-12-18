const express = require('express');
const { logToFile } = require('../functions/logToFile');


// Error handling switch
const errorSwitch = (err, response) => {
  let statusCode = err.status || 500;

  let message = `Sorry. That\'s a problem on our side. Look like Mavis spilled her tea on the server. ${err.message}`;

  switch (err) {
    case 400:
      statusCode = 400;
      message = `Your intent is good but the request was bad. ${err.status}`;
      break;
    case 403:
      statusCode = 403;
      message = `You are not authorised to do that. We'pologise. ${err.status}`;
      break;
    case 404:
      statusCode = 404;
      message = `This is not the page you are looking for. ${err.status}`;
      break;
    default:
      statusCode = 500;
      message = `Sorry. That's a problem on our side. Mavis is looking into it now... well, after her tea. ${err.status}`
      break;      
    };

      
  response.status(statusCode).json({ message: message });
  logToFile(`UserController.js: ${err.status}, ${err.message}`);
  console.log(`UserController.js: ${err.status}, ${err.message}`);

};


module.exports = {
  errorSwitch
};

