var express = require('express');
var router = express.Router();
var photoCtrl = require('../controllers/photos');
var userCtrl = require('../controllers/users');

// Public routes (no auth required)
router.post('/users/login', userCtrl.login);
router.get('/users/logout', userCtrl.logout);
router.post('/users', userCtrl.create);
router.get('/users/me', userCtrl.me);


// Auth middleware (routes below need authentication)
router.use(function(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
});

// Protected routes (authentication required)
router.get('/photos', photoCtrl.getAllPhotos);
router.get('/photos/:id', photoCtrl.getPhoto);
router.post('/photos', photoCtrl.createPhoto);
router.delete('/photos/:id', photoCtrl.deletePhoto);

module.exports = router;
