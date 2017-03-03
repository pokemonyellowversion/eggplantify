angular.module('app')
.controller('PhotoController', PhotoController);

PhotoController.$inject = ['$stateParams', '$state', 'PhotoService'];

function PhotoController($stateParams, $state, PhotoService) {
  var vm = this;
  
  vm.photo = PhotoService.get({id: $stateParams.id});

  vm.edit = function(photo) {
    vm.photo.$update(function() {
      console.log(vm.photo);
      // $state.go('home');
    });
  };
}