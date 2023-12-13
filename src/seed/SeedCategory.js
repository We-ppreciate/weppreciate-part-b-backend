require('dotenv').config();

const mongoose = require('mongoose');
const { databaseConnect, databaseClose } = require('../database');
const { Category } = require('../models/CategoryModels');


databaseConnect().then(async () => {
  
  const awardCategories = ['Say/Do', 'Commitment', 'Collborate', 'Challenging', 'Learning', 'Spirited'];
  
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
  
  const Challenging = new Category({
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
  
  await Category.insertMany([sayDo, commitment, collaborate, Challenging, learning, spirited, instant]).catch(error => {
    logToFile(`seed.js: ${error}`);
    console.log(`seed.js: ${error}`);
  })


  databaseClose();

});