require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const { logToFile } = require('./functions/logToFile');

let dbUri = process.env.DB_URI;

async function databaseConnect(){
	try {

		await mongoose.connect(dbUri);

		mongoose.connection.on('connecting', function() {
			console.log('database.js: Connecting to MongoDB...');
		});

		mongoose.connection.on('connected', function() {
				console.log('database.js: Connected to MongoDB!');
		});

		mongoose.connection.on('error', function(error) {
				console.log(`database.js: Error in MongoDB connection: ${JSON.stringify(error)}`);
		});

		mongoose.connection.on('disconnected', function() {
				console.log('database.js: MongoDB disconnected!');
		});


		if (mongoose.connection.readyState !== 1) {
			console.log('Mongoose is not connected to MongoDB');
		} else {
			console.log('Mongoose is connected to MongoDB');
		}

	} catch (error) {
		console.log(`database.js: === ERROR ===\ndatabaseConnect failed to connect to DB:\n${JSON.stringify(error)}\n===`);
	}
};

async function databaseClose(){
	try {
		await mongoose.connection.close();

		console.log("database.js: Database closed");
		console.log("database.js: === END ===");
	} catch (error) {
		console.log(`database.js: === ERROR ===\ndatabaseClose failed to close DB connection:\n${JSON.stringify(error)}\n===`);
	}
};

async function databaseCollectionDrop(param){
	try {
		await mongoose.connection.dropCollection();
		console.log("Collection dropped");
	} catch (error) {
		console.log(`database.js: === ERROR ===\ndatabaseCollectionDrop failed to drop Collection:\n${JSON.stringify(error)}\n===`);
	}
};

module.exports = {
	databaseConnect,
	databaseClose,
	databaseCollectionDrop
}