const express = require('express');


// Error handling switch
const errorSwitch = (err, response) => {
  let statusCode = err.status || 500;

  let message = `Sorry. That\'s a problem on our side. Look like Mavis spilled her tea on the server. ${statusCode}, ${err.message}`;

  switch (statusCode) {
    case 400:
      statusCode = 400;
      message = `Your intent is good but the request was bad. ${statusCode}, ${err.message}`;
      break;
    case 401:
      statusCode = 401;
      message = `It looks like I'm missing your login credentials. Let's have another go. ${statusCode}, ${err.message}`;
      break;
    case 403:
      statusCode = 403;
      message = `You are not authorised to do that. We'pologise. ${statusCode}, ${err.message}`;
      break;
    case 404:
      statusCode = 404;
      message = `This is not the page you are looking for. ${statusCode}, ${err.message}`;
      break;
    default:
      statusCode = 500;
      message = `Sorry. That's a problem on our side. Mavis is looking into it now... well, after her tea. ${statusCode}: ${err.message}`
      break;      
    };

  response.status(statusCode).json({ message: message });
  console.log(`UserController.js: ${statusCode}, ${err.message}`);

};


module.exports = {
  errorSwitch
};

