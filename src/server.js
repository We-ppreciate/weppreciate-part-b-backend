
const express = require('express');
const cors = require('cors');

// Enables cross-origin resource sharing
const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};

// make a server instance 
const app = express();

app.use(cors(corsOptions));

// Enables request.body to be raw JSON data 
app.use(express.json());

// ====================

const { logToFile } = require('./functions/logToFile');
const { User } = require('./models/UserModel');
const UserRouter = require('./controllers/UserController');
const { Nomination } = require('./models/NominationModel');
const NominationRouter = require('./controllers/NominationController');
const AuthRouter = require('./controllers/AuthController');



// root API response
app.get("/", (request, response) => {
	response.json({
		message:'You work hard. We\'ppreciate you.'
	});
});

// === MIDDLEWARE ===
app.use('/auth', AuthRouter);
app.use('/users', UserRouter);
app.use('/nominations', NominationRouter);



// GET ALL OTHER ROUTES
app.get('*', (request, response) => {
	response.json({
		message: 'This is not the page you are looking for.'
	});
	logToFile(`server.js: 404. ${request.url}`);
	console.log(`server.js: 404. ${request.url}`);
});

module.exports = {
	app
}