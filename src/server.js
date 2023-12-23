
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

const UserRouter = require('./controllers/UserController');
const NominationRouter = require('./controllers/NominationController');
const AuthRouter = require('./controllers/AuthController');
const CommentRouter = require('./controllers/CommentController');


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
app.use('/comments', CommentRouter);


// GET ALL OTHER ROUTES
app.get('*', (request, response) => {
	response.status(404).json({
		error: 'This is not the page you are looking for.'
	});
});

module.exports = {
	app
}