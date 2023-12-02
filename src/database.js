
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
}

module.exports = {
	databaseConnect
}