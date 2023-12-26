require('dotenv').config();
const mongoose = require('mongoose');
const { databaseConnect, databaseClose } = require('../database');
const { User } = require('../models/UserModel');
const { Nomination } = require('../models/NominationModel');
const { Comment } = require('../models/CommentModel');
const { Category } = require('../models/CategoryModel');
const bcrypt = require('bcrypt');


/* === Passwords for hashing on seed === */

let passwords = [
  {
    email: 'nate.picone@yourcompany.com',
    password: 'password456',
    passwordHash: null
  },
  {
    email: 'ed.dougherty@yourcompany.com',
    password: 'password456',
    passwordHash: null
  },
  {
    email: 'hannah.sallows@yourcompany.com',
    password: 'password456',
    passwordHash: null
  },
  {
    email: 'katie.lock@yourcompany.com',
    password: 'password456',
    passwordHash: null
  },
  {
    email: 'alex.greatbeard@yourcompany.com',
    password: 'password456',
    passwordHash: null
  },
  {
    email: 'carolina.reaper@yourcompany.com',
    password: 'password456',
    passwordHash: null
  },
  {
    email: 'sally.superstar@yourcompany.com',
    password: 'password456',
    passwordHash: null
  },
  {
    email: 'jo.newtown@yourcompany.com',
    password: 'password456',
    passwordHash: null
  },
  {
    email: 'jeevan.ng@yourcompany.com',
    password: 'password456',
    passwordHash: null
  }
]

const passwordHashForSeed = async () => {
  for (let i = 0; i < passwords.length; i++) {
    try {
      passwords[i].passwordHash = await bcrypt.hash(passwords[i].password, 10);
      
    } catch (error) {
      console.log(`seed.js: ${error}`);
    }
  }
  passwords.push(...passwords);
}

passwordHashForSeed();


