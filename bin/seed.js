// SEED FILE
//     a JavaScript file that saves things to your database when you run it
//     (makes onboarding easier and it allows you to re-populate the DB after
//     you delete things.)

const mongoose = require('mongoose');
                            // database name
mongoose.connect('mongodb://localhost/ironshop');
                            //          |
                            // use ironshop
// we have to connect to the DB again here because seed.js is SEPARATE from app.js 

// this connects the model which is in the file below
const Product = require('../models/product-model.js');

const productInfoArray = [
  { name:'Phone Case',
    price: 9.99 ,
    imageUrl: 'https://media.giphy.com/media/euACplj3oGmiY/giphy.gif',
    description: 'Protects your phone. Any model. Any size. You want it, we got it!'
  },
  { name:'Bean Bag',
    price: 25 ,
    imageUrl: 'https://media.giphy.com/media/FCACuwkULerp6/giphy.gif',
    description:'So comfy you can fall on it!'
  },
  { name:'Tissues',
    price: 13.70,
    imageUrl: 'https://media.giphy.com/media/3o7TKsrfldgW9UXx60/giphy.gif',
    description:'Capture all your worries in a single sheet. Very Strong, but soft'
  },
  {
    name: 'Yoga Mat',
    price: 29.99,
    imageUrl: 'http://i.imgur.com/XtpFrW7.jpg',
    description: 'Keeps your knees safe, slip proof, sweat proof. Top of the line',
  },
  {
    name: '20" monitor',
    price: 249.99,
    imageUrl: 'http://i.imgur.com/5ICGeY0.jpg',
    description: 'Large enough for even the heaviest gamer. Crisp, fresh, no dead pixels guarantee',
  },
  {
    name: 'Soylent',
    price: 54.99,
    imageUrl: 'http://media.gq.com/photos/57c6f39209f7003c4afd2c4d/3:2/w_800/drink_gallery5.546e2142f4c6.jpg',
    description: 'You never have to leave your computer! All you can eat nutrition!',
  }
];

Product.create(
  productInfoArray,          //1st Argument -> array of product info objects
  (err, productResults) =>{  //2nd Argument -> callback!
    if (err){
      console.log('No stuff for you! DataBase Error.');
      return;  //early return
    }

    productResults.forEach((oneProduct)=>{
      console.log('New Product! ' + oneProduct.name);
      });
  }
);
