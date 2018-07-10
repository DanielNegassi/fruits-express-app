const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// require Our Model
// The model should capitalized
const Fruits = require('./models/fruits');

// initialized some middleware
//bodyparser allows us to read the
//content of a form, or the body of a request
//the app.use sets up what middleware you are using
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  console.log('I run on every route');
  //this sends the request to the next piece in the
  //call stack (aka the next middleware piece or final route)
  next()
});


// Creating the index route
// index route should show all the fruits
app.get('/fruits', (req, res) => {
  res.render('index.ejs', {
    fruits:Fruits
  })
});

app.post('/fruits', (req, res) => {
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
app.get('/fruits/new', (req, res) => {
  res.render('new.ejs');
});

// what were tying to do
// localhost:3000/fruits/0 --> apple

// We are going to use query params
// to act like a variable which, can be
// sent over by the client

// The Show route --> This route always show's one item
// from the model


//show route
app.get('/fruits/:index', (req, res) => {

  // Render is when you want to send
  //an ejs template to the client
 res.render('show.ejs', {
   fruit: Fruits[req.params.index]// This creates a 'fruits' variable in the show page
 })
});

app
//delete route
app.delete('/fruits/:index', (req, res) => {
  Fruits.splice(req.params.index, 1);
  console.log(req.params.index, ' this is req.params')
  res.redirect('/fruits')
})


  // console.log(req.params, '<-- this is req.params')
  // res.send(Fruits[req.params.index]);
// });


app.listen(3000, () => {
  console.log('listening on port 3000');
});