async function seedUsers() {
  const natePicone = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Nate',
      last: 'Picone'
    },
    email: 'nate.picone@yourcompany.com',
    businessUnit: 'Business Services',
    passwordHash: passwords.find(obj => obj.email === 'nate.picone@yourcompany.com').passwordHash,
    lineManagerId: null,
    userTagLine: 'Tell me your access issue and I will make it go away.',
    userPhotoKey: 'replacewithURL',
    isFullUser: true,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: false,
  });

  const edDougherty = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Ed',
      last: 'Dougherty'
    },

    email: 'ed.dougherty@yourcompany.com',
    businessUnit: 'Business Services',
    passwordHash: passwords.find(obj => obj.email === 'ed.dougherty@yourcompany.com').passwordHash,
    lineManagerId: null,
    userTagLine: 'Building a better tomorrow, today.',
    userPhotoKey: 'replacewithURL',
    isFullUser: true,
    isLineManager: true,
    isSeniorManager: false,
    isAdmin: false,
  });

  const hannahSallows = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Hannah',
      last: 'Sallows'
    },
    email: 'Hannah.Sallows@yourcompany.com',
    businessUnit: 'Business Services',
    passwordHash: passwords.find(obj => obj.email === 'Hannah.Sallows@yourcompany.com').passwordHash,
    lineManagerId: null,
    userTagLine: 'Working collaboratively for moments that matter.',
    userPhotoKey: 'replacewithURL',
    isFullUser: true,
    isLineManager: true,
    isSeniorManager: true,
    isAdmin: false,
  });  

  const katieLock = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Katie',
      last: 'Lock'
    },
    email: 'Katie.Lock@yourcompany.com',
    businessUnit: 'HR Business Partnership',
    passwordHash: passwords.find(obj => obj.email === 'Katie.Lock@yourcompany.com').passwordHash,
    lineManagerId: null,
    userTagLine: 'Helping people achieve their goals.',
    userPhotoKey: 'replacewithURL',
    isFullUser: true,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: true,
  });

  const jordanBenjamin = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Jordan',
      last: 'Benjamin'
    },
    email: 'Jordan.Benjamin@yourcompany.com',
    businessUnit: 'Art',
    passwordHash: null,
    lineManagerId: null,
    userTagLine: 'Creating Beautiful things',
    userPhotoKey: 'replacewithURL',
    isFullUser: false,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: false,
  });

  const alexGreatbeard = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Alex',
      last: 'Greatbeard'
    },
    email: 'Alex.Greatbeard@yourcompany.com',
    businessUnit: 'Pokemon Development',
    passwordHash: passwords.find(obj => obj.email === 'Alex.Greatbeard@yourcompany.com').passwordHash,
    lineManagerId: null,
    userTagLine: 'One more than eight tendos',
    userPhotoKey: 'replacewithURL',
    isFullUser: true,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: false,
  });

  const carolinaReaper = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'carolina',
      last: 'reaper'
    },
    email: 'carolina.reaper@yourcompany.com',
    businessUnit: 'Business Services',
    passwordHash: passwords.find(obj => obj.email === 'carolina.reaper@yourcompany.com').passwordHash,
    lineManagerId: null,
    userTagLine: 'It\'s a bit chilly in here',
    userPhotoKey: 'replacewithURL',
    isFullUser: true,
    isLineManager: true,
    isSeniorManager: true,
    isAdmin: false,
  });

  const sallySuperstar = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Sally',
      last: 'Superstar'
    },
    email: 'sally.superstar@yourcompany.com',
    businessUnit: 'Business Services',
    passwordHash: passwords.find(obj => obj.email === 'sally.superstar@yourcompany.com').passwordHash,
    lineManagerId: null,
    userTagLine: 'I aim for a little better than average',
    userPhotoKey: 'https://storage.googleapis.com/weppreciate-store/profile/00080-1412353387.png',
    isFullUser: true,
    isLineManager: false,
    isSeniorManager: false,
    isAdmin: false,
  });

  const joNewtown = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Jo',
      last: 'Newton'
    },
    email: 'jo.newton@yourcompany.com',
    businessUnit: 'Business Services',
    passwordHash: passwords.find(obj => obj.email === 'jo.newton@yourcompany.com').passwordHash,
    lineManagerId: null,
    userTagLine: 'Motion is not negotiable',
    userPhotoKey: 'https://storage.googleapis.com/weppreciate-store/profile/00026-2935013661.png',
    isFullUser: true,
    isLineManager: true,
    isSeniorManager: false,
    isAdmin: true,
  });

  const jeevanNg = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      first: 'Jeevan',
      last: 'Ng'
    },
    email: 'jeevan.ng@yourcompany.com',
    businessUnit: 'Business Services',
    passwordHash: passwords.find(obj => obj.email === 'jeevan.ng@yourcompany.com').passwordHash,
    lineManagerId: null,
    userTagLine: 'Success is the culmination of effort.',
    userPhotoKey: 'https://storage.googleapis.com/weppreciate-store/profile/00048-1555748969.png',
    isFullUser: true,
    isLineManager: true,
    isSeniorManager: false,
    isAdmin: true,
  });

  const users = [natePicone, edDougherty, hannahSallows, katieLock, jordanBenjamin, alexGreatbeard, carolinaReaper, sallySuperstar, joNewtown, jeevanNg]

  try {
    const seedUsers = await User.insertMany(users);
    seedUsers.forEach(user => {
      console.log(`seed.js: ${user.name} saved, with id ${user._id}\n${user}`);
    });
  } catch (error) {
    console.log(`seed.js: ${error}`);
  };
};


/* === SEED FUNCTION STARTS === */

  /* === USER SEED DATA === */
  // {
  //   _id: objectId,
  //   name: {
  //    first: string,
  //    last: string
  //   },
  //   email: string
  //   businessUnit: string,
  //   passwordHash: string,
  //   lineManagerId: null, -> is added later, after line manager created
  //   userTagLine: string,
  //   userPhotoKey: string,
  //   isFullUser: boolean,
  //   isLineManager: boolean,
  //   isSeniorManager: boolean,
  //   isAdmin: boolean,
  // } 

  
