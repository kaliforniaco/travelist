const mongoose = require('mongoose');


const tripSchema = new mongoose.Schema({
  title: String,
  description: String,
  email: String,
  googlePlace: {},
});


// Exporting the whole fruits array
// and it will be named whatever we require as
module.exports = mongoose.model('Trip', tripSchema);
