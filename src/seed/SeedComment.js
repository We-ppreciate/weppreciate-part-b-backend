// const mongoose = require('mongoose');
// require('dotenv').config();

// const { databaseConnect, databaseClose } = require('../database');
// const { User } = require('../models/UserModel');
// const { Comment } = require('../models/CommentModel');


// const getId = async (email) => {
//   try {
//     const user = await User.findOne({ email: email });
//     return user ? user._id : null;
//   } catch (err) {
//     errorSwitch(err, response);
//   }
// }


// databaseConnect().then(async () => {
//   try {
//     const katieEmail = 'katie.lock@yourcompany.com';
//     const edEmail = 'ed.dougherty@yourcompany.com';
//     const nateEmail = 'nate.picone@yourcompany.com';

//     const katieId = await getId(katieEmail);
//     const edId = await getId(edEmail);
//     const nateId = await getId(nateEmail);

//     const edToKatie = new Comment({
//       nominationId: '657d7c34d8b97e77efe01955',
//       commenterId: edId,
//       commentBody: 'Nice work Katie!'
//     });

//     const nateToKatie = new Comment({
//       nominationId: '657d7c34d8b97e77efe01955',
//       commenterId: nateId,
//       commentBody: 'Nice work Katie!'
//     });

//     console.log(edToKatie, nateToKatie);


//     await Comment.insertMany([edToKatie, nateToKatie])
//   } catch (error) {
//     console.log(`SeedComment.js: ${error}`);
//   };

//   databaseClose();

// });

// module.exports = {
//   getId
// }

