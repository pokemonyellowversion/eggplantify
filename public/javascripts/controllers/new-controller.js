angular.module('app')
.controller('NewController', NewController);

NewController.$inject = ['$window', '$state', '$http', 'PhotoService'];

function NewController($window, $state, $http, PhotoService) {
  var vm = this;

  vm.addPhoto = function(photo) {
    PhotoService.save({imageURL: photo}, function(photo) {
      $state.go('photos');
    });
    // console.log('hi');
    // $http({
    //   url: '/api/photos/',
    //   method: 'POST',
    //   data: {imageURL: photo}
    // }).then(function(response) {
    //   console.log(response);
    //   $state.go('home');
    // }).catch(function(error) {
    //   console.log(error);
    // })

  };
}