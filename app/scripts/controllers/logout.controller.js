'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the hackathonApp
 */
angular.module('hackathonApp')
  .controller('LogoutCtrl', function($scope, $rootScope, $state,$timeout, commonShareService ){
    commonShareService.setLoginInfo(null);
    commonShareService.setRoutes(null);
    $rootScope.loginInfo = null;


    $timeout(function(){
        $state.go('dashboard');
    }, 1500);
  });
