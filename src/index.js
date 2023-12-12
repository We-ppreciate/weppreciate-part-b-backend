// This file handles the start up of the server and the parameters 


require('dotenv').config();

const { databaseConnect } = require('./database');
const { logToFile } = require('./functions/logToFile');
const { app } = require('./server');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	try {
		await databaseConnect();
		logToFile(`index.js: Server started on port ${PORT}`);
		console.log(`index.js: Server started on port ${PORT}`);
		console.log('We\'ppreciate you starting us up!');
	} catch (err) {
		logToFile(`index.js: ${err}`);
		console.log(`index.js: ${err}`);

		console.log(`We\'re sorry. There\'s a problem starting up. Mavis is looking into it now... well, she will, after her tea. ${err}`);
	}
});

module.exports = { 
	app
}