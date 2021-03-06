const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: { type: String },
  stars: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  author: { type: String },  //this could be another object with author info or an ID from the users collection

  // email:{
  //   type: String,
  //
  //   // For more complicated validations use "match" with a Regular Expression
  //   // more info on regular Expressions -> http://regexr.com/
  //
  //   // Regular Expression that makes sure you have an @ sign
  //   match: /.+@.+/
  // }
});

// Model
// constructor function that alows us to interact with a single collection
const ReviewModel = mongoose.model ('Review', reviewSchema);

// For this Model - it makes sense to include it as part of the Products Collection
// since we want the reviews in the context of the product
// If we wanted to see Reviews within the context of all the reviews a particular user has written
// it would make more sense to have it as a separate collection

module.exports = ReviewModel;
