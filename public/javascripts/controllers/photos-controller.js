angular.module('app')
.controller('PhotosController', PhotosController);

PhotosController.$inject = ['PhotoService'];

function PhotosController(PhotoService) {
  var vm = this;
  
  vm.bogus = PhotoService.query();

  vm.photos = PhotoService.query();

  vm.delPhoto = function(photo) {
    photo.$delete(function() {
      vm.photos.splice(vm.photos.findIndex(t => t._id === photo._id), 1);
    });
  };

}