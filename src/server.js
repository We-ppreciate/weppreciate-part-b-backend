
const express = require('express');


// make a server instance 
const app = express();

// Enables request.body to be raw JSON data 
app.use(express.json());

// root API response
app.get("/", (request, response) => {
	response.json({
		message:'You work hard. We\'ppreciate you.'
	});
});

const { logToFile } = require('./functions/logToFile');

const { User } = require('./models/UserModel');
const UserRouter = require('./controllers/UserController');

app.use('/users', UserRouter);

const { Nomination } = require('./models/NominationModel');
const NominationRouter = require('./controllers/NominationController');

app.use('/nominations', NominationRouter);

// GET ALL OTHER ROUTES
app.get('*', (request, response) => {
	response.json({
		message: 'This is not the page you are looking for.'
	});
	logToFile(`server.js: 404.`);
});

module.exports = {
	app
}