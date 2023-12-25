const mongoose = require('mongoose');
require('dotenv').config();

const { databaseConnect, databaseClose } = require('../database');
const { User } = require('../models/UserModel');
const { Nomination } = require('../models/NominationModel');
const { Comments } = require('../models/CommentModel');
const { Category } = require('../models/CategoryModel');



databaseConnect().then(async () => {
  
  const awardCategories = ['Say/Do', 'Commitment', 'Collborate', 'Challenging', 'Learning', 'Spirited'];
  
  const sayDo = new Category({
    categoryName: 'Say/Do',
    categoryDescription: 'Doing what you say',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const commitment = new Category({
    categoryName: 'Commitment',
    categoryDescription: 'Having the commitment to follow through',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const collaborate = new Category({
    categoryName: 'Collborate',
    categoryDescription: 'Collaborating like a boss',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const Challenging = new Category({
    categoryName: 'Challenging',
    categoryDescription: 'Challenging all the things',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const learning = new Category({
    categoryName: 'Learning',
    categoryDescription: 'Learning all the time',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const spirited = new Category({
    categoryName: 'Spirited',
    categoryDescription: 'Fire spirit',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  const instant = new Category({
    categoryName: 'Instant',
    categoryDescription: 'Instant thanks',
    championAnimal: 'cat',
    categoryImage: 'https://storage.googleapis.com/weppreciate-store/award/anima_cat.png'
  });
  
  await Category.insertMany([sayDo, commitment, collaborate, Challenging, learning, spirited, instant]).catch(error => {
    console.log(`seed.js: ${error}`);
  })


  databaseClose();

});