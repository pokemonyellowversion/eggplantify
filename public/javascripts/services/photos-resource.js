angular.module('app')
  .factory('Photo', photoService);

photoService.$inject = ['$resource'];

function photoService($resource) {
  return $resource('/api/photos/:id', {id: '@_id'});
}