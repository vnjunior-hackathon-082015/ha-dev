'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the hackathonApp
 */
angular.module('hackathonApp')
  .controller('LogoutCtrl', function($scope, $rootScope, $state,$timeout, commonShareService, blockUI){
    commonShareService.setLoginInfo(null);
    commonShareService.setTrips(null);
    $rootScope.loginInfo = null;

    blockUI.start();
    $timeout(function(){
        blockUI.stop();
        $state.go('home.intro.why');
    }, 1500);
  });
