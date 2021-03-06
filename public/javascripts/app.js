angular.module('app', ['ui.router', 'ngAnimate', 'ngResource'])
  .config(configRoutes)
  .run(runBlock);

runBlock.$inject = ['$rootScope', '$state', 'UserService'];

function runBlock($rootScope, $state, UserService) {
  $rootScope.$on('$stateChangeStart', function(evt, toState) {
    if(toState.loginRequired && !UserService.isLoggedIn()) {
      evt.preventDefault(); //stops process of changing to state
      $state.go('login'); //if not logged in, redirect to login
    }
  });
}

configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

function configRoutes($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('AuthInterceptor');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/users/login.html',
      controller: 'UserController as userCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/users/signup.html',
      controller: 'UserController as userCtrl'
    })

    .state('photos', {
      url: '/gallery',
      templateUrl: 'templates/photos/index.html',
      controller: 'PhotosController as photosCtrl',
      loginRequired: true
    })

    .state('newPhoto', {
      url: '/new',
      templateUrl: 'templates/photos/new.html',
      controller: 'NewController as newCtrl',
      loginRequired: true
    })

    .state('photo', {
      url: '/photo/:id',
      templateUrl: 'templates/photos/show.html',
      controller: 'PhotoController as photoCtrl',
      loginRequired: true
    });

    $('.button-collapse').sideNav({
      menuWidth: '240px', // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

  $urlRouterProvider.otherwise('/home');
}

