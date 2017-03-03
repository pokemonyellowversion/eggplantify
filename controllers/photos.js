var Photo = require('../models/photo');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
  getAllPhotos,
  createPhoto,
  deletePhoto,
  getPhoto,
  updatePhoto
};

function getAllPhotos(req, res, next) {
  Photo.find({user: req.user._id}).exec().then(photos => {
    res.json(photos);
  }).catch(err => res.status(500).json(err));
}

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

function getPhoto(req, res, next) {
  Photo.findById(req.params.id).exec().then(photo => {
    res.json(photo);
  }).catch(err => res.status(500).json(err));
}

function updatePhoto(req, res, next) {
  Photo.findByIdAndUpdate(req.params.id, req.body).exec().then(photo => {
    res.json(photo);
  }).catch(err => res.status(500).json(err));
}