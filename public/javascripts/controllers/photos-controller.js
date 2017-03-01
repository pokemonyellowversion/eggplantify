angular.module('app')
.controller('PhotosController', PhotosController);

PhotosController.$inject = ['Photo'];

function PhotosController(Photo) {
  var vm = this;
  
  vm.photos = Photo.query();

  vm.delPhoto = function(photo) {
    photo.$delete(function() {
      vm.photos.splice(vm.photos.findIndex(t => t._id === photo._id), 1);
    });
  };

}