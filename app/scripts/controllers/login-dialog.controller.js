'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hackathonApp
 */
angular.module('hackathonApp')
  .controller('LoginDialogController', LoginDialogController);


   function LoginDialogController($scope, $timeout, $rootScope, $mdDialog, commonShareService, blockUI) {
      var vm = this;
      vm.login = login;
      vm.cancel = cancel;

      //==================== Function declaration ====================
      function login(){
        vm.message = '';
        vm.isLoggedIn = false;
        var username = vm.name.toLowerCase();
        var pnr = vm.pnr.toUpperCase();

        var loginInfos = commonShareService.getUsers();
        var isLoggedIn = false;
        for(var i = 0; i < loginInfos.length; i++){
          var info = loginInfos[i];
          if(info.username === username && info.pnr === pnr){
            commonShareService.setLoginInfo(info);
            $rootScope.loginInfo = commonShareService.getLoginInfo();
            vm.isLoggedIn = true;
            vm.message = 'Login Success';
            break;
          }
        }
        if(vm.isLoggedIn){
          blockUI.start();
          $timeout(function(){
            blockUI.stop();
            $mdDialog.hide();
          }, 1500);
        } else {
          vm.message = 'You enter wrong username and PNR';
        }
      }

      function cancel() {
        $mdDialog.cancel();
      };
    }