//   const natePicone = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: {
//       first: 'Nate',
//       last: 'Picone'
//     },
//     email: 'nate.picone@yourcompany.com',
//     businessUnit: 'Business Services',
//     passwordHash: passwords.find(obj => obj.email === 'nate.picone@yourcompany.com').passwordHash,
//     lineManagerId: null,
//     userTagLine: 'Tell me your access issue and I will make it go away.',
//     userPhotoKey: 'replacewithURL',
//     isFullUser: true,
//     isLineManager: false,
//     isSeniorManager: false,
//     isAdmin: false,
//   });

//   await natePicone.save().then(() => {
//     console.log(`seed.js: ${natePicone.name} saved, with id ${natePicone._id}\n${natePicone}`);
//   });

//   const edDougherty = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: {
//       first: 'Ed',
//       last: 'Dougherty'
//     },

//     email: 'ed.dougherty@yourcompany.com',
//     businessUnit: 'Business Services',
//     passwordHash: passwords.find(obj => obj.email === 'ed.dougherty@yourcompany.com').passwordHash,
//     lineManagerId: null,
//     userTagLine: 'Building a better tomorrow, today.',
//     userPhotoKey: 'replacewithURL',
//     isFullUser: true,
//     isLineManager: true,
//     isSeniorManager: false,
//     isAdmin: false,
//   });

//   await edDougherty.save().then(() => {
//     console.log(`seed.js: ${edDougherty.name} saved, with id ${edDougherty._id}\n${edDougherty}`);
//   });

//   const hannahSallows = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: {
//       first: 'Hannah',
//       last: 'Sallows'
//     },
//     email: 'Hannah.Sallows@yourcompany.com',
//     businessUnit: 'Business Services',
//     passwordHash: passwords.find(obj => obj.email === 'Hannah.Sallows@yourcompany.com').passwordHash,
//     lineManagerId: null,
//     userTagLine: 'Working collaboratively for moments that matter.',
//     userPhotoKey: 'replacewithURL',
//     isFullUser: true,
//     isLineManager: true,
//     isSeniorManager: true,
//     isAdmin: false,
//   });


//   await hannahSallows.save().then(() => {
//     console.log(`seed.js: ${hannahSallows.name} saved, with id ${hannahSallows._id}\n${hannahSallows}`);
//   });

//   const katieLock = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: {
//       first: 'Katie',
//       last: 'Lock'
//     },
//     email: 'Katie.Lock@yourcompany.com',
//     businessUnit: 'HR Business Partnership',
//     passwordHash: passwords.find(obj => obj.email === 'Katie.Lock@yourcompany.com').passwordHash,
//     lineManagerId: null,
//     userTagLine: 'Helping people achieve their goals.',
//     userPhotoKey: 'replacewithURL',
//     isFullUser: true,
//     isLineManager: false,
//     isSeniorManager: false,
//     isAdmin: true,
//   });


//   await katieLock.save().then(() => {
//     console.log(`seed.js: ${katieLock.name} saved, with id ${katieLock._id}\n${katieLock}`);
//   });

//   const jordanBenjamin = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: {
//       first: 'Jordan',
//       last: 'Benjamin'
//     },
//     email: 'Jordan.Benjamin@yourcompany.com',
//     businessUnit: 'Art',
//     passwordHash: null,
//     lineManagerId: null,
//     userTagLine: 'Creating Beautiful things',
//     userPhotoKey: 'replacewithURL',
//     isFullUser: false,
//     isLineManager: false,
//     isSeniorManager: false,
//     isAdmin: false,
//   });

