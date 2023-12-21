// This file handles the start up of the server and the parameters 
require('dotenv').config();

const { databaseConnect } = require('./database');
const { app } = require('./server');
const { errorSwitch } = require('./controllers/ErrorController');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {
	try {
		await databaseConnect();
		console.log(`index.js: Server started on port ${PORT}`);
		console.log('We\'ppreciate you starting us up!');
	} catch (err) {
    errorSwitch(err, response);
  }
});

module.exports = { 
	app
}