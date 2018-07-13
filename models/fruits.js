const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: String,
  color: String,
  readyToEat: Boolean
});
//Exporting the whole fruits array
// and
module.exports = mongoose.model('fruit', fruitSchema);
// we are saying that we want to use the model fruit and we want it to look like the schema.
