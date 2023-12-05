
const mongoose = require('mongoose');

async function databaseConnect(){
	try {
		// DB connection can take some time, eg. if DB is in the cloud 
		console.log(`Connecting to:\n[login details]@${process.env.DB_PART_URI}`);
		await mongoose.connect(process.env.DB_URI);
		console.log("Database connected");
	} catch (error) {
		console.warn(`=== ERROR ===\ndatabaseConnect failed to connect to DB:\n${JSON.stringify(error)}\n===`);
	}
};

async function databaseClose(){
	try {
		await mongoose.connection.close();
		console.log("Database closed");
	} catch (error) {
		console.warn(`=== ERROR ===\ndatabaseClose failed to close DB connection:\n${JSON.stringify(error)}\n===`);
	}
};

async function databaseDrop(){
	try {
		await mongoose.connection.dropDatabase();
		console.log("Database dropped");
	} catch (error) {
		console.warn(`=== ERROR ===\ndatabaseDrop failed to drop DB:\n${JSON.stringify(error)}\n===`);
	}
};

module.exports = {
	databaseConnect
}