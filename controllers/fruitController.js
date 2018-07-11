const express = require('express');
//next we set up the Router
const router = express.Router();
// require Our Model
// The model should capitalized
const Fruits = require('../models/fruits');
//two dots needed to get to the same level as model. ie 1 dot to go to controllers folder and another to go to fruits-express.

// Creating the index route
// index route should show all the fruits
router.get('/', (req, res) => {
  res.render('index.ejs', {
    fruits:Fruits
  })
});

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
  Fruits.push(req.body);

  res.redirect('/fruits');
  res.send('Post worked');
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

//Edit Route - to display a single fruit and have the ability to edit it

router.get('/:index/edit', (req, res) => {

res.render('edit.ejs', {
  fruit: Fruits[req.params.index],
  index: req.params.index
  //we pass index here because we want to know which item we are updating. Most of the time it will be a database id but now it will be our index number
});

})



//show route
router.get('/:index', (req, res) => {

  // Render is when you want to send
  //an ejs template to the client
 res.render('show.ejs', {
   fruit: Fruits[req.params.index]// This creates a 'fruits' variable in the show page
 })
});

router.put('/:index', (req, res) => {
  if(req.body.readyToEat === 'on'){ // if checked then req.body.readyToEat = 'on'
  req.body.readyToEat = true;
} else {
  req.body.readyToEat = false;
}
// req.body is the updated from info
Fruits[req.params.index] = req.body;
res.redirect('/fruits');
});

//delete route
router.delete('/:index', (req, res) => {
  Fruits.splice(req.params.index, 1);
  console.log(req.params.index, ' this is req.params')
  res.redirect('/fruits')
})


  // console.log(req.params, '<-- this is req.params')
  // res.send(Fruits[req.params.index]);
// });

module.exports = router;
