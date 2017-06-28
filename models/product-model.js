const mongoose = require('mongoose');

const ReviewModel = require ('./review-model.js');  // ./review-model.js because they are in the same file
// Will be an array - see below in  new Schema

const Schema = mongoose.Schema;

const myProductSchema = new Schema({
  name: {type: String},
  price: {type: Number, default: 1},
  imageUrl: {type:String, default:'/images/product.gif'},
  description: {type: String},

  // Add a field inside of Product Documents called "Reviews"
  // This field is an array of ReviewModel objects with content, stars, and author.
  reviews:[ ReviewModel.schema]
});

// Model
// constructor function that alows us to interact with a single collection
const ProductModel= mongoose.model('Product', myProductSchema);
// Collection name is automatically determined by Mongoose
// -------------------------------------------------------
// Product -> products -> db.products.find()

// If YOU FORGET THIS - GAME OVER  😵
module.exports = ProductModel;
// this line connects the actual model above to the product-routes file
