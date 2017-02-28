angular.module('app')
.controller('PhotosController', PhotosController);

PhotosController.$inject = ['Photo'];

function PhotosController(Photo) {
  var vm = this;
  
  vm.photos = Photo.query();


}