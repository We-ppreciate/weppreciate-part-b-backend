
const express = require('express');

// make a server instance 
const app = express();



// Enables request.body to be raw JSON data 
app.use(express.json());

// root API response
app.get("/", (request, response) => {
	response.json({
		message:"Hello to all who value their people!"
	});
});



module.exports = {
	app
}