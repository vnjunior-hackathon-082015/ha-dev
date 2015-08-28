'use strict';

/**
 * @ngdoc function
 * @name gitRepoTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitRepoTestApp
 */
angular.module('gitRepoTestApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
