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
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .state('dashboard',{
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'vm'
      })
      .state('route',{
        url: '/route',
        templateUrl: 'views/route-management.html',
        controller: 'RouteController',
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
