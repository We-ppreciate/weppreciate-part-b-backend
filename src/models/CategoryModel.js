const mongoose = require('mongoose');

// Award categories used for non-instant thanks
// const awardEnum = ['Say/Do', 'Commitment', 'Collborate', 'Challenging', 'Learning', 'Spirited', 'Instant']

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true
  },
  categoryDescription: {
    type: String,
    required: true
  },
  championAnimal: {
    type: String,
    required: true
  },
  categoryImage: {
    type: String,
    required: true
  }
})

const Category = mongoose.model('Category', CategorySchema);

module.exports = {
  Category
}