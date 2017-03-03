angular.module('app')
.controller('PhotosController', PhotosController);

PhotosController.$inject = ['PhotoService'];

function PhotosController(PhotoService) {
  var vm = this;

  vm.photos = PhotoService.query();

  console.log(vm.photos);

  vm.nsfwAverage = function() {
    if (vm.photos && vm.photos.length) {
      var sum = 0;
      vm.photos.forEach(p => sum += p.NSFW); 
      return Math.round(sum / vm.photos.length * 100, 4);
    } else {
      return 0;
    }
  };

  vm.delPhoto = function(photo) {
    photo.$delete(function() {
      vm.photos.splice(vm.photos.findIndex(t => t._id === photo._id), 1);
    });
  };

}