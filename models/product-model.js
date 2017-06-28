const mongoose = require('mongoose');

const ReviewModel = require ('./review-model.js');  // ./review-model.js because they are in the same file
// Will be an array - see below in  new Schema

const Schema = mongoose.Schema;

const myProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please tell us the Product Name'],
    minlength: [3, 'Name must be 3 characters or longer'],   //minlength and maxlength are for STRINGS only
    maxlength: [255, 'Name cannot be longer than 255 Characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    default: 1,
    min: [0, 'Price cannot be less than $0'],       //min max are for NUMBERS only
    max: [10000, 'Price cannot exceed $10000']
  },
  imageUrl: {type:String, default:'/images/product.gif'},
  description: {type: String},

  category: {   // not in our form - hypothetical
    type: String,
    enum: ['Tech', 'Food','Apparel', 'Home', 'Sports and Recreation']
    //enum - category field can only be one of the specified field above
  },

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
