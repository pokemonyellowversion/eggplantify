var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  image: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Photo', photoSchema);