//   await jordanBenjamin.save().then(() => {
//     console.log(`seed.js: ${jordanBenjamin.name} saved, with id ${jordanBenjamin._id}\n${jordanBenjamin}`);
//   });

//   const alexGreatbeard = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: {
//       first: 'Alex',
//       last: 'Greatbeard'
//     },
//     email: 'Alex.Greatbeard@yourcompany.com',
//     businessUnit: 'Pokemon Development',
//     passwordHash: passwords.find(obj => obj.email === 'Alex.Greatbeard@yourcompany.com').passwordHash,
//     lineManagerId: null,
//     userTagLine: 'One more than eight tendos',
//     userPhotoKey: 'replacewithURL',
//     isFullUser: true,
//     isLineManager: false,
//     isSeniorManager: false,
//     isAdmin: false,
//   });

//   await alexGreatbeard.save().then(() => {
//     console.log(`seed.js: ${alexGreatbeard.name} saved, with id ${alexGreatbeard._id}\n${alexGreatbeard}`);
//   });

//   const carolinaReaper = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: {
//       first: 'carolina',
//       last: 'reaper'
//     },
//     email: 'carolina.reaper@yourcompany.com',
//     businessUnit: 'Business Services',
//     passwordHash: passwords.find(obj => obj.email === 'carolina.reaper@yourcompany.com').passwordHash,
//     lineManagerId: null,
//     userTagLine: 'It\'s a bit chilly in here',
//     userPhotoKey: 'replacewithURL',
//     isFullUser: true,
//     isLineManager: true,
//     isSeniorManager: true,
//     isAdmin: false,
//   });

//   await carolinaReaper.save().then(() => {
//     console.log(`seed.js: ${carolinaReaper.name} saved, with id ${carolinaReaper._id}\n${carolinaReaper}`);
//   });


// const sallySuperstar = new User({
//   _id: new mongoose.Types.ObjectId(),
//   name: {
//     first: 'Sally',
//     last: 'Superstar'
//   },
//   email: 'sally.superstar@yourcompany.com',
//   businessUnit: 'Business Services',
//   passwordHash: passwords.find(obj => obj.email === 'sally.superstar@yourcompany.com').passwordHash,
//   lineManagerId: null,
//   userTagLine: 'I aim for a little better than average',
//   userPhotoKey: 'https://storage.googleapis.com/weppreciate-store/profile/00080-1412353387.png',
//   isFullUser: true,
//   isLineManager: false,
//   isSeniorManager: false,
//   isAdmin: false,
// });

// await sallySuperstar.save().then(() => {
//   console.log(`seed.js: ${sallySuperstar.name} saved, with id ${sallySuperstar._id}\n${sallySuperstar}`);
// });

// const joNewtown = new User({
//   _id: new mongoose.Types.ObjectId(),
//   name: {
//     first: 'Jo',
//     last: 'Newton'
//   },
//   email: 'jo.newton@yourcompany.com',
//   businessUnit: 'Business Services',
//   passwordHash: passwords.find(obj => obj.email === 'jo.newton@yourcompany.com').passwordHash,
//   lineManagerId: null,
//   userTagLine: 'Motion is not negotiable',
//   userPhotoKey: 'https://storage.googleapis.com/weppreciate-store/profile/00026-2935013661.png',
//   isFullUser: true,
//   isLineManager: true,
//   isSeniorManager: false,
//   isAdmin: true,
// });

// await joNewtown.save().then(() => {
//   console.log(`seed.js: ${joNewtown.name} saved, with id ${joNewtown._id}\n${joNewtown}`);
// });

// const jeevanNg = new User({
//   _id: new mongoose.Types.ObjectId(),
//   name: {
//     first: 'Jeevan',
//     last: 'Ng'
//   },
//   email: 'jeevan.ng@yourcompany.com',
//   businessUnit: 'Business Services',
//   passwordHash: passwords.find(obj => obj.email === 'jeevan.ng@yourcompany.com').passwordHash,
//   lineManagerId: null,
//   userTagLine: 'Success is the culmination of effort.',
//   userPhotoKey: 'https://storage.googleapis.com/weppreciate-store/profile/00048-1555748969.png',
//   isFullUser: true,
//   isLineManager: true,
//   isSeniorManager: false,
//   isAdmin: true,
// });


