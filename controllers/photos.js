var Photo = require('../models/photo');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
  createPhoto,
  deletePhoto
};

function createPhoto(req, res, next) {
  req.body.user = req.user._id;
  Photo.create(req.body).then(newPhoto => {
    res.status(201).json(newPhoto);
  }).catch(err => res.status(400).json(err));
}

function deletePhoto(req, res, next) {
  Photo.findByIdAndRemove(req.params.id).then(deletedPhoto => {
    res.json(deletedPhoto);
  }).catch(err => res.status(400).json(err));
}