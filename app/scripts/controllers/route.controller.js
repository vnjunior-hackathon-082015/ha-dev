/**
 * Created by s727223 on 28/08/2015.
 */

(function(){
  'use strict';

  angular
    .module('hackathonApp')
    .controller('RouteController', RouteController);

  RouteController.$inject = ['$scope', '$mdDialog', '$rootScope'];

  function RouteController($scope, $mdDialog, $rootScope){
    var vm = this,
      destinationList = [];
    vm.routesCreated = [];
    vm.routesJoined = [];
    vm.createRoute = createRoute;
    vm.onCommentButton = onCommentButton;

    activate();

    //==================== Function declaration ====================
    function activate(){
      $rootScope.activeTab = 'route';

      getRoutesData();

      destinationList = commonShareService.getDestination();

      initRoutesProperty();
    }

    function getRoutesData(){

    }

    function initRoutesProperty(){

    }

    function createRoute(event){

    }

    function onCommentButton(currentTrip){

    }
  }
});
