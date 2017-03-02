angular.module('app')
.controller('PhotoController', PhotoController);

PhotoController.$inject = ['$stateParams', 'PhotoService'];

function PhotoController($stateParams, PhotoService) {
  var vm = this;
  
  vm.photo = PhotoService.get({id: $stateParams.id});

}