// await joNewtown.save().then(() => {
//   console.log(`seed.js: ${jeevanNg.name} saved, with id ${jeevanNg._id}\n${jeevanNg}`);
// });



//   // Update line manager details separarely as user must exist before reference is created
//   // Updating individually to mitigate issues with any potential errors
//   try {
//     await User.findOneAndUpdate({ _id: natePicone._id }, { lineManagerId: edDougherty._id }, { new: true });
//     console.log(`seed.js: ${natePicone.name} updated, with line manager`);
    
//     await User.findOneAndUpdate({ _id: edDougherty._id }, { lineManagerId: hannahSallows._id }, { new: true });
//     console.log(`seed.js: ${edDougherty.name} updated, with line manager`);

//     await User.findOneAndUpdate({ _id: alexGreatbeard._id }, { lineManagerId: hannahSallows._id }, { new: true });
//     console.log(`seed.js: ${alexGreatbeard.name} updated, with line manager`);

//     await User.findOneAndUpdate({ _id: hannahSallows._id }, { lineManagerId: carolinaReaper._id }, { new: true });
//     console.log(`seed.js: ${hannahSallows.name} updated, with line manager`);

//     await User.findOneAndUpdate({ _id: sallySuperstar._id }, { lineManagerId: carolinaReaper._id }, { new: true });
//     console.log(`seed.js: ${sallySuperstar.name} updated, with line manager`);

//     await User.findOneAndUpdate({ _id: carolinaReaper._id }, { lineManagerId: joNewton._id }, { new: true });
//     console.log(`seed.js: ${carolinaReaper.name} updated, with line manager`);

//     await User.findOneAndUpdate({ _id: jeevanNg._id }, { lineManagerId: edDougherty._id }, { new: true });
//     console.log(`seed.js: ${jeevanNg.name} updated, with line manager`);


//   } catch (error) {
//     console.log(`seed.js: ${error}`);
//   } 
  

    /* FULL CATEGORY SEED DATA */
  
