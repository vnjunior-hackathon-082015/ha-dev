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
    'ngTouch',
    'ngMaterial',
    'ui.router',
    'ui.bootstrap',
    'vAccordion',
    'ui.bootstrap.datetimepicker'
  ])
  .config(function ($routeProvider, $urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home/intro');
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      }).state('home.intro',{
        url: '/intro',
        views: {
          'bubble@home':{
              templateUrl: 'views/bubble.html',
              controller: '',
          },
          'info@home':{
              templateUrl: 'views/info.html',
              controller: '',
          }
        }
      }).state('dashboard',{
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'vm'
      })
      .state('trip',{
        url: '/trip',
        templateUrl: 'views/trip-management.html',
        controller: 'TripController',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/',
        templateUrl: 'views/login.tmpl.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'vm'
      })
      .state('test-skyscanner', {
        url: '/test-skyscanner',
        templateUrl: 'views/test-skyscanner.html',
        controller: 'TestSkyscannerController',
        controllerAs: 'vm'
      })
      ;
  })
  .config(function($mdIconProvider){
    $mdIconProvider
       .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
       .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  })
;
