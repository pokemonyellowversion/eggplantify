angular.module('app')
.controller('NewController', NewController);

NewController.$inject = ['$state', 'PhotoService'];

function NewController($state, PhotoService) {
  var vm = this;

  vm.doPredict = function() {
    if (!validFile(vm.url)) {
      alert('Supported File Types: JPEG, PNG, TIFF, BMP');
      return;
    }
    clarifai.models.predict(Clarifai.NSFW_MODEL, {url: vm.url})
    .then(function(resp) {
      PhotoService.save({
        imageURL: vm.url,
        NSFW: resp.outputs[0].data.concepts.find(c => c.name === 'nsfw').value
      }, function(photo) {
        $state.go('photo', {id: photo._id});
      });
    });
  };

  $(document).ready(function() {
    $('#loader').hide();  
    $('#predict-form').submit(function() {
      $('#loader').show();
    }); 
  });
}