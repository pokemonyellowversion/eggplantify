// angular.module('app')
// .controller('NewController', ['ngFileUpload']);

// NewController.$inject = ['$window', '$state', 'Photo'];

// function NewController($window, $state, Photo) {
//   var vm = this;

//   vm.addPhoto = function() {
//     if (form.photo.$valid && photo) {
//       photo.upload(photo);
//       $state.go('photos'); 
//     }
//   };
// }

angular.module('app')
  controller('NewController', ['Photo', 'ngFileUpload']); 

    function NewController(Photo) {
    // upload later on form submit or something similar
    
    var vm = this;

    vm.addPhoto = function() {
      if (this.form.photo.$valid && this.photo) {
        this.upload(this.photo);
        $state.go('photos');
      }
    };

}