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
    });

  $urlRouterProvider.otherwise('/home');
}

// // get an access token

// function getCredentials(cb) {
//   var data = {
//     'grant_type': 'client_credentials',
//     'client_id': CLIENT_ID,
//     'client_secret': CLIENT_SECRET
//   };
//   var url = 'https://api.clarifai.com/v1/token';

//   return axios.post(url, data, {
//     'transformRequest': [
//       function() {
//         return transformDataToParams(data);
//       }
//     ]
//   }).then(function(r) {
//     localStorage.setItem('accessToken', r.data.access_token);
//     localStorage.setItem('tokenTimestamp', Math.floor(Date.now() / 1000));
//     cb();
//   }, function(err) {
//     console.log(err);
//   });
// }

// function transformDataToParams(data) {
//   var str = [];
//   for (var p in data) {
//     if (data.hasOwnProperty(p) && data[p]) {
//       if (typeof data[p] === 'string'){
//         str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
//       }
//       if (typeof data[p] === 'object'){
//         for (var i in data[p]) {
//           str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p][i]));
//         }
//       }
//     }
//   }
//   return str.join('&');
// }

// function postImage(imgurl) {
//   var accessToken = localStorage.getItem('accessToken');
//   var data = {
//     'url': imgurl
//   };
//   var url = 'https://api.clarifai.com/v1/tag';
//   return axios.post(url, data, {
//     'headers': {
//       'Authorization': 'Bearer ' + accessToken
//     }
//     /*'content-type': 'application/x-www-form-urlencoded'*/
//   }).then(function(r) {
//     parseResponse(r.data);
//   }, function(err) {
//     console.log('Sorry, something is wrong: ' + err);
//   });
// }

// function parseResponse(resp) {
//   var tags = [];
//   if (resp.status_code === 'OK') {
//     var results = resp.results;
//     tags = results[0].result.tag.classes;
//   } else {
//     console.log('Sorry, something is wrong.');
//   }

//   document.getElementById('tags').innerHTML = tags.toString().replace(/,/g, ', ');
//   return tags;
// }

// function run(imgurl) {
//   if (Math.floor(Date.now() / 1000) - localStorage.getItem('tokenTimeStamp') > 86400
//     || localStorage.getItem('accessToken') === null) {
//     getCredentials(function() {
//       postImage(imgurl);
//     });
//   } else {
//     postImage(imgurl);
//   }
// }
