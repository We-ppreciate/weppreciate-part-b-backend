// const express = require('express');
// const { logToFile } = require('../functions/logToFile');


// // Error handling switch
// const errorSwitch = (err, response) => {
//   // let statusCode = 500;


//   // let message = `Sorry. That\'s a problem on our side. Look like Mavis spilled her tea on the server. ${err}`;

// //   switch (err) {
// //     case 400:
// //       statusCode = 400;
// //       message = `Your intent is good but the request was bad. ${err}`;
// //       break;
// //     case 403:
// //       statusCode = 403;
// //       message = `You are not authorised to do that. We'pologise. ${err}`;
// //       break;
// //     case 404:
// //       statusCode = 404;
// //       message = `This is not the page you are looking for. ${err}`;
// //       break;
// //     default:
// //       statusCode = 500;
// //       message = `Sorry. That's a problem on our side. Mavis is looking into it now... well, after her tea. ${err}`
// //       break;      
// //     };

      
// //   response.status(statusCode).json({ message: message });
// //   logToFile(`UserController.js: ${err}`);
// //   console.log(`UserController.js: ${err}`);

// // };

// module.exports = {
//   errorSwitch
// };

