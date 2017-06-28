const express = require('express');
const router = express.Router();

const ProductModel =require('../models/product-model.js');
// connects to module.exports in product-model.js

router.get('/products', (req,res,next)=>{
  ProductModel.find((err, productResults) => {
    if (err){
      // use next() to skip to the ERROR PAGE
    next(err);
    return;
    }
    // This is the same as below with the key value pairs and
    // doesn't change the way it goes in the view
    // res.locals.productsAndStuff = productResults;
    // display "products-list-views.ejs"
    res.render('product-views/products-list-view.ejs', {
      productsAndStuff: productResults
    });
  });
});

// step #1 of form submission for a new product
router.get('/products/new', (req,res,next)=>{
  // display "new-product-view.ejs"
  res.render('product-views/new-product-view.ejs');
});

// step #2 of form submission for a new product
// again this a SEPARATE page from the /products above because it is attached to
// a POST verb - that we added in the form
// <form action="/products" method="post">
router.post('/products',(req,res, next)=>{
    const addedProduct= new ProductModel({
      name: req.body.productName,
      price: req.body.productPrice,
      imageUrl: req.body.productImageUrl,
      description: req.body.productDescription
    });

  // this is what ACTUALLY TALKS TO THE DATABASE TO SAVE
    addedProduct.save((err)=>{
      // If there was an error that was NOT a validation error...
      if (err && addedProduct.errors === undefined){
        //  If there was an error, use next() to skip to the ERROR PAGE
      next(err);
      return;
      }
      // If there was error and THERE WERE valiation errors
      if(err && addedProduct.errors){
        // Create view variables with the error messages
        res.locals.nameValidationError = addedProduct.errors.name;
        res.locals.priceValidationError = addedProduct.errors.price;
        // and display the form again
        res.render('product-views/new-product-view.ejs');
        return;
      }
      //if saved successfully, redirect to a URL /blahblahblah
      // Redirect is step #3
      res.redirect('/products');
      // you can ONLY redirect to a URL
      //  If you don't redirect, you can refresh and dublicate data! Oh No!
      // you render a view
    });
  });


// this is connected to app.js via myProductRoutes
// technically router (from module.exports) is the samething
// as myProductRoutes


// ProductModel.find() is looking up things in the data base
// 1st Arguement - optional critera object ex {price: {$gt: 100} }
// 2nd Argument - optional projection object - controls the fields that
//  i.e {name: 1,price: 1, _id:0}
// 3rd Argument is the callback - check for errors, if no errors
// render blah

// productResults is the info from our DB - it can be named literally anything is the call back
// because it must be retreived which is slow
//
//good to console.log and check in node to check

// example
// ProductModel.find(
//    {price: {$gt: 100} }
//    {name: 1,price: 1, _id:0}
//    (err, productResults) => {
//      if (err){
//        // use next() to skip to the ERROR PAGE
//        next(err);
//        return;
//   }

// DETAILS PAGE
router.get('/products/:myId',(req,res,next)=>{
  // from products-list-view.ejs
  // <a href="/products/details?myId=<%= oneProduct._id %>">
  //  /products/details?myId=5951744067310a0e67d4934c"
    ProductModel.findById(
      req.params.myId, //1st Argument -> the Id to find in the DB
      (err, productFromDb)=>{ //2nd Argument -> callback
        if (err){
          //  If there was an error, use next() to skip to the ERROR PAGE
        next(err);
        return;
        }
        // res.locals.productDetails = theProduct; other possibility
        res.render('product-views/product-details-view.ejs',
        { productDetails: productFromDb});
      }
    );
});

// Step #1 of form submission for UPDATING a product
// (SAME AS DETAILS PAGE BUT DIFFERENT VIEW FILE)
// we are going to use this to pre-populate the form and only change what we want to change
router.get('/products/:myId/edit',(req, res, next)=>{
      //  /products/       /edit
  ProductModel.findById(
    req.params.myId, //1st Argument -> the Id to find in the DB
    (err, productFromDb)=>{ //2nd Argument -> callback
      if (err){
        //  If there was an error, use next() to skip to the ERROR PAGE
      next(err);
      return;
      }
      res.render('product-views/edit-product-view.ejs',
      { productDetails: productFromDb}
    );
  });
});

// step #2 of form submission for a UPDATING product
// a POST verb - that we added in the form

// <form method="post" action="/products/update?myId=5951744067310a0e67d4934c" >
router.post('/products/:myId/update',(req,res, next)=>{
    ProductModel.findByIdAndUpdate(
      req.params.myId,{                 // 1st Argument -> id of document to update

      name: req.body.productName,      //2nd Argument -> object of fields to update
      price: req.body.productPrice,
      imageUrl: req.body.productImageUrl,
      description: req.body.productDescription
    },

    (err, productFromDb) => {         //3rd Argument -> callback!
      if (err){
        //  If there was an error, use next() to skip to the ERROR PAGE
      next(err);
      return;
      }
      //if saved successfully, redirect to a URL /blahblahblah
      // Redirect is step #3
      // you need to include the ID of the product in the URL
      res.redirect('/products/' +productFromDb._id);
      // you can ONLY redirect to a URL
      }
    );
  });

// TWO METHODS TO DELETE - LINK OR BUTTON - BUTTON PERSONALLY PREFERRED BY ME
// Delete a LINK (GET)
// same code as a Post version - see below
  router.get('/products/:myId/delete', (req,res,next)=>{
    ProductModel.findByIdAndRemove(
      req.params.myId,                  // 1st Argument -> id of document to delete

      (err, productFromDb) => {         //3rd Argument -> callback!
        if (err){
          //  If there was an error, use next() to skip to the ERROR PAGE
        next(err);
        return;
        }
        // if removed successfully redirect to a URL
        res.redirect('/products');
      }
    );
  });

  // Delete from a FORM BUTTON (POST)
  // same code as a GET version - see above
    router.post('/products/:myId/delete', (req,res,next)=>{
      ProductModel.findByIdAndRemove(
        req.params.myId,                  // 1st Argument -> id of document to delete

        (err, productFromDb) => {         //3rd Argument -> callback!
          if (err){
            //  If there was an error, use next() to skip to the ERROR PAGE
          next(err);
          return;
          }
          // if removed successfully redirect to a URL
          res.redirect('/products');
        }
      );
    });


module.exports = router;
