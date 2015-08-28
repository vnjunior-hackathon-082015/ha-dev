'use strict';

/**
 * @ngdoc function
 * @name gitRepoTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gitRepoTestApp
 */
angular.module('gitRepoTestApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
