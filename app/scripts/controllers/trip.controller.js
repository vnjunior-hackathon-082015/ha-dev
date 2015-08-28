/**
 * Created by s727223 on 28/08/2015.
 */

(function(){
  'use strict';

  angular
    .module('hackathonApp')
    .controller('TripController', TripController);

  TripController.$inject = ['commonShareService', '$scope', '$mdDialog', '$rootScope'];

  function TripController(commonShareService, $scope, $mdDialog, $rootScope){
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
      vm.currentUserInfo = commonShareService.getLoginInfo();
      vm.routesData = commonShareService.getRoutes();
      vm.routesData.reverse();
      vm.routesData.forEach(function(route){
        vm.currentUserInfo.routesCreated.forEach(function(routeId){
          if(route.routeId == routeId){
            vm.routesCreated.push(route);
          }
        });
        vm.currentUserInfo.routesJoined.forEach(function(routeId){
          if(route.routeId == routeId){
            vm.routesJoined.push(route);
          }
        });
      });
      // vm.selectedRoutes = angular.copy(vm.routesData);
    }

    function initRoutesProperty(){
      for(var k = 0; k < vm.routesCreated.length; k++){
        for (var i = 0; i < vm.routesCreated[k].destinations.length; i++) {
          for (var j = 0; j < destinationList.length; j++) {
            if (vm.routesCreated[k].destinations[i].locationId == destinationList[j].id) {
              vm.routesCreated[k].destinations[i].photo = "background-image : url('images/dubai-img/" + destinationList[j].photo + "');";
              vm.routesCreated[k].destinations[i].address = destinationList[j].address;
              vm.routesCreated[k].destinations[i].description = destinationList[j].description;
              vm.routesCreated[k].destinations[i].locationName = destinationList[j].destination;
              break;
            }
          }
        }
      }

      for(var k = 0; k < vm.routesJoined.length; k++){
        for (var i = 0; i < vm.routesJoined[k].destinations.length; i++) {
          for (var j = 0; j < destinationList.length; j++) {
            if (vm.routesJoined[k].destinations[i].locationId == destinationList[j].id) {
              vm.routesJoined[k].destinations[i].photo = "background-image : url('images/dubai-img/" + destinationList[j].photo + "');";
              vm.routesJoined[k].destinations[i].address = destinationList[j].address;
              vm.routesJoined[k].destinations[i].description = destinationList[j].description;
              vm.routesJoined[k].destinations[i].locationName = destinationList[j].destination;
              break;
            }
          }
        }
      }
    }

    function createRoute(event){
      $mdDialog.show({
        controller: "CreateRouteController",
        controllerAs: "vm",
        templateUrl: 'views/create-route.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:false
      })
        .then(function(answer) {
          //Reload routes
          getRoutesData();
          initRoutesProperty();
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function onCommentButton(currentTrip){
      // var currentTrip = vm.selectedRoutes[index];
      if(currentTrip.activeComment && currentTrip.activeComment.length > 0){
        $rootScope.loginInfo = commonShareService.getLoginInfo();
        currentTrip.comments.push({
          fullname: $rootScope.loginInfo.fullname,
          avatarURL: $rootScope.loginInfo.avatarURL,
          comment: currentTrip.activeComment
        });
        currentTrip.activeComment = '';
      }
    }
  }

})();
