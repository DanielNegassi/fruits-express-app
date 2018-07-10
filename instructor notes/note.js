// const express = require('express');
// const app     = express();
// const bodyParser = require('body-parser');
// // require Our Model - Remember Model is
// // a representation of our data
// // The model should capitalized
// const Fruits = require('./models/fruits');
//
// // initialized some middleware
// // bodyParser allows us to read the
// // contents of a form, or the body of a request
// // the app.use sets up what middleware you are using
// app.use(bodyParser.urlencoded({extended: false}))
//
// app.use((req, res, next) => {
//   console.log('I run on every route');
//
//   // this sends the request to the next piece in the
//   // call stack (aka the next middleware piece or final route)
//   next()
//
// });
//
//
// // Creating the index route
// // index route should show all the fruits
// app.get('/fruits', (req, res) => {
//   res.send(Fruits)
// });
//
// // This is the route that the form is sending
// // its info too
// // aka the create route
// app.post('/fruits', (req, res) => {
//   // contents of the form will be in req.body
//   console.log(req.body, 'this is req.body, should be form info');
//   if(req.body.readyToEat === 'on'){
//     req.body.readyToEat = true;
//   } else {
//     req.body.readyToEat = false;
//   }
//   // adding the contents of the form to the model
//   Fruits.push(req.body);
//   // Now we can add the info from the form to our model
//   // update our model
//
//   // redirects the response back
//   // to the get /fruits route
//   res.redirect('/fruits');
//   // res.send('it was completed')
// });
//
//
// // Create our new Route
//
// app.get('/fruits/new', (req, res) => {
//   // This is where we are showing the form
//   res.render('new.ejs');
// });
//
//
// // Show Route
// app.get('/fruits/:index', (req, res) => {
//
//   // Render is when you want to send
//   // an ejs template to the client
//   res.render('show.ejs', {
//     fruit: Fruits[req.params.index] // This creates
//     // a "fruit" variable in the show page
//   })
// });
//
//
//
//
//
//
//
// app.listen(3000, () => {
//   console.log('listening on port 3000');
// });
