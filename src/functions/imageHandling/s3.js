require('dotenv').config();
const AWS = require('aws-sdk');
const { logToFile } = require('../logToFile');

const s3 = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
  Bucket: process.env.AWS_BUCKET_NAME
});


// Read photo from S3
const s3download = (key) => {
  return new Promise((resolve, reject) => {
    s3.createBucket({
      Bucket: s3.Bucket
    }, function () {
      s3.getObject(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          logToFile(`Successfully downloaded data ${key} from bucket ${s3.Bucket}`);
          resolve(data);
        }
      });
    });
  });
}




module.exports = {
  s3,
  s3download
}