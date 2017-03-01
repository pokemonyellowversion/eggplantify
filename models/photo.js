var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  imageURL: String,
  NSFW: Boolean,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Photo', photoSchema);