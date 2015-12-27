var mongoose = require('mongoose');

var guachincheSchema = new mongoose.Schema({
  name: String,
  direction: String,
  city: String,
  description: String,
  mailPublisher: String,
  date: Date
}, 
{ 
  versionKey: false
})

module.exports = mongoose.model('Guachinche', guachincheSchema);