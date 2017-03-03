angular.module('app')
  .factory('PhotoService', PhotoService);

PhotoService.$inject = ['$resource'];

function PhotoService($resource) {
  return $resource('/api/photos/:id', {id: '@_id'});
}