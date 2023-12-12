const express = require('express');
const router = express.Router();
require('dotenv').config(); 
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { logToFile } = require('../functions/logToFile');



const awsIamAccessKey = process.env.AWS_IAM_ACCESS_KEY
const awsIamUserSecret = process.env.AWS_IAM_USER_SECRET
const awsBucketName = process.env.AWS_BUCKET_NAME
const awsBucketRegion = 'ap-southeast-2'


const s3 = new S3Client({
	credentials: {
		accessKeyId: awsIamAccessKey,
		secretAccessKey: awsIamUserSecret
	},
	region: awsBucketRegion
});

S3Client.config.update({region: awsBucketRegion});


const errorSwtich = (err, response) => {
  let statusCode = 500;
  let message = `Sorry. That\'s a problem on our side. Look like Mavis spilled her tea on the server. ${err}`;

  switch (err) {
    case 400:
      statusCode = 400;
      message = `Your intent is good but the request was bad. ${err}`;
      break;
    case 403:
      statusCode = 403;
      message = `You are not authorised to do that. We'pologise. ${err}`;
      break;
    case 404:
      statusCode = 404;
      message = `This is not the page you are looking for. ${err}`;
      break;
    default:
      statusCode = 500;
      message = `Sorry. That's a problem on our side. Mavis is looking into it now... well, she will, after her tea. ${err}`
      break;      
  };

    response.status(statusCode).json({ message: message });
    logToFile(`UserController.js: ${err}`);
    console.log(`UserController.js: ${err}`);
};



router.get('/profile/:image', async (request, response) => {
	try {
		const result = await s3.send(new GetObjectCommand({
			Bucket: awsBucketName,
			Key: request.params.image,
			Body: 'This is a test',
      Region: awsBucketRegion
		}));

    const url = await getSignedUrl( s3, result, { expiresIn: 3600 } );
    result.imageUrl = url;

		response.json({
			message: result
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;