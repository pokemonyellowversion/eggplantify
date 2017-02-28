angular.module('app')
.controller('UserController', UserController);

UserController.$inject = ['$state', 'UserService'];

function UserController($state, UserService) {
  var vm = this;

  vm.signup = function() {
    UserService.signup(vm.user).then(function() {
      $state.go('photos');
    });
    vm.user = {};
  };

  vm.login = function() {
    UserService.login(vm.user).then(function() {
      $state.go('photos');
    }, function() {
      $state.go('home');
    });
    vm.user = {};
  };

}