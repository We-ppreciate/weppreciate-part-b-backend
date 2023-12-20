require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const { logToFile } = require('./functions/logToFile');



async function databaseConnect(){
	try {

		await mongoose.connect('mongodb+srv://weppreciate-admin:1ovF7VeKcBxVKyZW@weppreciate-intern.iqwpzfk.mongodb.net/?retryWrites=true&w=majority');

		mongoose.connection.on('connecting', function() {
			logToFile('database.js: Connecting to MongoDB...');
			console.log('database.js: Connecting to MongoDB...');
		});

		mongoose.connection.on('connected', function() {
				logToFile('database.js: Connected to MongoDB!');
				console.log('database.js: Connected to MongoDB!');
		});

		mongoose.connection.on('error', function(error) {
				logToFile(`database.js: Error in MongoDB connection: ${JSON.stringify(error)}`);
				console.log(`database.js: Error in MongoDB connection: ${JSON.stringify(error)}`);
		});

		mongoose.connection.on('disconnected', function() {
				logToFile('database.js: MongoDB disconnected!');
				console.log('database.js: MongoDB disconnected!');
		});


		if (mongoose.connection.readyState !== 1) {
			console.log('Mongoose is not connected to MongoDB');
		} else {
			console.log('Mongoose is connected to MongoDB');
		}

	} catch (error) {
		logToFile(`database.js: === ERROR ===\ndatabaseConnect failed to connect to DB:\n${JSON.stringify(error)}\n===`);
		console.log(`database.js: === ERROR ===\ndatabaseConnect failed to connect to DB:\n${JSON.stringify(error)}\n===`);
	}
};

async function databaseClose(){
	try {
		await mongoose.connection.close();

		logToFile("database.js: Database closed");
		logToFile("database.js: === END ===");
		console.log("database.js: Database closed");
		console.log("database.js: === END ===");
	} catch (error) {
		logToFile(`database.js: === ERROR ===\ndatabaseClose failed to close DB connection:\n${JSON.stringify(error)}\n===`);
		console.log(`database.js: === ERROR ===\ndatabaseClose failed to close DB connection:\n${JSON.stringify(error)}\n===`);
	}
};

async function databaseCollectionDrop(param){
	try {
		await mongoose.connection.dropCollection();
		logToFile("Collection dropped");
		console.log("Collection dropped");
	} catch (error) {
		logToFile(`database.js: === ERROR ===\ndatabaseCollectionDrop failed to drop Collection:\n${JSON.stringify(error)}\n===`);
		console.log(`database.js: === ERROR ===\ndatabaseCollectionDrop failed to drop Collection:\n${JSON.stringify(error)}\n===`);
	}
};

module.exports = {
	databaseConnect,
	databaseClose,
	databaseCollectionDrop
}