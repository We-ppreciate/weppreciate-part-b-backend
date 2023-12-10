
const mongoose = require('mongoose');
const { logToFile } = require('./functions/logToFile');
require('dotenv').config();

async function databaseConnect(){
	try {
		// DB connection can take some time, eg. if DB is in the cloud 
		logToFile(`database.js: Connecting to: [login details]@${process.env.DB_PART_URI}`);
		console.log(`database.js: Connecting to: [login details]@${process.env.DB_PART_URI}`);
		await mongoose.connect(process.env.DB_URI);
		logToFile("database.js: Database connected");
		console.log("database.js: Database connected");
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