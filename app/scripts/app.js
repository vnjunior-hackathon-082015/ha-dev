'use strict';

/**
 * @ngdoc overview
 * @name gitRepoTestApp
 * @description
 * # gitRepoTestApp
 *
 * Main module of the application.
 */
angular
  .module('hackathonApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/route', {
        templateUrl: 'views/route-management.html',
        controller: 'RouteController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
