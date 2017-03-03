angular.module('app')
.controller('PhotosController', PhotosController);

PhotosController.$inject = ['PhotoService', '$state'];

function PhotosController(PhotoService, $state) {
  var vm = this;

  vm.photos = PhotoService.query();

  vm.delPhoto = function(photo) {
    photo.$delete(function() {
      vm.photos.splice(vm.photos.findIndex(t => t._id === photo._id), 1);
    });
  };

}