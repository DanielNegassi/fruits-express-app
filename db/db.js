//this is where we will set up our db CONNECTION
const mongoose = require('mongoose');

//Connect to the database. food is the name of our database. That is automatically created in localhost so you don' thave ot put in 27017 or whatever the number was.
mongoose.connect('mongodb://localhost/food')


//every module



//EVENT LISTENERS

//#1: Connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
})
//#2: Error
mongoose.connection.on('error', (err) => {
  console.log(err, ' mongoose failed to connect')
})
//#3: Disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected');
})
