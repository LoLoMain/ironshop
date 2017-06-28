// When creating a new route file: don't forget to connect to app.js
const express = require('express');
const router = express.Router();

const ProductModel = require('../models/product-model.js');


// ROUTE #1 -> display the form to create a new review
// DB Query to find a product by ID
router.get('/products/:productId/reviews/new',(req, res, next)=>{
    ProductModel.findById(
      req.params.productId,      //1st Argument -> Product ID
      (err, productFromDb) =>{   //2nd Argument -> call back
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
// router.post();




module.exports = router;
