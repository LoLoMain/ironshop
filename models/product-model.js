const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductSchema = new Schema({
  name: {type: String},
  price: {type: Number, default: 1},
  imageUrl: {type:String, default:'/images/product.gif'},
  description: {type: String}
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
