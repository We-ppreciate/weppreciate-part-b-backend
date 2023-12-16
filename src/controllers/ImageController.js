// const express = require('express');
// const router = express.Router();
// require('dotenv').config();
// const { errorSwitch } = require('./ErrorController');
// const { logToFile } = require('../functions/logToFile');
// const { Storage } = require('@google-cloud/storage');
        

// let projectId = process.env.GOOGLE_PROJECT_ID;
// let keyFilename = process.env.GOOGLE_KEY_FILENAME;

// const storage = new Storage({ projectId, keyFilename });
// const bucketName = process.env.GOOGLE_BUCKET;
// const bucket = storage.bucket(bucketName);


//   // GET one image in a given folder
//   // eg for award image: GET localhost:3000/api-img/award/anima_cat.png
//   // eg for a profile image: GET localhost:3000/api-img/profile/00016-4146151794.png
// router.get('/:folder/:image', async (request, response) => {
//   try {
//     const image = `${request.params.folder}/${request.params.image}`;
//     const file = bucket.file(image);
//     const stream = file.createReadStream();
//     stream.on('error', (err) => {
//       // errorSwitch(err, response);
//       console.log(err);
//     });

//     response.setHeader('Content-Type', file.metadata.contentType || 'application/octet-stream');
//     stream.pipe(response);
//   } catch (err) {
//     // errorSwitch(err, response);
//     console.log(err);
//   }
// });


// module.exports = router;