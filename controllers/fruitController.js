const express = require('express');
//next we set up the Router
const router = express.Router();
// require Our Model
// The model should capitalized
const Fruits = require('../models/fruits');
//two dots needed to get to the same level as model. ie 1 dot to go to controllers folder and another to go to fruits-express.

/////////////////////////// Creating the index route///////////////////////////
// index route should show all the fruits
router.get('/', (req, res) => {

Fruits.find({}, (err, allFruits) => {
  if (err) {
    res.send(err);
  } else {
    //allFruits is the response from our db and when you are finding all of something it returns an array
    res.render('index.ejs', {
      fruits: allFruits
    })
  }
})
})


//////////////////////////////////New(post)////////////////////////////////////
router.post('/', (req, res) => {
  // contents of the form will be in req.body
  console.log(req.body, 'this is req.body, should be form info')
  //Now we can add the info from the form to our module
  //update our Module
  //we are going to push our new value to the array in the module

  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  //adding the contents of the form to the model
  Fruits.create(req.body, (err, createdFruit) => {
    if(err) {
      console.log(err)
    } else {
      console.log(createdFruit)

      // we want to respond to the client after we get the response from the database. hence we will put our res.redirect /fruits inside this function
      // this will redirect the response back to get /fruits route

      res.redirect('/fruits');
    }
  })
  });

//create our new route
router.get('/new', (req, res) => {
  res.render('new.ejs');
});

// what were tying to do
// localhost:3000/fruits/0 --> routerle

// We are going to use query params
// to act like a variable which, can be
// sent over by the client

// The Show route --> This route always show's one item
// from the model

/////////////////////////////Edit Route ///////////////////////////////////////
//- to display a single fruit and have the ability to edit it

router.get('/:id/edit', (req, res) => {

  Fruits.findById(req.params.id,(err, foundFruit) => {
    res.render('edit.ejs', {
      fruit: foundFruit,
      index: req.params.index
      //we pass index here because we want to know which item we are updating. Most of the time it will be a database id but now it will be our index number
  })
});
})

//////////////////////////////////show route///////////////////////////////////
router.get('/:id', (req, res) => {
  Fruits.findById(req.params.id, (err, foundfruit) => {
    console.log(foundfruit,'this is the fruit to show');
    if (err) {
      res.send(err);
    } else {

  // Render is when you want to send
  //an ejs template to the client
 res.render('show.ejs', {
   fruit: foundfruit
 })
 }
})
});
router.put('/:id', (req, res) => {
  if(req.body.readyToEat === 'on'){ // if checked then req.body.readyToEat = 'on'
  req.body.readyToEat = true;
} else {
  req.body.readyToEat = false;
}
// req.body is the updated from info
Fruits.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedFruit) => {
if(err){
  res.send(err);
}else{
  console.log(updatedFruit, 'check out model');
res.redirect('/fruits')};
})
});

/////////////////////////////////////delete route///////////////////////////////
router.delete('/:id', (req, res) => {
  console.log(req.params.id,'this is params in delete');
  Fruits.findByIdAndRemove(req.params.id, (err, deletedFruit) => {
  if(err){
  console.log(err, 'this is err in delete')
    res.send(err);
  } else {
  console.log(deletedFruit, ' this is deletedfruit in the delete route');
  res.redirect('/fruits')};
})
});


  // console.log(req.params, '<-- this is req.params')
  // res.send(Fruits[req.params.index]);
// });

module.exports = router;
