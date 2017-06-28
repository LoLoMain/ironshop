// When creating a new route file: don't forget to connect to app.js
const express = require('express');
const router = express.Router();

const ProductModel = require('../models/product-model.js');
const ReviewModel = require('../models/review-model.js');


// ROUTE #1 -> display the form to create a new review
// DB Query to find a product by ID
router.get('/products/:productId/reviews/new',(req, res, next)=>{
    ProductModel.findById(
      req.params.productId,      //1st Argument -> Product ID
      (err, productFromDb) =>{   //2nd Argument -> call back (error or stuff from DB)
        if (err){
          // use next() to skip to the ERROR PAGE
          next (err);
          return;
        }

        res.render('review-views/new-review-form.ejs',{
          productDetails: productFromDb
        });

      });
});


// ROUTE #2 -> receive that form submission and do database stuff
router.post('/products/:productId/reviews', (req,res, next)=>{
    ProductModel.findById(
      req.params.productId,
      (err, productFromDb)=> {
        if (err){
          next(err);
          return;
        }
        const theReview = new ReviewModel({
        author: req.body.reviewAuthor,
        stars: req.body.reviewStars,
        content: req.body.reviewContent
        });

        // Adding the review to the product's "reviews" array
        productFromDb.reviews.push(theReview);

        // Save the product with the new review
        productFromDb.save((err)=>{
          if (err){
            next(err);
            return;
          }
          res.redirect('/products/' + productFromDb._id);
        });
      }
    );
});




module.exports = router;
