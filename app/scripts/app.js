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
    'ui.bootstrap.datetimepicker',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider, $urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home/intro/why');
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
              controller: 'BubbleController'
          },
          'info@home':{
              template: '<div ui-view></div>',
              controller: ''
          }
        }
      }).state('home.intro.why',{
        url: '/why',
        templateUrl: 'views/why.html',
        controller: 'WhyController'
      }).state('home.intro.tours',{
        url: '/tours',
        templateUrl: 'views/tours.html',
        controller: ''
      })
      .state('home.intro.eligibility',{
        url: '/eligibility',
        templateUrl: 'views/eligibility.html',
        controller: 'EligibilityController',
        controllerAs: 'vm'
      })
      .state('dashboard',{
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
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAEwUlCClGHBkr-HXghLhJ_IdXf_Q-7O2c',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
  })
;