async function seedCategories() {
  const sayDo = new Category({
    categoryName: awardCategories[0],
    categoryDescription: 'Doing what you say',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const commitment = new Category({
    categoryName: awardCategories[1],
    categoryDescription: 'Having the commitment to follow through',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const collaborate = new Category({
    categoryName: awardCategories[2],
    categoryDescription: 'Collaborating like a boss',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const challenging = new Category({
    categoryName: awardCategories[3],
    categoryDescription: 'Challenging all the things',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const learning = new Category({
    categoryName: awardCategories[4],
    categoryDescription: 'Learning all the time',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const spirited = new Category({
    categoryName: awardCategories[5],
    categoryDescription: 'Fire spirit',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const instant = new Category({
    categoryName: awardCategories[6],
    categoryDescription: 'Instant thanks',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const awardCategories = [sayDo, commitment, collaborate, challenging, learning, spirited, instant];

  try {
    const seedCategories = await Category.insertMany(awardCategories)
    seedCategories.forEach(awardCategory => {
      console.log(`seed.js: ${awardCategory.categoryName} saved, with id ${awardCategory._id}\n${awardCategory}`);
    });
  } catch(error) {
    console.log(`seed.js: ${error}`);
  };
};



  /* NOMINATION SEED DATA */

  /* ==========
     ==========
       TO DO

     Break noms into function
     Create comments function
     Break comments into function
     Test drop db
     Test seed db

  */

  // { 
  //   recipientUser: User Object,
  //   nominatorFullUser: User Object,
  //   nominatorBasicUser: {
  //     basicName: {
  //       first: String,
  //       last: String
  //     },
  //     basicEmail: String,
  //   },
  //   nominationValue: awardEnum
  //   nominationBody: String,
  //   nominationDate: Date,
  //   isNominatorFullUser: Boolean,
  //   isNominationInstant: Boolean,
  //   isAward: Boolean,
  //   isReleased: Boolean,
  //   releaseDate: Date,
  // }

async function seedNominations() {

  const instantNate = new Nomination({
    _id: new mongoose.Types.ObjectId(),
    recipientUser: natePicone,
    nominatorFullUser: edDougherty,
    nominatorBasicUser: null,
    nominationValue: 'Commitment',
    nominationBody: 'Nate is a great guy!',
    nominationDate: '09-12-2023',
    isNominatorFullUser: true,
    isAward: false,
    isNominationInstant: true,
    isReleased: false,
    releaseDate: null
  });

  const instantEd = new Nomination({
    _id: new mongoose.Types.ObjectId(),
    recipientUser: edDougherty,
    nominatorFullUser: katieLock,
    nominatorBasicUser: null,
    nominationValue: 'Commitment',
    nominationBody: 'Ed is also a great guy!',
    nominationDate: '02-12-2023',
    isNominatorFullUser: true,
    isAward: false,
    isNominationInstant: true,
    isReleased: false,
    releaseDate: null
  });

  const nominateEd = new Nomination({
    _id: new mongoose.Types.ObjectId(),
    recipientUser: edDougherty,
    nominatorFullUser: null,
    nominatorBasicUser: {
      basicName: {
        first: 'Naomi',
        last: 'SkyCaptain',
      },
      basicEmail: 'naomi.skycaptain@yourcompany.com',
    },
    nominationValue: 'Challenging',
    nominationBody: 'Ed is a challenger!',
    nominationDate: '10-12-2023',
    isNominationInstant: false,
    isNominatorFullUser: false,
    isAward: false,
    isReleased: false,
    releaseDate: null
  });

  const nominateKatie = new Nomination({
    _id: new mongoose.Types.ObjectId(),
    recipientUser: katieLock,
    nominatorFullUser: edDougherty,
    nominatorBasicUser: null,
    nominationValue: 'Commitment',
    nominationBody: 'Katie deserves this because of the thing what she did at the time.',
    nominationDate: '02-11-2023',
    isNominatorFullUser: true,
    isAward: true,
    isNominationInstant: true,
    isReleased: true,
    releaseDate: null
  });

  const nominations = [instantNate, instantEd, nominateEd, nominateKatie];

  try {
    const seedNominations = await Nomination.insertMany(nominations)
    seedNominations.forEach(nomination => {
      console.log(`seed.js: ${nomination.recipientUser} saved, with id ${nomination._id}\n${nomination}`);
    });
  } catch(error) {
    console.log(`seed.js: ${error}`);
  };

};


  // const instantNate = new Nomination({
  //   _id: new mongoose.Types.ObjectId(),
  //   recipientUser: natePicone,
  //   nominatorFullUser: edDougherty,
  //   nominatorBasicUser: null,
  //   nominationValue: 'Commitment',
  //   nominationBody: 'Nate is a great guy!',
  //   nominationDate: '09-12-2023',
  //   isNominatorFullUser: true,
  //   isAward: false,
  //   isNominationInstant: true,
  //   isReleased: false,
  //   releaseDate: null
  // });

  // await instantNate.save().then(() => {
  //   console.log(`seed.js: Award for ${instantNate.recipientUser.name} saved, with id ${instantNate._id}\n${instantNate}`);
  // });

  // const instantEd = new Nomination({
  //   _id: new mongoose.Types.ObjectId(),
  //   recipientUser: edDougherty,
  //   nominatorFullUser: katieLock,
  //   nominatorBasicUser: null,
  //   nominationValue: 'Commitment',
  //   nominationBody: 'Ed is also a great guy!',
  //   nominationDate: '02-12-2023',
  //   isNominatorFullUser: true,
  //   isAward: false,
  //   isNominationInstant: true,
  //   isReleased: false,
  //   releaseDate: null
  // });

  // await instantEd.save().then(() => {
  //   console.log(`seed.js: Award for ${instantEd.recipientUser.name} saved, with id ${instantEd._id}\n${instantEd}`);

  // });

  // const nominateEd = new Nomination({
  //   _id: new mongoose.Types.ObjectId(),
  //   recipientUser: edDougherty,
  //   nominatorFullUser: null,
  //   nominatorBasicUser: {
  //     basicName: {
  //       first: 'Naomi',
  //       last: 'SkyCaptain',
  //     },
  //     basicEmail: 'naomi.skycaptain@yourcompany.com',
  //   },
  //   nominationValue: 'Challenging',
  //   nominationBody: 'Ed is a challenger!',
  //   nominationDate: '10-12-2023',
  //   isNominationInstant: false,
  //   isNominatorFullUser: false,
  //   isAward: false,
  //   isReleased: false,
  //   releaseDate: null
  // });

  // await nominateEd.save().then(() => {
  //   console.log(`seed.js: Award for ${nominateEd.recipientUser.name} saved, with id ${nominateEd._id}\n${nominateEd}`);
  // });  

  // const nominateKatie = new Nomination({
  //   _id: new mongoose.Types.ObjectId(),
  //   recipientUser: katieLock,
  //   nominatorFullUser: edDougherty,
  //   nominatorBasicUser: null,
  //   nominationValue: 'Commitment',
  //   nominationBody: 'Katie deserves this because of the thing what she did at the time.',
  //   nominationDate: '02-11-2023',
  //   isNominatorFullUser: true,
  //   isAward: true,
  //   isNominationInstant: true,
  //   isReleased: true,
  //   releaseDate: null
  // });

  // await nominateKatie.save().then(() => {
  //   console.log(`seed.js: Award for ${nominateKatie.recipientUser.name} saved, with id ${nominateKatie._id}\n${nominateKatie}`);
  // });  

  

  /* TO DO: COMMENT SEED DATA */

const seedComments = async () => {
  try {
    const instantEdComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      nominationId: instantEd._id,
      commenterId: katieLock._id,
      commentBody: 'Well deserved!'
    });

    const instantNateComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      nominationId: instantNate._id,
      commenterId: edDougherty._id,
      commentBody: 'I agree with this nomination!'
    });

    const nominateEdComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      nominationId: nominateEd._id,
      commenterId: katieLock._id,
      commentBody: 'Well done!'
    });

    const nominateKatieComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      nominationId: nominateKatie._id,
      commenterId: edDougherty._id,
      commentBody: 'Good job!'
    });

  } catch (error) {
    console.log(`seed.js: ${error}`);
  }

  const comments = [instantEdComment, instantNateComment, nominateEdComment, nominateKatieComment];

  try {
    const seedComments = await Comment.insertMany(comments)
    seedComments.forEach(comment => {
      console.log(`seed.js: ${comment.commentBody} saved, with id ${comment._id}\n${comment}`);
    });
  } catch(error) {
    console.log(`seed.js: ${error}`);
  };

};


databaseConnect().then(async () => {
  console.log('=== seed.js executed ===');
  console.log('seed,js: Creating user seed data!')
  
  try {
    await seedUsers();
    console.log('seed.js: User seed data created!');
    await seedCategories();
    console.log('seed.js: Category seed data created!');
    await seedNominations();
    console.log('seed.js: Nomination seed data created!');
    await seedComments();
    console.log('seed.js: Comment seed data created!');
  } catch(err) {
    console.log(`seed.js: ${err}`);
  } finally {
    databaseClose();
  }

});
  
  
