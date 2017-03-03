angular.module('app')
.controller('PhotoController', PhotoController);

PhotoController.$inject = ['$stateParams', '$state', 'PhotoService'];

function PhotoController($stateParams, $state, PhotoService) {
  var vm = this;
  
  vm.photo = PhotoService.get({id: $stateParams.id});
}