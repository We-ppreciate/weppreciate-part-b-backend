// This file handles the start up of the server and the parameters 


require('dotenv').config();

const { databaseConnect } = require('./database');
const { app } = require('./server');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	await databaseConnect();
	console.log("We'ppreciate you starting us up!");
});